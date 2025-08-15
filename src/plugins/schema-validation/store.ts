/**
 * Schema Validation Plugin Store
 * Manages schema validation state using Svelte 5 runes
 */

import { pythonExecutor } from '../../core/pyodide/executor.js';
import { availableSchemas } from '../../lib/config/schema-config.js';
import type { Schema, SchemaExecution, ValidationResults } from '../../lib/config/schema-config.js';
import { select, clearOtherSelections } from '../../core/state/workspace.js';

// Plugin state using Svelte 5 runes
export const executions = $state<Record<string, SchemaExecution>>({});

// Derived state
export const executionsList = $derived(Object.values(executions));

// Helper functions
function generateExecutionId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Actions
export async function startExecution(schemaId: string): Promise<void> {
  const schema = availableSchemas.find(s => s.id === schemaId);
  if (!schema) {
    throw new Error(`Schema ${schemaId} not found`);
  }

  const executionId = generateExecutionId();
  const execution: SchemaExecution = {
    id: executionId,
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

function parseValidationResults(output: string): ValidationResults | undefined {
  try {
    // Try to parse JSON output from validation script
    const lines = output.split('\n');
    const jsonLine = lines.find(line => line.trim().startsWith('{') && line.includes('total_rows'));
    
    if (jsonLine) {
      const parsed = JSON.parse(jsonLine);
      return {
        summary: {
          totalRows: parsed.total_rows || 0,
          validRows: parsed.valid_rows || 0,
          errorRows: parsed.error_rows || 0,
          successRate: parsed.success_rate || 0
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

export function getSchema(schemaId: string): Schema | undefined {
  return availableSchemas.find(s => s.id === schemaId);
}

export function getExecution(schemaId: string): SchemaExecution | undefined {
  return executions[schemaId];
}

export function getExecutionStatus(schemaId: string): "ready" | "running" | "completed" | "error" {
  return executions[schemaId]?.status || "ready";
}

export function getValidationResults(schemaId: string): ValidationResults | undefined {
  return executions[schemaId]?.results;
}