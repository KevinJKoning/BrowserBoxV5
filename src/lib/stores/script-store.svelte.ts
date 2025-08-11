/**
 * Modern Svelte 5 Runes-based Script Store
 * Manages Python script execution and state with Pyodide integration
 */

import { scripts, type Script, type ScriptExecution } from '../config/script-config.js';
import { ScriptExecutor } from '../pyodide/script-executor.js';
import { DataBridge } from '../pyodide/data-bridge.js';
import { fileManagerState } from './file-store.svelte.js';
import { resultsManagerState, resultsActions, resultsSelectors } from './results-store.svelte.js';

// Helper function to get a description based on file type
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

// Core state using Svelte 5 runes
export const scriptManagerState = $state({
	// Script execution results - object for reactivity
	executions: {} as Record<string, ScriptExecution>,
	
	// UI state
	selectedScriptId: null as string | null,
	
	// Available scripts (from config)
	availableScripts: scripts
});

// Pyodide integration instances (not reactive state)
const scriptExecutor = new ScriptExecutor();
const dataBridge = new DataBridge();

// Initialize execution states for all scripts
scripts.forEach(script => {
	scriptManagerState.executions[script.id] = {
		id: `exec_${script.id}`,
		scriptId: script.id,
		status: "ready"
	};
});

// Export selectors as functions for specific use cases that need parameters
export const scriptSelectors = {
	// Parameterized selectors that can't be reactive
	getScript: (id: string) => scriptManagerState.availableScripts.find(s => s.id === id),
	getExecution: (id: string) => scriptManagerState.executions[id],
	getExecutionStatus: (id: string) => scriptManagerState.executions[id]?.status ?? "ready",
	isScriptSelected: (id: string) => scriptManagerState.selectedScriptId === id,
	getScriptsByCategory: (category?: string) => {
		if (!category) return scriptManagerState.availableScripts;
		return scriptManagerState.availableScripts.filter(s => s.category === category);
	},
	
	// Computed selectors that don't need parameters should be accessed directly via state
	// Components should use: scriptManagerState.availableScripts instead of getAllScripts()
	// Components should use: scriptManagerState.selectedScriptId ? scriptManagerState.availableScripts.find(s => s.id === scriptManagerState.selectedScriptId) : null instead of getSelectedScript()
	// Components should use: scriptManagerState.selectedScriptId ? scriptManagerState.executions[scriptManagerState.selectedScriptId] : null instead of getSelectedExecution()
};

