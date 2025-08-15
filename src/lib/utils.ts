import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

// Dependency checking interfaces and utilities
import { scripts } from "./config/script-config.js";
import { schemaValidations } from "./config/schema-config.js";
import { fileRequirements } from "./config/file-config.js";
import { fileManagerState, fileSelectors } from "./stores/file-store.svelte.js";
import { resultsManagerState, resultsSelectors } from "./stores/results-store.svelte.js";

// Import icons for shared status configurations
import CheckCircleIcon from "@lucide/svelte/icons/check-circle";
import CodeIcon from "@lucide/svelte/icons/code";
import PlayIcon from "@lucide/svelte/icons/play";
import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";
import XCircleIcon from "@lucide/svelte/icons/x-circle";
import AlertTriangleIcon from "@lucide/svelte/icons/alert-triangle";
import ClockIcon from "@lucide/svelte/icons/clock";

// Interface for dependency information
export interface DependencyInfo {
	id: string;
	type: 'uploaded' | 'result';
	filename: string;
	title: string;
	description?: string;
	isAvailable: boolean;
}

// Interface for dependency status
export interface DependencyStatus {
	allMet: boolean;
	dependencies: DependencyInfo[];
}

// Check script dependencies (uploaded files and result files)
export function checkScriptDependencies(scriptId: string): DependencyStatus {
	const script = scripts.find(s => s.id === scriptId);
	if (!script || !script.dependencies) {
		return { allMet: true, dependencies: [] };
	}

	const dependencies: DependencyInfo[] = [];
	let allMet = true;

	for (const dependency of script.dependencies) {
		if (dependency.type === 'uploaded') {
			const fileReq = fileRequirements.find(req => req.id === dependency.sourceId);
			const uploadedFile = fileSelectors.getFile(dependency.sourceId);
			const isAvailable = !!uploadedFile;
			
			if (!isAvailable) allMet = false;
			
			dependencies.push({
				id: dependency.sourceId,
				type: 'uploaded',
				filename: fileReq?.defaultFilename || 'Unknown file',
				title: fileReq?.title || 'Unknown file',
				description: fileReq?.description,
				isAvailable
			});
		} else if (dependency.type === 'result') {
			const resultFiles = resultsSelectors.getResultsByScript(dependency.sourceId);
			const resultFile = resultFiles.length > 0 ? resultFiles[0] : null;
			const isAvailable = !!resultFile;
			
			if (!isAvailable) allMet = false;
			
			const sourceScript = scripts.find(s => s.id === dependency.sourceId);
			
			// Get the expected result filename - use actual result file if available, otherwise use known mappings
			let resultFilename = 'result.txt';
			let resultTitle = 'Script Result';
			
			if (resultFile) {
				resultFilename = resultFile.filename;
				resultTitle = resultFile.filename;
			} else {
				// Known result file mappings for scripts
				const knownResultFiles: Record<string, string> = {
					'data-summary': 'random_data_summary_report.parquet',
					'data-visualization': 'visualization_charts.png',
					'data-cleaning': 'cleaned_data.parquet',
					'advanced-analysis': 'advanced_analysis_report.parquet',
					'linear-regression': 'linear_regression_results.parquet',
					'geopandas-test': 'geopandas_output.parquet'
				};
				
				resultFilename = knownResultFiles[dependency.sourceId] || `${dependency.sourceId}_output.txt`;
				resultTitle = resultFilename;
			}
			
			dependencies.push({
				id: dependency.sourceId,
				type: 'result',
				filename: resultFilename,
				title: resultTitle,
				description: `Generated output from ${sourceScript?.title || 'script'}`,
				isAvailable
			});
		}
	}

	return { allMet, dependencies };
}

// Check schema dependencies (target files for validation)
export function checkSchemaDependencies(schemaId: string): DependencyStatus {
	const schemaValidation = schemaValidations.find(s => s.id === schemaId);
	if (!schemaValidation || !schemaValidation.dependencies) {
		return { allMet: true, dependencies: [] };
	}

	const dependencies: DependencyInfo[] = [];
	let allMet = true;

	for (const dependency of schemaValidation.dependencies) {
		if (dependency.type === 'uploaded') {
			const fileReq = fileRequirements.find(req => req.id === dependency.sourceId);
			const uploadedFile = fileSelectors.getFile(dependency.sourceId);
			const isAvailable = !!uploadedFile;
			
			if (!isAvailable) allMet = false;
			
			dependencies.push({
				id: dependency.sourceId,
				type: 'uploaded',
				filename: fileReq?.defaultFilename || 'Unknown file',
				title: fileReq?.title || 'Unknown file',
				description: fileReq?.description,
				isAvailable
			});
		} else if (dependency.type === 'result') {
			const resultFiles = resultsSelectors.getResultsByScript(dependency.sourceId);
			const resultFile = resultFiles.length > 0 ? resultFiles[0] : null;
			const isAvailable = !!resultFile;
			
			if (!isAvailable) allMet = false;
			
			const sourceScript = scripts.find(s => s.id === dependency.sourceId);
			dependencies.push({
				id: dependency.sourceId,
				type: 'result',
				filename: sourceScript?.filename || 'result.txt',
				title: sourceScript?.title || 'Script Result',
				description: `Generated output from ${sourceScript?.title || 'script'}`,
				isAvailable
			});
		}
	}

	return { allMet, dependencies };
}

