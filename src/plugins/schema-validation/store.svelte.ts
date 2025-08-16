/**
 * Schema Validation Plugin Store
 * Manages schema validation state using Svelte 5 runes
 */

import { pythonExecutor } from '../../core/pyodide/executor.js';
import { schemaValidations, type SchemaValidation, type SchemaValidationExecution, type SchemaValidationResult } from '../../lib/config/schema-config.js';
import { select, clearOtherSelections, getSelection } from '../../core/state/workspace.svelte.js';

// Plugin state using Svelte 5 runes
export const availableSchemas = $state(schemaValidations);
export const executions = $state<Record<string, SchemaValidationExecution>>({});

// Derived state
export function getExecutionsList(): SchemaValidationExecution[] {
  return Object.values(executions);
}

// Actions
export async function startExecution(schemaId: string): Promise<void> {
  const schema = availableSchemas.find(s => s.id === schemaId);
  if (!schema) {
    throw new Error(`Schema ${schemaId} not found`);
  }

  const execution: SchemaValidationExecution = {
    id: `exec_${schemaId}_${Date.now()}`,
    schemaId: schemaId,
    status: "running",
    lastRun: new Date().toISOString()
  };

  executions[schemaId] = execution;

  try {
    // Prepare script for execution
    const script = {
      id: `schema-validation-${schemaId}`,
      content: schema.validationScript,
      title: `Schema Validation: ${schema.title}`
    };

    // Execute validation script
    const result = await pythonExecutor.executeScript(script, {
      timeout: 30000, // 30 second timeout
      onStatusUpdate: (status) => {
        if (executions[schemaId]) {
          executions[schemaId].metrics = { ...executions[schemaId].metrics, status };
        }
      }
    });

    // Update execution with results
    const endTime = new Date().toISOString();
    executions[schemaId] = {
      ...execution,
      status: result.success ? "completed" : "error",
      executionTime: `${result.executionTime}ms`,
      output: result.output,
      error: result.error,
      lastRun: endTime,
      results: result.success ? parseValidationResults(result.output) : undefined,
      metrics: {
        executionTime: `${result.executionTime}ms`,
        lastRun: endTime,
        outputLines: result.output?.split('\n').length || 0,
        errorCount: result.error ? 1 : 0
      }
    };
  } catch (error) {
    executions[schemaId] = {
      ...execution,
      status: "error",
      error: error instanceof Error ? error.message : 'Unknown error',
      lastRun: new Date().toISOString()
    };
    throw error;
  }
}

function parseValidationResults(output: string): SchemaValidationResult | undefined {
  try {
    // Try to parse JSON output from validation script
    const lines = output.split('\n');
    const jsonLine = lines.find(line => line.trim().startsWith('{') && line.includes('total_rows'));
    
    if (jsonLine) {
      const parsed = JSON.parse(jsonLine);
      return {
        summary: {
          overall_status: parsed.overall_status || 'pass',
          total_checks: parsed.total_checks || 0,
          passed: parsed.passed || 0,
          failed: parsed.failed || 0,
          warnings: parsed.warnings || 0
        },
        details: parsed.details || []
      };
    }
  } catch (e) {
    console.warn('Failed to parse validation results:', e);
  }
  
  return undefined;
}

export function selectSchema(schemaId: string | null): void {
  clearOtherSelections('schema');
  select('schema', schemaId);
}

export function getSchema(schemaId: string): SchemaValidation | undefined {
  return availableSchemas.find(s => s.id === schemaId);
}

export function getExecution(schemaId: string): SchemaValidationExecution | undefined {
  return executions[schemaId];
}

export function getExecutionStatus(schemaId: string): "ready" | "running" | "completed" | "error" {
  return executions[schemaId]?.status || "ready";
}

export function getValidationResults(schemaId: string): SchemaValidationResult | undefined {
  return executions[schemaId]?.results;
}

export function isSchemaSelected(schemaId: string): boolean {
  return getSelection('schema') === schemaId;
}