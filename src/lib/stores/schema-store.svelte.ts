import { PyodideManager } from '../pyodide/pyodide-manager.js';
import { DataBridge } from '../pyodide/data-bridge.js';
import { fileManagerState } from './file-store.svelte.js';
import { 
	schemaValidations, 
	type SchemaValidation, 
	type SchemaValidationExecution,
	type SchemaValidationResult 
} from '../config/schema-config.js';

interface SchemaManagerState {
	availableSchemas: SchemaValidation[];
	executions: Record<string, SchemaValidationExecution>;
	selectedSchemaId: string | null;
}

export const schemaManagerState = $state<SchemaManagerState>({
	availableSchemas: schemaValidations,
	executions: {},
	selectedSchemaId: null
});

// Create DataBridge instance for file handling
const dataBridge = new DataBridge();

export const schemaSelectors = {
	getSchema: (schemaId: string): SchemaValidation | undefined => {
		return schemaManagerState.availableSchemas.find(s => s.id === schemaId);
	},

	getExecution: (schemaId: string): SchemaValidationExecution | undefined => {
		return schemaManagerState.executions[schemaId];
	},

	getExecutionStatus: (schemaId: string): "ready" | "running" | "completed" | "error" => {
		return schemaManagerState.executions[schemaId]?.status ?? "ready";
	},

	getValidationResults: (schemaId: string): SchemaValidationResult | undefined => {
		return schemaManagerState.executions[schemaId]?.results;
	},

	isSchemaSelected: (schemaId: string): boolean => {
		return schemaManagerState.selectedSchemaId === schemaId;
	},

	// Computed selectors that don't need parameters should be accessed directly via state
	// Components should use: Object.values(schemaManagerState.executions) instead of getAllExecutions()
	// Components should use: schemaManagerState.availableSchemas instead of getAllSchemas()
};

export const schemaActions = {
	selectSchema: (schemaId: string | null) => {
		schemaManagerState.selectedSchemaId = schemaId;
	},

	initializeExecution: (schemaId: string) => {
		if (!schemaManagerState.executions[schemaId]) {
			schemaManagerState.executions[schemaId] = {
				id: `${schemaId}-${Date.now()}`,
				schemaId,
				status: "ready"
			};
		}
	},

	startExecution: async (schemaId: string): Promise<void> => {
		const schema = schemaSelectors.getSchema(schemaId);
		if (!schema) {
			throw new Error(`Schema with ID ${schemaId} not found`);
		}

		// Initialize execution if it doesn't exist
		schemaActions.initializeExecution(schemaId);

		// Update status to running
		const execution = schemaManagerState.executions[schemaId];
		execution.status = "running";
		execution.output = "";
		execution.error = "";
		execution.results = undefined;

		const startTime = Date.now();

		try {
			console.log(`Starting schema validation: ${schema.title}`);

			// Get PyodideManager instance
			const pyodideManager = PyodideManager.getInstance();

			// Sync files from file store to DataBridge/Pyodide
			await dataBridge.syncFromFileStore();

			// Check schema dependencies
			if (schema.dependencies) {
				for (const dep of schema.dependencies) {
					if (dep.type === 'uploaded') {
						const file = fileManagerState.files[dep.sourceId];
						if (!file?.file) {
							throw new Error(`Required file ${dep.sourceId} not found or not uploaded`);
						}
						console.log(`File ${file.filename} is available for schema validation`);
					}
				}
			}

			// Clear output buffers and execute the schema validation script
			pyodideManager.clearBuffers();
			
			// Add output handler
			const outputHandler = {
				onStdout: (output: string) => {
					execution.output = (execution.output || "") + output;
				}
			};
			pyodideManager.addOutputHandler(outputHandler);

			try {
				await pyodideManager.runPython(schema.content);
			} finally {
				pyodideManager.removeOutputHandler(outputHandler);
			}

			const endTime = Date.now();
			const executionTime = ((endTime - startTime) / 1000).toFixed(2) + "s";

			// Try to parse validation results from JSON file
			let validationResults: SchemaValidationResult | undefined;
			
			// Try multiple possible file names for validation results
			const possibleFiles = [
				`/data/${schema.id.replace('-', '_')}_validation_results.json`,
				'/data/random_data_schema_validation_results.json',
				'/data/sample_data_schema_validation_results.json'
			];
			
			for (const filePath of possibleFiles) {
				try {
					const jsonContent = await pyodideManager.readFile(filePath);
					const jsonString = new TextDecoder().decode(jsonContent);
					validationResults = JSON.parse(jsonString);
					console.log(`Parsed validation results from: ${filePath}`, validationResults);
					break; // Exit loop if successful
				} catch (error) {
					console.debug(`Failed to read validation results from ${filePath}:`, error);
				}
			}
			
			if (!validationResults) {
				console.warn('No validation results file found');
			}

			// Update execution with results
			execution.status = "completed";
			execution.executionTime = executionTime;
			execution.lastRun = new Date().toLocaleString();
			execution.results = validationResults;
			execution.metrics = {
				outputLines: (execution.output?.split('\n').length || 0),
				errorCount: 0,
				memoryUsage: "N/A"
			};

			console.log(`Schema validation completed in ${executionTime}`);

		} catch (error) {
			const endTime = Date.now();
			const executionTime = ((endTime - startTime) / 1000).toFixed(2) + "s";

			execution.status = "error";
			execution.executionTime = executionTime;
			execution.lastRun = new Date().toLocaleString();
			execution.error = error instanceof Error ? error.message : String(error);
			execution.metrics = {
				outputLines: (execution.output?.split('\n').length || 0),
				errorCount: 1,
				memoryUsage: "N/A"
			};

			console.error(`Schema validation failed:`, error);
			throw error;
		}
	},

	clearExecution: (schemaId: string) => {
		delete schemaManagerState.executions[schemaId];
	},

	clearAllExecutions: () => {
		schemaManagerState.executions = {};
	}
};