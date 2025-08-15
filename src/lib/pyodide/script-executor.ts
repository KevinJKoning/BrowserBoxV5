/**
 * ScriptExecutor - Handles execution of Python scripts using isolated web workers
 * Each script execution runs in a fresh Pyodide instance for memory isolation
 */

import {
	createPyodideWorker,
	type WorkerMessage,
	type ScriptExecutionRequest,
	type ScriptExecutionResult as WorkerResult
} from './pyodide-worker.js';
import { PyodideManager } from './pyodide-manager.js';
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
	private pyodideManager: PyodideManager;
	private useMainThread: boolean = true; // Use main thread approach for now

	constructor() {
		// Initialize PyodideManager for main thread execution
		this.pyodideManager = PyodideManager.getInstance();
	}

	public async executeScript(
		script: Script,
		options: ScriptExecutionOptions = {}
	): Promise<ScriptExecutionResult> {
		const startTime = Date.now();
		const executionId = `exec_${++this.executionCounter}_${Date.now()}`;

		// Use main thread approach for now to avoid worker baseUrl issues
		if (this.useMainThread) {
			return this.executeScriptMainThread(script, options, startTime);
		}

		// Prepare files for worker using defaultFilenames from file requirements
		const files: Array<{
			name: string;
			originalName: string;
			requirementId: string;
			data: ArrayBuffer;
		}> = [];
		if (options.dataFiles) {
			for (const fileData of options.dataFiles) {
				// Always use the defaultFilename from file requirements
				const requirement = fileRequirements.find((req) => req.id === fileData.requirementId);
				const targetFileName = requirement?.defaultFilename || fileData.file.name;

				files.push({
					name: targetFileName,
					originalName: fileData.file.name,
					requirementId: fileData.requirementId,
					data: await fileData.file.arrayBuffer()
				});
			}
		}

		// No embedded assets in PWA mode - use standard file serving
		const embeddedAssets = undefined;

		// Get base URL for development mode - use import.meta.env for Vite compatibility
		const baseUrl = import.meta.env.DEV
			? `${window.location.protocol}//${window.location.hostname}:${window.location.port}`
			: window.location.origin;

		console.log('Main thread baseUrl:', baseUrl);
		console.log('Location details:', {
			origin: window.location.origin,
			protocol: window.location.protocol,
			hostname: window.location.hostname,
			port: window.location.port,
			host: window.location.host
		});

		return new Promise((resolve) => {
			// Create a fresh worker for this execution
			const worker = createPyodideWorker();
			this.activeWorkers.set(executionId, worker);

			let stdout = '';
			let stderr = '';

			// Set up timeout if specified
			const timeoutId = options.timeout
				? setTimeout(() => {
						worker.terminate();
						this.activeWorkers.delete(executionId);

						const executionTime = Date.now() - startTime;
						resolve({
							success: false,
							output: stdout,
							error: `Script execution timed out after ${options.timeout}ms`,
							executionTime
						});
					}, options.timeout)
				: null;

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
							output: data.stdout || stdout, // Use captured stdout from worker if available
							error: data.error || 'Unknown error',
							executionTime: errorExecutionTime,
							modifiedFiles: data.modifiedFiles || [] // Include any files that were created before error
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
			if (typeof script.content !== 'string' || script.content.length === 0) {
				console.error('Script content is empty or invalid for script id:', script.id);
				if (timeoutId) clearTimeout(timeoutId);
				worker.terminate();
				this.activeWorkers.delete(executionId);
				const executionTime = Date.now() - startTime;
				resolve({
					success: false,
					output: stdout,
					error: 'Script content is empty',
					executionTime
				});
				return;
			}
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

	private async executeScriptMainThread(
		script: Script,
		options: ScriptExecutionOptions,
		startTime: number
	): Promise<ScriptExecutionResult> {
		try {
			// Setup status callback
			const updateStatus = options.onStatusUpdate || (() => {});

			updateStatus('Initializing Python environment...');

			// Get Pyodide instance (will initialize if needed)
			const pyodide = await this.pyodideManager.getPyodide();

			updateStatus('Loading data files...');

			// Handle file uploads
			if (options.dataFiles && options.dataFiles.length > 0) {
				await this.pyodideManager.createDataDirectory();

				for (const { file, requirementId } of options.dataFiles) {
					const requirement = fileRequirements.find((req) => req.id === requirementId);
					const filename = requirement?.defaultFilename || file.name;

					const arrayBuffer = await file.arrayBuffer();
					const data = new Uint8Array(arrayBuffer);

					await this.pyodideManager.writeFile(`/data/${filename}`, data);

					console.log(`File loaded: ${file.name} -> ${filename}`);
				}
			}

			updateStatus('Executing Python script...');

			// Clear output buffers
			this.pyodideManager.clearBuffers();

			// Execute the script
			// Use the Script.content field (script.python does not exist on Script interface)
			const pythonSource = script.content ?? '';
			if (typeof pythonSource !== 'string' || pythonSource.length === 0) {
				throw new Error('Script content is empty or not a string');
			}
			const result = await this.pyodideManager.runPython(pythonSource);

			// Get output
			const stdout = this.pyodideManager.getStdoutBuffer();
			const stderr = this.pyodideManager.getStderrBuffer();

			const executionTime = Date.now() - startTime;

			updateStatus('Execution completed');

			// Call output callbacks if provided
			if (options.onStdout && stdout) {
				options.onStdout(stdout);
			}
			if (options.onStderr && stderr) {
				options.onStderr(stderr);
			}

			return {
				success: !stderr,
				output: stdout || '',
				error: stderr || undefined,
				executionTime,
				modifiedFiles: [] // TODO: implement file collection if needed
			};
		} catch (error) {
			const executionTime = Date.now() - startTime;
			const errorMessage = error instanceof Error ? error.message : String(error);

			return {
				success: false,
				output: '',
				error: errorMessage,
				executionTime
			};
		}
	}
}
