<script module lang="ts">
  import { select, clearOtherSelections, getSelection } from '@core/state/workspace.svelte';
  export interface ResultFile { id: string; filename: string; fileType: string; fileSize: number; content?: string|Uint8Array; createdAt: string; scriptId: string; description?: string; pyodidePath: string; }
  export const resultFiles = $state<Record<string, ResultFile>>({});
  export const preExecutionFiles = $state(new Set<string>());
  export const isScanning = $state(false);
  export function getAllResults(){ return Object.values(resultFiles); }
  export function getResultsCount(){ return Object.keys(resultFiles).length; }
  export function selectResult(id: string | null){ clearOtherSelections('result'); select('result', id); }
  export function addResult(file: Omit<ResultFile,'id'>){ const id = `result_${Date.now()}_${Math.random().toString(36).slice(2,11)}`; resultFiles[id] = { ...file, id }; return id; }
  export function removeResult(id: string){ delete resultFiles[id]; if (getSelection('result')===id) selectResult(null); }
  export function clearAllResults(){ Object.keys(resultFiles).forEach(id => delete resultFiles[id]); selectResult(null); }
  export function getResultFile(id: string){ return resultFiles[id]; }
  export function getResultsByScript(scriptId: string){ return getAllResults().filter(f => f.scriptId === scriptId); }
  export function getResultsByType(fileType: string){ const low = fileType.toLowerCase(); return getAllResults().filter(f => f.fileType.toLowerCase() === low); }
  export function isResultSelected(id: string){ return getSelection('result') === id; }
</script>