// Get effective status for script cards (considers prerequisites)
export function getScriptCardStatus(scriptId: string, executionStatus: "ready" | "running" | "completed" | "error"): "waiting" | "ready" | "running" | "completed" | "error" {
	// If script is running, completed, or has error, use execution status
	if (executionStatus === "running" || executionStatus === "completed" || executionStatus === "error") {
		return executionStatus;
	}

	// For "ready" status, check if prerequisites are met
	const dependencyStatus = checkScriptDependencies(scriptId);
	if (!dependencyStatus.allMet) {
		return "waiting";
	}

	return "ready";
}

// Get effective status for schema cards (considers target file availability)
export function getSchemaCardStatus(schemaId: string, executionStatus: "ready" | "running" | "completed" | "error"): "waiting" | "ready" | "running" | "completed" | "error" {
	// If schema is running, completed, or has error, use execution status
	if (executionStatus === "running" || executionStatus === "completed" || executionStatus === "error") {
		return executionStatus;
	}

	// For "ready" status, check if target file is available
	const dependencyStatus = checkSchemaDependencies(schemaId);
	if (!dependencyStatus.allMet) {
		return "waiting";
	}

	return "ready";
}

// Shared status configurations for cards
export const scriptStatusConfig = {
	waiting: {
		badge: { variant: "outline" as const, text: "Waiting" },
		icon: ClockIcon,
		iconClass: "text-muted-foreground",
		cardClass: "border-dashed border-muted-foreground/50",
	},
	ready: {
		badge: { variant: "outline" as const, text: "Ready" },
		icon: CodeIcon,
		iconClass: "text-green-600",
		cardClass: "border-dashed border-green-300/50",
	},
	running: {
		badge: { variant: "secondary" as const, text: "Running..." },
		icon: PlayIcon,
		iconClass: "text-blue-500 animate-pulse",
		cardClass: "border-blue-200 bg-blue-50/50",
	},
	completed: {
		badge: { variant: "default" as const, text: "Completed" },
		icon: CheckCircleIcon,
		iconClass: "text-green-500",
		cardClass: "border-green-200 bg-green-50/50",
	},
	error: {
		badge: { variant: "destructive" as const, text: "Error" },
		icon: XCircleIcon,
		iconClass: "text-red-500",
		cardClass: "border-red-200 bg-red-50/50",
	},
};

export const schemaStatusConfig = {
	waiting: {
		badge: { variant: "outline" as const, text: "Waiting" },
		icon: ClockIcon,
		iconClass: "text-muted-foreground",
		cardClass: "border-dashed border-muted-foreground/50",
	},
	ready: {
		badge: { variant: "outline" as const, text: "Ready" },
		icon: ShieldCheckIcon,
		iconClass: "text-green-600",
		cardClass: "border-dashed border-green-300/50",
	},
	running: {
		badge: { variant: "secondary" as const, text: "Validating..." },
		icon: PlayIcon,
		iconClass: "text-blue-500 animate-pulse",
		cardClass: "border-blue-200 bg-blue-50/50",
	},
	completed: {
		badge: { variant: "default" as const, text: "Completed" },
		icon: CheckCircleIcon, // This will be overridden dynamically based on validation results
		iconClass: "text-green-500", // This will be overridden dynamically based on validation results
		cardClass: "border-green-200 bg-green-50/50", // This will be overridden dynamically based on validation results
	},
	error: {
		badge: { variant: "destructive" as const, text: "Error" },
		icon: XCircleIcon,
		iconClass: "text-red-500",
		cardClass: "border-red-200 bg-red-50/50",
	},
};

// Simple status configurations for preview components (badge only)
export const previewStatusConfig = {
	ready: { variant: "outline" as const, text: "Ready" },
	running: { variant: "secondary" as const, text: "Running..." },
	completed: { variant: "default" as const, text: "Completed" },
	error: { variant: "destructive" as const, text: "Error" }
};

// Common utility functions

/**
 * Format file size in human readable format
 */
export function formatFileSize(bytes: number): string {
	const sizes = ['Bytes', 'KB', 'MB', 'GB'];
	if (bytes === 0) return '0 Bytes';
	const i = Math.floor(Math.log(bytes) / Math.log(1024));
	return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

/**
 * Copy text to clipboard with error handling
 */
export async function copyToClipboard(text: string): Promise<void> {
	try {
		await navigator.clipboard.writeText(text);
	} catch (err) {
		console.error('Failed to copy text: ', err);
	}
}

/**
 * Extract file extension from filename (including the dot, lowercased)
 */
export function getFileExtension(filename: string): string {
	const lastDot = filename.lastIndexOf('.');
	return lastDot > 0 ? filename.substring(lastDot).toLowerCase() : '';
}

// Validation status helpers
export type ValidationStatus = "pass" | "fail" | "warning";

/**
 * Get icon component for validation status
 */
export function getValidationStatusIcon(status: ValidationStatus) {
	switch (status) {
		case "pass": return CheckCircleIcon;
		case "fail": return XCircleIcon;
		case "warning": return AlertTriangleIcon;
	}
}

/**
 * Get CSS class for validation status
 */
export function getValidationStatusClass(status: ValidationStatus): string {
	switch (status) {
		case "pass": return "text-green-500";
		case "fail": return "text-red-500";
		case "warning": return "text-yellow-500";
	}
}

// Pyodide utilities
import type { PyodideInitializationStatus } from "./pyodide/pyodide-manager.js";

/**
 * Get initialization message for Pyodide status
 */
export function getPyodideInitializationMessage(status: PyodideInitializationStatus): string {
	switch (status) {
		case 'not-initialized':
			return 'Pyodide not initialized';
		case 'initializing':
			return 'Loading Python runtime...';
		case 'loading-packages':
			return 'Installing Python packages (numpy, pandas, fastparquet)...';
		case 'ready':
			return 'Python runtime ready';
		case 'error':
			return 'Python runtime failed to initialize';
	}
}
