<script module lang="ts">
  import { pythonExecutor } from '@worker/executor';
  import { 
    schemaValidations, 
    type SchemaValidation, 
    type SchemaValidationExecution,
    type JavaScriptValidation,
    type PythonValidation,
    type JavaScriptValidationResult,
    type JavaScriptValidationError
  } from '@config/schema-config.js';
  import { select, clearOtherSelections, getSelection } from '@core/state/workspace.svelte';
  import { activeFileRequirements, files as uploadedFiles } from '@plugins/required-files/store.svelte';
  import { addResult } from '@plugins/results/store.svelte';
  import { registerSelectionResolver } from '@utils/breadcrumbs.ts';

  export const availableSchemas = $state<SchemaValidation[]>([...schemaValidations]);
  export const executions = $state<Record<string, SchemaValidationExecution>>({});

  export function getExecutionsList() { 
    return Object.values(executions); 
  }

  export async function startExecution(schemaId: string) {
    const schema = availableSchemas.find(s => s.id === schemaId);
    if (!schema) throw new Error(`Schema ${schemaId} not found`);

    const base: SchemaValidationExecution = { 
      id: `exec_${schemaId}_${Date.now()}`, 
      schemaId, 
      status: 'running', 
      lastRun: new Date().toISOString() 
    };
    executions[schemaId] = base;

    try {
      if (schema.validationType === 'javascript') {
        await executeJavaScriptValidation(schema, base);
      } else {
        await executePythonValidation(schema, base);
      }
    } catch (e) {
      executions[schemaId] = { 
        ...base, 
        status: 'error', 
        error: e instanceof Error ? e.message : 'Unknown error', 
        lastRun: new Date().toISOString() 
      };
      throw e;
    }
  }

  async function executeJavaScriptValidation(schema: JavaScriptValidation, base: SchemaValidationExecution) {
    const startTime = Date.now();

    // Get the target file
    const req = activeFileRequirements.find(r => r.id === schema.targetFileId);
    const uploaded = req ? uploadedFiles[req.id] : undefined;
    
    if (!req || !uploaded?.file) {
      throw new Error(`Required file '${schema.targetFileId}' not found`);
    }

    // Validate the file
    const result = await validateFileWithJavaScript(uploaded.file, schema.validationRules);
    
    const executionTime = Date.now() - startTime;
    executions[schema.id] = {
      ...base,
      status: result.success ? 'completed' : 'error',
      executionTime: `${executionTime}ms`,
      lastRun: new Date().toISOString(),
      jsResult: result,
      error: result.success ? undefined : `Validation failed with ${result.errors.length} errors`
    };
  }

  async function executePythonValidation(schema: PythonValidation, base: SchemaValidationExecution) {
    // Get the target file
    const req = activeFileRequirements.find(r => r.id === schema.targetFileId);
    const uploaded = req ? uploadedFiles[req.id] : undefined;
    
    if (!req || !uploaded?.file) {
      throw new Error(`Required file '${schema.targetFileId}' not found`);
    }

    const dataFiles = [{ file: uploaded.file, filename: req.defaultFilename }];

    // Load Python script content - for now use placeholder
    const pythonContent = `
# Python validation script: ${schema.filename}
import pandas as pd
import json

def main():
    # Load the data file
    df = pd.read_parquet('${req.defaultFilename}') if '${req.defaultFilename}'.endswith('.parquet') else pd.read_csv('${req.defaultFilename}')
    
    # Generate HTML report
    html_content = f'''
    <!DOCTYPE html>
    <html>
    <head><title>Validation Report: ${schema.title}</title></head>
    <body>
        <h1>${schema.title}</h1>
        <p>Validation completed for file: ${req.defaultFilename}</p>
        <h2>Data Summary</h2>
        <p>Rows: {len(df)}</p>
        <p>Columns: {len(df.columns)}</p>
        <h2>Column Information</h2>
        <pre>{df.dtypes.to_string()}</pre>
        <h2>Sample Data</h2>
        <div>{df.head().to_html()}</div>
    </body>
    </html>
    '''
    
    # Write HTML report
    with open('${schema.outputHtml}', 'w') as f:
        f.write(html_content)
    
    print(f"Generated HTML report: ${schema.outputHtml}")

if __name__ == "__main__":
    main()
`;

    const result = await pythonExecutor.executeScript(
      { id: `schema-validation-${schema.id}`, content: pythonContent, title: `Schema Validation: ${schema.title}` },
      { timeout: 86400000, dataFiles }
    );

    const end = new Date().toISOString();
    
    // Add generated HTML report to Results plugin
    if (result.success && result.modifiedFiles) {
      for (const file of result.modifiedFiles) {
        if (file.name === schema.outputHtml) {
          addResult({
            filename: file.name,
            fileType: 'HTML',
            fileSize: file.data.length,
            content: file.data,
            createdAt: end,
            scriptId: `schema-validation-${schema.id}`,
            description: `Validation report for ${schema.title}`,
            pyodidePath: file.path
          });
        }
      }
    }
    
    executions[schema.id] = {
      ...base,
      status: result.success ? 'completed' : 'error',
      executionTime: `${result.executionTime}ms`,
      lastRun: end,
      error: result.success ? undefined : result.error,
      htmlGenerated: result.success,
      htmlPath: result.success ? schema.outputHtml : undefined
    };
  }

  async function validateFileWithJavaScript(file: File, rules: JavaScriptValidation['validationRules']): Promise<JavaScriptValidationResult> {
    const errors: JavaScriptValidationError[] = [];
    const warnings: JavaScriptValidationError[] = [];
    
    try {
      // Parse file based on type
      let data: any[];
      if (file.name.toLowerCase().endsWith('.csv')) {
        data = await parseCSV(file);
      } else if (file.name.toLowerCase().endsWith('.json')) {
        data = await parseJSON(file);
      } else {
        throw new Error(`Unsupported file type for JavaScript validation: ${file.name}`);
      }

      const summary = {
        totalRows: data.length,
        totalColumns: data.length > 0 ? Object.keys(data[0]).length : 0,
        validRows: 0,
        errorCount: 0,
        warningCount: 0
      };

      // Check row count constraints
      if (rules.rowCount) {
        if (rules.rowCount.min !== undefined && data.length < rules.rowCount.min) {
          errors.push({
            message: `Insufficient rows: found ${data.length}, minimum required ${rules.rowCount.min}`,
            constraint: 'rowCount.min'
          });
        }
        if (rules.rowCount.max !== undefined && data.length > rules.rowCount.max) {
          errors.push({
            message: `Too many rows: found ${data.length}, maximum allowed ${rules.rowCount.max}`,
            constraint: 'rowCount.max'
          });
        }
      }

      // Check required columns
      if (rules.requiredColumns && data.length > 0) {
        const actualColumns = Object.keys(data[0]);
        for (const requiredCol of rules.requiredColumns) {
          if (!actualColumns.includes(requiredCol)) {
            errors.push({
              column: requiredCol,
              message: `Required column '${requiredCol}' is missing`,
              constraint: 'requiredColumns'
            });
          }
        }
      }

      // Validate each row
      data.forEach((row, rowIndex) => {
        let rowValid = true;

        // Check column types
        if (rules.columnTypes) {
          for (const [column, expectedType] of Object.entries(rules.columnTypes)) {
            const value = row[column];
            if (value !== null && value !== undefined && !isValidType(value, expectedType)) {
              errors.push({
                column,
                row: rowIndex + 1,
                message: `Invalid type for column '${column}': expected ${expectedType}, got ${typeof value}`,
                value,
                constraint: 'columnTypes'
              });
              rowValid = false;
            }
          }
        }

        // Check constraints
        if (rules.constraints) {
          for (const [column, constraint] of Object.entries(rules.constraints)) {
            const value = row[column];
            
            if (constraint.notNull && (value === null || value === undefined || value === '')) {
              errors.push({
                column,
                row: rowIndex + 1,
                message: `Column '${column}' cannot be null or empty`,
                value,
                constraint: 'notNull'
              });
              rowValid = false;
            }

            if (value !== null && value !== undefined && value !== '') {
              if (constraint.min !== undefined && typeof value === 'number' && value < constraint.min) {
                errors.push({
                  column,
                  row: rowIndex + 1,
                  message: `Value ${value} is below minimum ${constraint.min}`,
                  value,
                  constraint: 'min'
                });
                rowValid = false;
              }

              if (constraint.max !== undefined && typeof value === 'number' && value > constraint.max) {
                errors.push({
                  column,
                  row: rowIndex + 1,
                  message: `Value ${value} is above maximum ${constraint.max}`,
                  value,
                  constraint: 'max'
                });
                rowValid = false;
              }

              if (constraint.pattern && typeof value === 'string' && !new RegExp(constraint.pattern).test(value)) {
                errors.push({
                  column,
                  row: rowIndex + 1,
                  message: `Value '${value}' does not match pattern ${constraint.pattern}`,
                  value,
                  constraint: 'pattern'
                });
                rowValid = false;
              }

              if (constraint.allowedValues && !constraint.allowedValues.includes(value)) {
                errors.push({
                  column,
                  row: rowIndex + 1,
                  message: `Value '${value}' is not in allowed values: ${constraint.allowedValues.join(', ')}`,
                  value,
                  constraint: 'allowedValues'
                });
                rowValid = false;
              }
            }
          }
        }

        if (rowValid) summary.validRows++;
      });

      summary.errorCount = errors.length;
      summary.warningCount = warnings.length;

      return {
        success: errors.length === 0,
        errors,
        warnings,
        summary,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      return {
        success: false,
        errors: [{
          message: error instanceof Error ? error.message : 'Unknown parsing error'
        }],
        warnings: [],
        summary: {
          totalRows: 0,
          totalColumns: 0,
          validRows: 0,
          errorCount: 1,
          warningCount: 0
        },
        timestamp: new Date().toISOString()
      };
    }
  }

  async function parseCSV(file: File): Promise<any[]> {
    const text = await file.text();
    const lines = text.split('\n').filter(line => line.trim());
    if (lines.length === 0) return [];
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    return lines.slice(1).map(line => {
      const values = line.split(',').map(v => v.trim().replace(/"/g, ''));
      const row: any = {};
      headers.forEach((header, index) => {
        let value: any = values[index] || '';
        // Try to parse as number
        if (value && !isNaN(Number(value))) {
          value = Number(value);
        }
        row[header] = value;
      });
      return row;
    });
  }

  async function parseJSON(file: File): Promise<any[]> {
    const text = await file.text();
    const data = JSON.parse(text);
    return Array.isArray(data) ? data : [data];
  }

  function isValidType(value: any, expectedType: string): boolean {
    switch (expectedType) {
      case 'string': return typeof value === 'string';
      case 'number': return typeof value === 'number' && !isNaN(value);
      case 'boolean': return typeof value === 'boolean';
      case 'date': return !isNaN(Date.parse(value));
      default: return true;
    }
  }

  export function selectSchema(id: string | null) { 
    clearOtherSelections('schema'); 
    select('schema', id); 
  }

  export function getSchema(id: string) { 
    return availableSchemas.find(s => s.id === id); 
  }

  export function getExecution(id: string) { 
    return executions[id]; 
  }

  export function getExecutionStatus(id: string): "ready" | "running" | "completed" | "error" { 
    return executions[id]?.status || 'ready'; 
  }

  export function isSchemaSelected(id: string) { 
    return getSelection('schema') === id; 
  }

  // Configuration management functions
  export function clearSchemas() {
    availableSchemas.length = 0;
    Object.keys(executions).forEach(key => delete executions[key]);
    clearOtherSelections('schema');
  }

  export function loadSchemas(newSchemas: SchemaValidation[]) {
    clearSchemas();
    availableSchemas.push(...newSchemas);
  }

  export function getAvailableSchemas() {
    return availableSchemas;
  }

  // Register breadcrumb resolver for schemas
  registerSelectionResolver('schema', {
    getDisplayName: (id: string) => {
      const schema = availableSchemas.find(s => s.id === id);
      return schema ? schema.title : null;
    },
    getStatus: (id: string) => {
      return getExecutionStatus(id);
    }
  });
</script>