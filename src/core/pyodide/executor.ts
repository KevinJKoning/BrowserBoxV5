/**
 * Pyodide Executor Service - Central Python execution management
 * Provides a clean interface for plugins to execute Python code
 */

import { SimplePyodideExecutor, type ScriptResult, type ScriptOptions, type Script } from './internal/simple-pyodide.js';

class PyodideExecutorService {
  private executor: SimplePyodideExecutor;

  constructor() {
    this.executor = new SimplePyodideExecutor();
  }

  /**
   * Execute a Python script with optional data files
   */
  async executeScript(script: Script, options: ScriptOptions = {}): Promise<ScriptResult> {
    return this.executor.executeScript(script, options);
  }

  /**
   * Cancel a specific execution
   */
  cancelExecution(executionId?: string) {
    this.executor.cancelExecution(executionId);
  }

  /**
   * Cancel all running executions
   */
  cancelAllExecutions() {
    this.executor.cancelExecution();
  }

  /**
   * Dispose of the executor and clean up resources
   */
  dispose() {
    this.executor.dispose();
  }
}

// Singleton instance for the application
export const pythonExecutor = new PyodideExecutorService();

// Export types for plugins to use
export type { ScriptResult, ScriptOptions, Script } from './simple-pyodide.js';