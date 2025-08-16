<script module lang="ts">
  import { pythonExecutor } from '@worker/executor';
  import { scripts, type Script, type ScriptExecution } from '@config/script-config.js';
  /**
   * RUNTIME STORE (Svelte 5 runes):
   * `availableScripts` is dynamically replaced via loadScripts() when a configuration
   * package is applied. Do NOT import `scripts` (static config) elsewhere for live UI
   * state; rely on this exported $state instead to avoid stale data.
   */
  import { select, clearOtherSelections, getSelection } from '@core/state/workspace.svelte';

  export const availableScripts = $state<Script[]>([...scripts]);
  export const executions = $state<Record<string, ScriptExecution>>({});
  scripts.forEach(s => { executions[s.id] = { id: `exec_${s.id}`, scriptId: s.id, status: 'ready' }; });

  export async function startExecution(scriptId: string) {
    const script = availableScripts.find(s => s.id === scriptId); if (!script) throw new Error(`Script ${scriptId} not found`);
    const base: ScriptExecution = { id: `exec_${scriptId}_${Date.now()}`, scriptId, status: 'running', lastRun: new Date().toISOString() };
    executions[scriptId] = base;
    try {
      const result = await pythonExecutor.executeScript({ id: script.id, content: script.content, title: script.title }, { timeout:60000, onStatusUpdate: (status) => { if (executions[scriptId]) executions[scriptId].metrics = { ...executions[scriptId].metrics, status }; } });
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
  export function getExecutionStatus(id: string) { return executions[id]?.status || 'ready'; }
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
    
    // Initialize executions for new scripts
    for (const script of newScripts) {
      executions[script.id] = { 
        id: `exec_${script.id}`, 
        scriptId: script.id, 
        status: 'ready' 
      };
    }
  }

  export function getAvailableScripts() {
    return availableScripts;
  }
</script>
