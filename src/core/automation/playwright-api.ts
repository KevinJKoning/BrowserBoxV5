/**
 * Playwright Automation API
 * Provides programmatic access to BrowserBox functionality for automated testing
 */

import type { Script, ScriptExecution } from "@config/types.js";

export interface AutomationScript {
  id: string;
  title: string;
  description: string;
  filename: string;
  content: string;
  status: "ready" | "running" | "completed" | "error";
}

export interface AutomationExecution {
  status: "ready" | "running" | "completed" | "error";
  output?: string;
  error?: string;
  executionTime?: string;
  lastRun?: string;
  startedAt?: string;
  completedAt?: string;
}

export interface AutomationResult {
  id: string;
  filename: string;
  scriptId: string;
  content: Uint8Array | null;
  fileSize: number;
  createdAt: string;
}

export interface AutomationAPI {
  // Script management
  getAllScripts(): Promise<AutomationScript[]>;
  getScriptById(scriptId: string): Promise<AutomationScript | null>;
  executeScript(scriptId: string): Promise<AutomationExecution>;
  executeAllScripts(): Promise<AutomationExecution[]>;
  getExecutionStatus(scriptId: string): Promise<"ready" | "running" | "completed" | "error">;
  getExecution(scriptId: string): Promise<AutomationExecution | null>;
  waitForExecution(scriptId: string, timeoutMs?: number): Promise<AutomationExecution>;
  
  // Result management
  getAllResults(): Promise<AutomationResult[]>;
  getResultsByScript(scriptId: string): Promise<AutomationResult[]>;
  downloadResult(resultId: string): Promise<void>;
  downloadAllResults(): Promise<void>;
  
  // Configuration management
  loadConfiguration(configFile: File): Promise<boolean>;
  getActiveConfiguration(): unknown;
  
  // Utility functions
  waitForCondition(condition: () => boolean, timeoutMs?: number, checkIntervalMs?: number): Promise<boolean>;
  getApplicationStatus(): Promise<{
    ready: boolean;
    scriptsLoaded: number;
    configLoaded: boolean;
  }>;
}

class PlaywrightAutomationAPI implements AutomationAPI {
  private async getScriptsStore() {
    return await import("@plugins/scripts/store.svelte");
  }

  private async getResultsStore() {
    return await import("@plugins/results/store.svelte");
  }

  private async getConfigStore() {
    return await import("@plugins/configuration/store.svelte");
  }

  async getAllScripts(): Promise<AutomationScript[]> {
    const scriptsStore = await this.getScriptsStore();
    const scripts = scriptsStore.getAvailableScripts();
    return scripts.map((script: Script) => ({
      id: script.id,
      title: script.title,
      description: script.description,
      filename: script.filename,
      content: script.content,
      status: scriptsStore.getExecutionStatus(script.id)
    }));
  }

  async getScriptById(scriptId: string): Promise<AutomationScript | null> {
    const scriptsStore = await this.getScriptsStore();
    const scripts = scriptsStore.getAvailableScripts();
    const script = scripts.find((s: Script) => s.id === scriptId);
    if (!script) return null;
    
    return {
      id: script.id,
      title: script.title,
      description: script.description,
      filename: script.filename,
      content: script.content,
      status: scriptsStore.getExecutionStatus(script.id)
    };
  }

  async executeScript(scriptId: string): Promise<AutomationExecution> {
    const script = await this.getScriptById(scriptId);
    if (!script) {
      throw new Error(`Script with ID ${scriptId} not found`);
    }

    const scriptsStore = await this.getScriptsStore();
    // Start execution
    await scriptsStore.startExecution(scriptId);

    // Wait for completion
    return this.waitForExecution(scriptId);
  }

  async executeAllScripts(): Promise<AutomationExecution[]> {
    const scripts = await this.getAllScripts();
    const executions: AutomationExecution[] = [];

    for (const script of scripts) {
      try {
        const execution = await this.executeScript(script.id);
        executions.push(execution);
      } catch (error) {
        executions.push({
          status: "error",
          error: error instanceof Error ? error.message : String(error)
        });
      }
    }

    return executions;
  }

