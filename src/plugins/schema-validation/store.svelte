<script module lang="ts">
  import { pythonExecutor } from '@worker/executor';
  import { schemaValidations, type SchemaValidation, type SchemaValidationExecution, type SchemaValidationResult } from '@config/schema-config.js';
  import { select, clearOtherSelections, getSelection } from '@core/state/workspace.svelte';
  import { activeFileRequirements, files as uploadedFiles } from '@plugins/required-files/store.svelte';
  export const availableSchemas = $state<SchemaValidation[]>([...schemaValidations]);
  export const executions = $state<Record<string, SchemaValidationExecution>>({});
  export function getExecutionsList(){ return Object.values(executions); }
  export async function startExecution(schemaId: string){
    const schema = availableSchemas.find(s => s.id === schemaId); if (!schema) throw new Error(`Schema ${schemaId} not found`);
    const base: SchemaValidationExecution = { id: `exec_${schemaId}_${Date.now()}`, schemaId, status: 'running', lastRun: new Date().toISOString() };
    executions[schemaId] = base;
    try {
  // Gather uploaded dependency files for the schema
  const dataFiles = (schema.dependencies || [])
    .filter(d => d.type === 'uploaded')
    .map(d => {
      const req = activeFileRequirements.find(r => r.id === d.sourceId);
      const uploaded = req ? uploadedFiles[req.id] : undefined;
      if (req && uploaded?.file) {
        return { file: uploaded.file, filename: req.defaultFilename };
      }
      return null;
    })
    .filter(Boolean) as { file: File; filename: string }[];

  const result = await pythonExecutor.executeScript(
    { id: `schema-validation-${schemaId}`, content: schema.content, title: `Schema Validation: ${schema.title}` },
    { timeout:30000, dataFiles, onStatusUpdate: (status) => { if (executions[schemaId]) executions[schemaId].metrics = { ...executions[schemaId].metrics, status }; } }
  );
      const end = new Date().toISOString();
      executions[schemaId] = { ...base, status: result.success ? 'completed':'error', executionTime: `${result.executionTime}ms`, output: result.output, error: result.error, lastRun: end, results: result.success ? parseValidationResults(result.output): undefined, metrics: { executionTime: `${result.executionTime}ms`, lastRun: end, outputLines: result.output?.split('\n').length || 0, errorCount: result.error ? 1:0 } };
    } catch (e) {
      executions[schemaId] = { ...base, status: 'error', error: e instanceof Error? e.message:'Unknown error', lastRun: new Date().toISOString() };
      throw e;
    }
  }
  function parseValidationResults(output: string): SchemaValidationResult | undefined {
  try { const lines = output.split('\n'); const jsonLine = lines.find(l => l.trim().startsWith('{') && l.includes('total_checks')); if (jsonLine){ const parsed = JSON.parse(jsonLine); return { overall_status: parsed.overall_status || 'pass', column_validations: parsed.column_validations || [], summary: { total_checks: parsed.summary?.total_checks || parsed.total_checks || 0, passed: parsed.summary?.passed || parsed.passed || 0, failed: parsed.summary?.failed || parsed.failed || 0, warnings: parsed.summary?.warnings || parsed.warnings || 0 }, validation_timestamp: parsed.validation_timestamp, metadata: parsed.metadata }; } } catch(e){ console.warn('Failed to parse validation results', e); }
    return undefined;
  }
  export function selectSchema(id: string | null){ clearOtherSelections('schema'); select('schema', id); }
  export function getSchema(id: string){ return availableSchemas.find(s => s.id === id); }
  export function getExecution(id: string){ return executions[id]; }
  export function getExecutionStatus(id: string){ return executions[id]?.status || 'ready'; }
  export function getValidationResults(id: string){ return executions[id]?.results; }
  export function isSchemaSelected(id: string){ return getSelection('schema') === id; }

  // Configuration management functions
  export function clearSchemas() {
    // Clear all schemas and executions
    availableSchemas.length = 0;
    Object.keys(executions).forEach(key => delete executions[key]);
    // Clear any schema selections
    clearOtherSelections('schema');
  }

  export function loadSchemas(newSchemas: SchemaValidation[]) {
    // Clear existing state
    clearSchemas();
    
    // Update available schemas
    availableSchemas.push(...newSchemas);
    
    // Note: We don't pre-initialize executions for schemas like we do for scripts,
    // as they're created on-demand when validation is triggered
  }

  export function getAvailableSchemas() {
    return availableSchemas;
  }
</script>