// Actions for script management
export const scriptActions = {
	// Select script for preview
	selectScript(scriptId: string | null) {
		const script = scriptId ? scriptSelectors.getScript(scriptId) : null;
		if (scriptId && !script) {
			console.warn(`Attempted to select non-existent script: ${scriptId}`);
			return;
		}
		scriptManagerState.selectedScriptId = scriptId;
	},
	
	// Start script execution with isolated Pyodide worker
	async startExecution(scriptId: string) {
		const script = scriptSelectors.getScript(scriptId);
		if (!script) {
			console.error(`Invalid script ID: ${scriptId}`);
			return;
		}
		
		// Initialize execution state
		const execution: ScriptExecution = {
			id: `exec_${scriptId}`,
			scriptId,
			status: "running",
			output: "",
			error: "",
			metrics: {
				outputLines: 0,
				errorCount: 0
			}
		};
		
		scriptManagerState.executions[scriptId] = execution;
		
		try {
			// Prepare data files array based on script dependencies
			const dataFiles: Array<{ file: File; requirementId: string }> = [];
			
			if (script.dependencies) {
				for (const dependency of script.dependencies) {
					let file: File | null = null;
					let requirementId: string | null = null;
					
					if (dependency.type === 'uploaded') {
						// Get file from uploaded files
						const uploadedFile = fileManagerState.files[dependency.sourceId];
						if (uploadedFile?.file) {
							file = uploadedFile.file;
							requirementId = dependency.sourceId;
						} else {
							console.warn(`Dependency not found: uploaded file '${dependency.sourceId}' for script '${script.id}'`);
							continue;
						}
					} else if (dependency.type === 'result') {
						// Find result files by script ID (sourceId is the script ID that generates the result)
						const results = Object.values(resultsManagerState.resultFiles);
						const resultFiles = results.filter(r => r.scriptId === dependency.sourceId);
						
						// Use the first result file from the specified script
						const result = resultFiles.length > 0 ? resultFiles[0] : null;
						
						if (result?.content && result.content instanceof Uint8Array) {
							// Create File object from result content using the original filename
							const blob = new Blob([result.content], { type: 'application/octet-stream' });
							file = new File([blob], result.filename, { 
								lastModified: new Date(result.createdAt).getTime() 
							});
							requirementId = result.id; // Use result ID as requirementId
						} else {
							console.warn(`Dependency not found: no result files from script '${dependency.sourceId}' for script '${script.id}'`);
							continue;
						}
					}
					
					if (file && requirementId) {
						dataFiles.push({
							file,
							requirementId
						});
					}
				}
			} else {
				// Fallback: include all uploaded files if no dependencies specified
				Object.entries(fileManagerState.files).forEach(([requirementId, uploadedFile]) => {
					if (uploadedFile.file) {
						dataFiles.push({
							file: uploadedFile.file,
							requirementId: requirementId
						});
					}
				});
			}
			
			// Execute the script with isolated Pyodide worker
			const result = await scriptExecutor.executeScript(script, {
				timeout: 60000, // 60 second timeout for worker execution
				dataFiles,
				onStatusUpdate: (status) => {
					// Update execution output with status updates
					const currentExecution = scriptManagerState.executions[scriptId];
					if (currentExecution && currentExecution.status === "running") {
						currentExecution.output += `[${new Date().toLocaleTimeString()}] ${status}\n`;
					}
				}
			});
			
			// Process any output files from the script execution
			if (result.modifiedFiles && result.modifiedFiles.length > 0) {
				for (const modifiedFile of result.modifiedFiles) {
					// Create File object from the binary data
					const blob = new Blob([modifiedFile.data], { type: 'application/octet-stream' });
					const file = new File([blob], modifiedFile.name, { 
						lastModified: new Date().getTime() 
					});
					
					// Determine file type from extension
					const fileExtension = modifiedFile.name.split('.').pop()?.toLowerCase() || '';
					
					// Add to results store
					resultsActions.addResult({
						filename: modifiedFile.name,
						fileType: fileExtension,
						fileSize: modifiedFile.data.length,
						content: modifiedFile.data,
						createdAt: new Date().toISOString(),
						scriptId: scriptId,
						pyodidePath: modifiedFile.path,
						description: getFileDescription(fileExtension)
					});
				}
			}
			
			// Update execution state with results
			scriptActions.completeExecution(scriptId, {
				output: result.output,
				error: result.error,
				executionTime: `${(result.executionTime / 1000).toFixed(2)}s`,
				metrics: {
					...result.metrics,
					executionTimeMs: result.executionTime,
					filesCreated: result.modifiedFiles?.length || 0
				}
			});
			
		} catch (error) {
			// Handle execution errors
			const errorMessage = error instanceof Error ? error.message : String(error);
			scriptActions.errorExecution(scriptId, errorMessage);
		}
	},
	
	// Complete script execution
	completeExecution(scriptId: string, result: {
		output?: string;
		error?: string;
		executionTime?: string;
		metrics?: any;
	}) {
		const execution = scriptManagerState.executions[scriptId];
		if (!execution) {
			console.error(`No execution found for script: ${scriptId}`);
			return;
		}
		
		scriptManagerState.executions[scriptId] = {
			...execution,
			status: result.error ? "error" : "completed",
			output: result.output || "",
			error: result.error || "",
			executionTime: result.executionTime || "",
			lastRun: new Date().toLocaleString(),
			metrics: {
				...execution.metrics,
				...result.metrics,
				outputLines: result.output ? result.output.split('\n').length : 0,
				errorCount: result.error ? 1 : 0
			}
		};
	},
	
	// Handle execution error
	errorExecution(scriptId: string, error: string) {
		const execution = scriptManagerState.executions[scriptId];
		if (!execution) {
			console.error(`No execution found for script: ${scriptId}`);
			return;
		}
		
		scriptManagerState.executions[scriptId] = {
			...execution,
			status: "error",
			error,
			lastRun: new Date().toLocaleString(),
			metrics: {
				...execution.metrics,
				errorCount: 1
			}
		};
	},
	
	// Reset script execution state
	resetExecution(scriptId: string) {
		scriptManagerState.executions[scriptId] = {
			id: `exec_${scriptId}`,
			scriptId,
			status: "ready"
		};
	},
	
	// Cancel script execution
	cancelExecution(scriptId: string) {
		const execution = scriptManagerState.executions[scriptId];
		if (!execution || execution.status !== "running") {
			return;
		}
		
		// Cancel the execution
		scriptExecutor.cancelExecution();
		
		// Update state
		scriptManagerState.executions[scriptId] = {
			...execution,
			status: "error",
			error: "Execution cancelled by user",
			lastRun: new Date().toLocaleString()
		};
	},

	// Get data bridge instance for file operations
	getDataBridge() {
		return dataBridge;
	},

	// Get script executor instance
	getScriptExecutor() {
		return scriptExecutor;
	},
	
	// Get all scripts with their execution status
	getAllScriptsWithStatus: () => {
		return scriptManagerState.availableScripts.map(script => ({
			...script,
			execution: scriptManagerState.executions[script.id]
		}));
	}
};

// Utility functions
export const scriptUtils = {
	formatExecutionTime(ms: number): string {
		if (ms < 1000) return `${ms}ms`;
		const seconds = (ms / 1000).toFixed(2);
		return `${seconds}s`;
	},
	
	getScriptCategories(): string[] {
		const categories = new Set(scripts.map(s => s.category).filter((cat): cat is string => Boolean(cat)));
		return Array.from(categories);
	}
};