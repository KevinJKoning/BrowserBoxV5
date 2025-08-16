<script module lang="ts">
  import { pythonExecutor } from '../../core/pyodide/executor.js';
  import { scripts, type ScriptExecution } from '../../lib/config/script-config.js';
  import { select, clearOtherSelections, getSelection } from '../../core/state/workspace.svelte';

  export const availableScripts = $state(scripts);
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
</script>
