/**
 * ScriptExecutor - Simplified version using standard Pyodide approach
 * Each script execution runs in a fresh web worker for memory isolation
 */

import {
	SimplePyodideExecutor,
	type ScriptResult,
	type ScriptOptions,
	type Script as SimpleScript
} from './simple-pyodide.js';
import type { Script } from '../config/script-config.js';
import { fileRequirements } from '../config/file-config.js';

// Re-export the simple interfaces
export type ScriptExecutionResult = ScriptResult;

export interface ScriptExecutionOptions {
	timeout?: number; // in milliseconds
	dataFiles?: Array<{ file: File; requirementId: string }>; // uploaded files with requirement mapping
	variables?: Record<string, any>; // variables to inject into Python scope (not implemented yet)
	onStatusUpdate?: (status: string) => void; // callback for status updates
	onStdout?: (output: string) => void; // callback for stdout
	onStderr?: (output: string) => void; // callback for stderr
}

export class ScriptExecutor {
	private executor: SimplePyodideExecutor;

	constructor() {
		this.executor = new SimplePyodideExecutor();
	}

	public async executeScript(
		script: Script,
		options: ScriptExecutionOptions = {}
	): Promise<ScriptExecutionResult> {
		// Convert to simple script format
		const simpleScript: SimpleScript = {
			id: script.id,
			content: script.content,
			title: script.title
		};

		// Convert dataFiles to simple format
		const dataFiles = options.dataFiles?.map(fileData => {
			const requirement = fileRequirements.find(req => req.id === fileData.requirementId);
			const filename = requirement?.defaultFilename || fileData.file.name;
			return {
				file: fileData.file,
				filename
			};
		}) || [];

		// Convert to simple options format
		const simpleOptions: ScriptOptions = {
			dataFiles,
			timeout: options.timeout,
			onStatusUpdate: options.onStatusUpdate,
			onStdout: options.onStdout,
			onStderr: options.onStderr
		};

		return this.executor.executeScript(simpleScript, simpleOptions);
	}

	public cancelExecution(executionId?: string): void {
		this.executor.cancelExecution(executionId);
	}

	public isCurrentlyExecuting(): boolean {
		// Not implemented in simple executor yet
		return false;
	}

	public getActiveExecutionsCount(): number {
		// Not implemented in simple executor yet
		return 0;
	}

	public dispose(): void {
		this.executor.dispose();
	}

}
