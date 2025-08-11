/**
 * ScriptExecutor - Handles execution of Python scripts using isolated web workers
 * Each script execution runs in a fresh Pyodide instance for memory isolation
 */

import { createPyodideWorker, type WorkerMessage, type ScriptExecutionRequest, type ScriptExecutionResult as WorkerResult } from './pyodide-worker.js';
import type { Script } from '../config/script-config.js';
import { fileRequirements } from '../config/file-config.js';

export interface ScriptExecutionResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  memoryUsage?: string;
  metrics?: Record<string, any>;
  modifiedFiles?: Array<{
    name: string;
    data: Uint8Array;
    path: string;
  }>;
}

export interface ScriptExecutionOptions {
  timeout?: number; // in milliseconds
  dataFiles?: Array<{ file: File; requirementId: string }>; // uploaded files with requirement mapping
  variables?: Record<string, any>; // variables to inject into Python scope
  onStatusUpdate?: (status: string) => void; // callback for status updates
  onStdout?: (output: string) => void; // callback for stdout
  onStderr?: (output: string) => void; // callback for stderr
}

export class ScriptExecutor {
  private activeWorkers: Map<string, Worker> = new Map();
  private executionCounter: number = 0;

  constructor() {
    // No shared state - each execution creates a fresh worker
  }

  public async executeScript(
    script: Script, 
    options: ScriptExecutionOptions = {}
  ): Promise<ScriptExecutionResult> {
    const startTime = Date.now();
    const executionId = `exec_${++this.executionCounter}_${Date.now()}`;
    
    // Prepare files for worker using defaultFilenames from file requirements
    const files: Array<{ name: string; originalName: string; requirementId: string; data: ArrayBuffer }> = [];
    if (options.dataFiles) {
      for (const fileData of options.dataFiles) {
        // Always use the defaultFilename from file requirements
        const requirement = fileRequirements.find(req => req.id === fileData.requirementId);
        const targetFileName = requirement?.defaultFilename || fileData.file.name;
        
        files.push({
          name: targetFileName,
          originalName: fileData.file.name,
          requirementId: fileData.requirementId,
          data: await fileData.file.arrayBuffer()
        });
      }
    }
    
    // Get embedded assets if we're in a single-file build
    const embeddedAssets = typeof (globalThis as any).__PYODIDE_ASSETS__ !== 'undefined' 
      ? (globalThis as any).__PYODIDE_ASSETS__ 
      : undefined;
    
    // Get base URL for development mode
    const baseUrl = `${window.location.protocol}//${window.location.host}`;
    
    return new Promise((resolve) => {
      // Create a fresh worker for this execution
      const worker = createPyodideWorker();
      this.activeWorkers.set(executionId, worker);
      
      let stdout = '';
      let stderr = '';
      
      // Set up timeout if specified
      const timeoutId = options.timeout ? setTimeout(() => {
        worker.terminate();
        this.activeWorkers.delete(executionId);
        
        const executionTime = Date.now() - startTime;
        resolve({
          success: false,
          output: stdout,
          error: `Script execution timed out after ${options.timeout}ms`,
          executionTime
        });
      }, options.timeout) : null;
      
      // Handle worker messages
      worker.onmessage = (event: MessageEvent<WorkerMessage>) => {
        const { type, id, data } = event.data;
        
        // Only handle messages for this execution
        if (id && id !== executionId) return;
        
        switch (type) {
          case 'status':
            options.onStatusUpdate?.(data);
            break;
            
          case 'stdout':
            stdout += data;
            options.onStdout?.(data);
            break;
            
          case 'stderr':
            stderr += data;
            options.onStderr?.(data);
            break;
            
          case 'complete':
            if (timeoutId) clearTimeout(timeoutId);
            worker.terminate();
            this.activeWorkers.delete(executionId);
            
            const executionTime = Date.now() - startTime;
            const result: WorkerResult = data;
            
            resolve({
              success: true,
              output: result.stdout || stdout,
              executionTime,
              modifiedFiles: result.modifiedFiles,
              metrics: {
                outputLines: (result.stdout || '').split('\\n').length,
                errorCount: result.stderr ? 1 : 0,
                filesCreated: result.modifiedFiles?.length || 0
              }
            });
            break;
            
          case 'error':
            if (timeoutId) clearTimeout(timeoutId);
            worker.terminate();
            this.activeWorkers.delete(executionId);
            
            const errorExecutionTime = Date.now() - startTime;
            resolve({
              success: false,
              output: stdout,
              error: data.error || 'Unknown error',
              executionTime: errorExecutionTime
            });
            break;
        }
      };
      
      // Handle worker errors
      worker.onerror = (error) => {
        if (timeoutId) clearTimeout(timeoutId);
        worker.terminate();
        this.activeWorkers.delete(executionId);
        
        const executionTime = Date.now() - startTime;
        resolve({
          success: false,
          output: stdout,
          error: `Worker error: ${error.message}`,
          executionTime
        });
      };
      
      // Send execution request to worker
      const request: ScriptExecutionRequest = {
        id: executionId,
        python: script.content,
        files,
        embeddedAssets,
        baseUrl
      };
      
      worker.postMessage(request);
    });
  }

  public cancelExecution(executionId?: string): void {
    if (executionId) {
      // Cancel specific execution
      const worker = this.activeWorkers.get(executionId);
      if (worker) {
        worker.terminate();
        this.activeWorkers.delete(executionId);
      }
    } else {
      // Cancel all active executions
      for (const [id, worker] of this.activeWorkers) {
        worker.terminate();
      }
      this.activeWorkers.clear();
    }
  }

  public isCurrentlyExecuting(): boolean {
    return this.activeWorkers.size > 0;
  }

  public getActiveExecutionsCount(): number {
    return this.activeWorkers.size;
  }

  // Cleanup method
  public dispose(): void {
    this.cancelExecution(); // Cancel all active executions
  }
}