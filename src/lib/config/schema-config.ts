/**
 * @deprecated This static config file will be replaced by runtime config loading
 * TODO: Move to external config packages loaded via src/core/config-runtime/loader.ts
 * 
 * Schema validation configuration and management
 */
export interface SchemaColumnExpectation {
	/** Expected data type for the column */
	type: 'int64' | 'float64' | 'string' | 'datetime' | 'boolean';
	/** Whether this column is required to exist */
	required: boolean;
	/** Minimum value for numeric columns */
	min_value?: number;
	/** Maximum value for numeric columns */
	max_value?: number;
	/** Allowed categorical values for string columns */
	allowed_values?: string[];
	/** Maximum number of unique categorical values */
	max_categories?: number;
	/** Whether null/NA values are allowed */
	null_allowed?: boolean;
	/** Human-readable description of this column */
	description?: string;
}

export interface SchemaExpectation {
	/** Column-specific expectations */
	columns: {
		[columnName: string]: SchemaColumnExpectation;
	};
	/** Expected row count constraints */
	expected_row_count?: {
		min?: number;
		max?: number;
	};
	/** Human-readable description of the overall schema */
	description: string;
}

export interface SchemaValidationCheck {
	/** Type of check performed */
	check: 'data_type' | 'min_value' | 'max_value' | 'allowed_values' | 'null_values' | 'row_count' | 'column_exists';
	/** Status of this specific check */
	status: 'pass' | 'fail' | 'warning';
	/** Human-readable message about the check result */
	message?: string;
	/** Expected value for comparison checks */
	expected?: unknown;
	/** Actual value found */
	actual?: unknown;
	/** List of violations for categorical/list checks */
	violations?: string[];
}

export interface SchemaColumnValidation {
	/** Name of the column being validated */
	column_name: string;
	/** Expected data type */
	expected_type?: string;
	/** Actual data type found */
	actual_type?: string;
	/** Overall status for this column */
	status: 'pass' | 'fail' | 'warning';
	/** Detailed check results */
	checks: SchemaValidationCheck[];
}

export interface SchemaValidationResult {
	/** Overall validation status */
	overall_status: 'pass' | 'fail' | 'warning';
	/** Per-column validation results */
	column_validations: SchemaColumnValidation[];
	/** Summary statistics */
	summary: {
		total_checks: number;
		passed: number;
		failed: number;
		warnings: number;
	};
	/** Timestamp of validation */
	validation_timestamp?: string;
	/** Additional metadata */
	metadata?: {
		total_rows?: number;
		total_columns?: number;
		file_size?: number;
		[key: string]: unknown;
	};
}

export interface SchemaDependency {
	/** Source type - uploaded file requirement */
	type: 'uploaded';
	/** ID of the file requirement */
	sourceId: string;
}

export interface SchemaValidation {
	id: string;
	title: string;
	description: string;
	filename: string;
	/** Schema expectations metadata */
	expectations: SchemaExpectation;
	/** Python validation script content */
	content: string;
	category?: string;
	/** Files that should be validated */
	dependencies?: SchemaDependency[];
}

export interface SchemaValidationExecution {
	id: string;
	schemaId: string;
	status: "ready" | "running" | "completed" | "error";
	executionTime?: string;
	lastRun?: string;
	/** Raw JSON output from Python validation script */
	output?: string;
	/** Parsed validation results */
	results?: SchemaValidationResult;
	/** Error message if validation failed */
	error?: string;
	metrics?: {
		outputLines?: number;
		errorCount?: number;
		memoryUsage?: string;
		[key: string]: unknown;
	};
}

// Import all individual schema validations
import { randomDataSchema } from './schema/random-data-schema';
import { sampleDataSchema } from './schema/sample-data-schema';

// Schema validations for the application
export const schemaValidations: SchemaValidation[] = [
	randomDataSchema,
	sampleDataSchema
];