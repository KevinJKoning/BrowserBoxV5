<script module lang="ts">
  import { pythonExecutor } from '@worker/executor';
  import { scripts, type Script, type ScriptExecution } from '@config/script-config.js';
  import { select, clearOtherSelections, getSelection } from '@core/state/workspace.svelte';
  import { activeFileRequirements, files as uploadedFiles } from '@plugins/required-files/store.svelte';

  export const availableScripts = $state<Script[]>([...scripts]);
  export const executions = $state<Record<string, ScriptExecution>>({});
  // Note: Don't pre-initialize executions - they should be created on-demand when scripts run
  // This ensures proper dependency checking and prevents showing "Ready" for scripts with unmet dependencies

  export async function startExecution(scriptId: string) {
    const script = availableScripts.find(s => s.id === scriptId); if (!script) throw new Error(`Script ${scriptId} not found`);
    const base: ScriptExecution = { id: `exec_${scriptId}_${Date.now()}`, scriptId, status: 'running', lastRun: new Date().toISOString() };
    executions[scriptId] = base;
    try {
      // Gather uploaded dependency files (only 'uploaded' dependencies currently supported)
      const dataFiles = (script.dependencies || [])
        .filter(d => d.type === 'uploaded')
        .map(d => {
          const req = activeFileRequirements.find(r => r.id === d.sourceId);
          const uploaded = req ? uploadedFiles[req.id] : undefined;
          if (req && uploaded?.file) {
            return { file: uploaded.file, filename: req.defaultFilename };
          }
          return null; // missing dependency; silently skip (status UI will reflect waiting earlier)
        })
        .filter(Boolean) as { file: File; filename: string }[];

      const result = await pythonExecutor.executeScript(
        { id: script.id, content: script.content, title: script.title },
        { timeout:60000, dataFiles, onStatusUpdate: (status) => { if (executions[scriptId]) executions[scriptId].metrics = { ...executions[scriptId].metrics, status }; } }
      );
      const generatedFiles = result.modifiedFiles || [];
      const end = new Date().toISOString();
      executions[scriptId] = { ...base, status: result.success ? 'completed':'error', executionTime: `${result.executionTime}ms`, output: result.output, error: result.error, lastRun: end, metrics: { executionTime: `${result.executionTime}ms`, lastRun: end, outputLines: result.output?.split('\n').length || 0, errorCount: result.error ? 1:0, filesGenerated: generatedFiles.length } };
    } catch (e) {
      executions[scriptId] = { ...base, status: 'error', error: e instanceof Error? e.message:'Unknown error', lastRun: new Date().toISOString() };
      throw e;
    }
  }
  export function selectScript(id: string | null) { clearOtherSelections('script'); select('script', id); }
  export function getScript(id: string) { return availableScripts.find(s => s.id === id); }
  export function getExecution(id: string) { return executions[id]; }
  export function getExecutionStatus(id: string): "ready" | "running" | "completed" | "error" { 
    return executions[id]?.status || 'ready'; 
  }
  export function isScriptSelected(id: string) { return getSelection('script') === id; }

  // Configuration management functions
  export function clearScripts() {
    // Clear all scripts and executions
    availableScripts.length = 0;
    Object.keys(executions).forEach(key => delete executions[key]);
    // Clear any script selections
    clearOtherSelections('script');
  }

  export function loadScripts(newScripts: Script[]) {
    // Clear existing state
    clearScripts();
    
    // Update available scripts
    availableScripts.push(...newScripts);
    
    // Note: Don't pre-initialize executions for new scripts.
    // Executions are created on-demand when scripts are actually run.
    // This allows proper dependency checking to determine if scripts show "Waiting" or "Ready"
  }

  export function getAvailableScripts() {
    return availableScripts;
  }
</script>
