// Script configuration and management
export interface ScriptDependency {
	/** Source type - either an uploaded file requirement or a result file */
	type: 'uploaded' | 'result';
	/** ID of the file requirement or result ID */
	sourceId: string;
}

export interface Script {
	id: string;
	title: string;
	description: string;
	filename: string;
	content: string;
	category?: string;
	/** Files that should be copied into pyodide filesystem before execution */
	dependencies?: ScriptDependency[];
}

export interface ScriptExecution {
	id: string;
	scriptId: string;
	status: "ready" | "running" | "completed" | "error";
	executionTime?: string;
	lastRun?: string;
	output?: string;
	error?: string;
	metrics?: {
		outputLines?: number;
		errorCount?: number;
		memoryUsage?: string;
		[key: string]: any;
	};
}

// Import all individual scripts
import { dataSummaryScript } from './scripts/data-summary';
import { dataVisualizationScript } from './scripts/data-visualization';
import { dataCleaningScript } from './scripts/data-cleaning';
import { advancedAnalysisScript } from './scripts/advanced-analysis';
import { linearRegressionScript } from './scripts/linear-regression';
import { geopandasTestScript } from './scripts/geopandas-test';
import { errorTestScript } from './scripts/error-test';

// Sample Python scripts for the application
export const scripts: Script[] = [
	dataSummaryScript,
	dataVisualizationScript,
	dataCleaningScript,
	advancedAnalysisScript,
	linearRegressionScript,
	geopandasTestScript,
	errorTestScript
];