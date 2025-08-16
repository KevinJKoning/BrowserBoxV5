/**
 * Results Plugin Store
 * Manages script output files and results state using Svelte 5 runes
 */

import { select, clearOtherSelections, getSelection } from '../../core/state/workspace.svelte.js';

// Result file interface
export interface ResultFile {
  /** Unique identifier for the result file */
  id: string;
  /** Original filename */
  filename: string;
  /** File type/extension */
  fileType: string;
  /** File size in bytes */
  fileSize: number;
  /** File content (for small files) or file handle */
  content?: string | Uint8Array;
  /** Creation timestamp */
  createdAt: string;
  /** Script ID that generated this result */
  scriptId: string;
  /** Optional description/metadata */
  description?: string;
  /** Pyodide filesystem path where the file is stored */
  pyodidePath: string;
}

// Plugin state using Svelte 5 runes
export const resultFiles = $state<Record<string, ResultFile>>({});
export const preExecutionFiles = $state(new Set<string>());
export const isScanning = $state(false);

// Derived state
export function getAllResults(): ResultFile[] {
  return Object.values(resultFiles);
}
export function getResultsCount(): number {
  return Object.keys(resultFiles).length;
}

// Actions
export function selectResult(resultId: string | null): void {
  clearOtherSelections('result');
  select('result', resultId);
}

export function addResult(resultFile: Omit<ResultFile, 'id'>): string {
  const id = `result_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const newResult: ResultFile = {
    ...resultFile,
    id
  };
  resultFiles[id] = newResult;
  return id;
}

export function removeResult(resultId: string): void {
  delete resultFiles[resultId];
  if (getSelection('result') === resultId) {
    selectResult(null);
  }
}

export function clearAllResults(): void {
  Object.keys(resultFiles).forEach(id => delete resultFiles[id]);
  selectResult(null);
}

export function getResultFile(id: string): ResultFile | undefined {
  return resultFiles[id];
}

export function getResultsByScript(scriptId: string): ResultFile[] {
  return allResults.filter(file => file.scriptId === scriptId);
}

export function getResultsByType(fileType: string): ResultFile[] {
  return allResults.filter(file => 
    file.fileType.toLowerCase() === fileType.toLowerCase()
  );
}

export function isResultSelected(id: string): boolean {
  return getSelection('result') === id;
}