  async getExecutionStatus(scriptId: string): Promise<"ready" | "running" | "completed" | "error"> {
    const scriptsStore = await this.getScriptsStore();
    return scriptsStore.getExecutionStatus(scriptId);
  }

  async getExecution(scriptId: string): Promise<AutomationExecution | null> {
    const scriptsStore = await this.getScriptsStore();
    const execution = scriptsStore.getExecution(scriptId);
    if (!execution) return null;

    return {
      status: execution.status,
      output: execution.output,
      error: execution.error,
      executionTime: execution.executionTime,
      lastRun: execution.lastRun,
      startedAt: (execution as ScriptExecution & { startedAt?: string }).startedAt,
      completedAt: (execution as ScriptExecution & { completedAt?: string }).completedAt
    };
  }

  async waitForExecution(scriptId: string, timeoutMs: number = 60000): Promise<AutomationExecution> {
    const startTime = Date.now();
    
    return new Promise((resolve, reject) => {
      const checkStatus = async () => {
        const execution = await this.getExecution(scriptId);
        const status = await this.getExecutionStatus(scriptId);

        if (status === "completed" || status === "error") {
          resolve(execution || {
            status,
            error: status === "error" ? "Unknown error occurred" : undefined
          });
          return;
        }

        if (Date.now() - startTime > timeoutMs) {
          reject(new Error(`Execution timeout after ${timeoutMs}ms for script ${scriptId}`));
          return;
        }

        setTimeout(checkStatus, 500);
      };

      checkStatus();
    });
  }

  async getAllResults(): Promise<AutomationResult[]> {
    const resultsStore = await this.getResultsStore();
    const results = resultsStore.getAllResults();
    return results.map((result: any) => ({
      id: result.id,
      filename: result.filename,
      scriptId: result.scriptId,
      content: result.content instanceof Uint8Array ? result.content : null,
      fileSize: result.fileSize,
      createdAt: result.createdAt
    }));
  }

  async getResultsByScript(scriptId: string): Promise<AutomationResult[]> {
    const results = await this.getAllResults();
    return results.filter(result => result.scriptId === scriptId);
  }

  async downloadResult(resultId: string): Promise<void> {
    const results = await this.getAllResults();
    const result = results.find(r => r.id === resultId);
    if (!result) {
      throw new Error(`Result with ID ${resultId} not found`);
    }

    // Create a blob from the result content
    const content = result.content ?? new Uint8Array();
    const blob = new Blob([new Uint8Array(content)]);
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = result.filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async downloadAllResults(): Promise<void> {
    const results = await this.getAllResults();
    for (const result of results) {
      await this.downloadResult(result.id);
    }
  }

  async loadConfiguration(configFile: File): Promise<boolean> {
    try {
      const configStore = await this.getConfigStore();
      await configStore.loadConfigurationPackage(configFile);
      return true;
    } catch (error) {
      console.error("Failed to load configuration:", error);
      return false;
    }
  }

  getActiveConfiguration(): unknown {
    // Return null since we don't need to track active configuration state in automation API
    return null;
  }

  async waitForCondition(
    condition: () => boolean, 
    timeoutMs: number = 10000, 
    checkIntervalMs: number = 100
  ): Promise<boolean> {
    const startTime = Date.now();
    
    return new Promise((resolve, reject) => {
      const check = () => {
        if (condition()) {
          resolve(true);
          return;
        }

        if (Date.now() - startTime > timeoutMs) {
          reject(new Error(`Condition timeout after ${timeoutMs}ms`));
          return;
        }

        setTimeout(check, checkIntervalMs);
      };

      check();
    });
  }

  async getApplicationStatus(): Promise<{
    ready: boolean;
    scriptsLoaded: number;
    configLoaded: boolean;
  }> {
    const scripts = await this.getAllScripts();
    return {
      ready: true,
      scriptsLoaded: scripts.length,
      configLoaded: true
    };
  }
}

// Create global automation API
const automationAPI = new PlaywrightAutomationAPI();

// Expose to window for Playwright access
declare global {
  interface Window {
    browserboxAutomation: AutomationAPI;
  }
}

// Initialize the automation API on window
if (typeof window !== 'undefined') {
  window.browserboxAutomation = automationAPI;
}

export { automationAPI };