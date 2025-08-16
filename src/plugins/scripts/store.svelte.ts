/**
 * Scripts Plugin Store
 * Manages Python script execution state using Svelte 5 runes
 */

import { pythonExecutor } from '../../core/pyodide/executor.js';
import { scripts, type Script, type ScriptExecution } from '../../lib/config/script-config.js';
import { select, clearOtherSelections, getSelection } from '../../core/state/workspace.svelte.js';

// Helper function to get file description based on extension
function getFileDescription(extension: string): string {
  switch (extension.toLowerCase()) {
    case 'html':
    case 'htm':
      return 'HTML report or visualization';
    case 'parquet':
    case 'pq':
      return 'Parquet data file';
    case 'csv':
      return 'CSV data file';
    case 'json':
      return 'JSON data file';
    case 'png':
    case 'jpg':
    case 'jpeg':
      return 'Image file';
    case 'pdf':
      return 'PDF document';
    default:
      return 'Generated file';
  }
}

// Plugin state using Svelte 5 runes
export const availableScripts = $state(scripts);
export const executions = $state<Record<string, ScriptExecution>>({});

// Initialize execution states for all scripts
scripts.forEach(script => {
  executions[script.id] = {
    id: `exec_${script.id}`,
    scriptId: script.id,
    status: "ready"
  };
});

// Actions
export async function startExecution(scriptId: string): Promise<void> {
  const script = availableScripts.find(s => s.id === scriptId);
  if (!script) {
    throw new Error(`Script ${scriptId} not found`);
  }

  const execution: ScriptExecution = {
    id: `exec_${scriptId}_${Date.now()}`,
    scriptId: scriptId,
    status: "running",
    lastRun: new Date().toISOString()
  };

  executions[scriptId] = execution;

  try {
    // Prepare script for execution
    const scriptToExecute = {
      id: script.id,
      content: script.content,
      title: script.title
    };

    // Execute script
    const result = await pythonExecutor.executeScript(scriptToExecute, {
      timeout: 60000, // 60 second timeout for scripts
      onStatusUpdate: (status) => {
        if (executions[scriptId]) {
          executions[scriptId].metrics = { ...executions[scriptId].metrics, status };
        }
      }
    });

    // Process any generated files
    const generatedFiles = result.modifiedFiles || [];
    
    // Store results in results plugin (would need to integrate with results store)
    // For now, we'll store them in the execution
    const endTime = new Date().toISOString();
    executions[scriptId] = {
      ...execution,
      status: result.success ? "completed" : "error",
      executionTime: `${result.executionTime}ms`,
      output: result.output,
      error: result.error,
      lastRun: endTime,
      metrics: {
        executionTime: `${result.executionTime}ms`,
        lastRun: endTime,
        outputLines: result.output?.split('\n').length || 0,
        errorCount: result.error ? 1 : 0,
        filesGenerated: generatedFiles.length
      }
    };

    // TODO: Add generated files to results store when integrated
    console.log(`Script ${scriptId} generated ${generatedFiles.length} files`);
    
  } catch (error) {
    executions[scriptId] = {
      ...execution,
      status: "error",
      error: error instanceof Error ? error.message : 'Unknown error',
      lastRun: new Date().toISOString()
    };
    throw error;
  }
}

export function selectScript(scriptId: string | null): void {
  clearOtherSelections('script');
  select('script', scriptId);
}

export function getScript(scriptId: string): Script | undefined {
  return availableScripts.find(s => s.id === scriptId);
}

export function getExecution(scriptId: string): ScriptExecution | undefined {
  return executions[scriptId];
}

export function getExecutionStatus(scriptId: string): "ready" | "running" | "completed" | "error" {
  return executions[scriptId]?.status || "ready";
}

export function isScriptSelected(scriptId: string): boolean {
  return getSelection('script') === scriptId;
}