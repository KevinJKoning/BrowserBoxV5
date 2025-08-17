/**
 * Schema validation configuration using two-path approach:
 * 1. JavaScript validation for simple files (CSV, JSON, basic Parquet)
 * 2. Python validation for complex files (GeoPackage, advanced business logic)
 */

// JavaScript validation interfaces
export interface JavaScriptValidationRules {
  /** Column names that must be present in the data */
  requiredColumns?: string[];
  /** Expected data types for columns */
  columnTypes?: Record<string, 'string' | 'number' | 'boolean' | 'date'>;
  /** Validation constraints for specific columns */
  constraints?: Record<string, {
    min?: number;
    max?: number;
    pattern?: string;
    allowedValues?: (string | number)[];
    notNull?: boolean;
  }>;
  /** Row count constraints */
  rowCount?: {
    min?: number;
    max?: number;
  };
}

export interface JavaScriptValidation {
  id: string;
  title: string;
  description: string;
  validationType: 'javascript';
  targetFileId: string;
  category?: string;
  tags?: string[];
  validationRules: JavaScriptValidationRules;
}

// Python validation interfaces
export interface PythonValidation {
  id: string;
  title: string;
  description: string;
  validationType: 'python';
  targetFileId: string;
  category?: string;
  tags?: string[];
  /** Python validation script filename */
  filename: string;
  /** Expected HTML report filename */
  outputHtml: string;
}

// Union type for all schema validations
export type SchemaValidation = JavaScriptValidation | PythonValidation;

// JavaScript validation result interfaces
export interface JavaScriptValidationError {
  column?: string;
  row?: number;
  message: string;
  value?: unknown;
  constraint?: string;
}

export interface JavaScriptValidationResult {
  success: boolean;
  errors: JavaScriptValidationError[];
  warnings: JavaScriptValidationError[];
  summary: {
    totalRows: number;
    totalColumns: number;
    validRows: number;
    errorCount: number;
    warningCount: number;
  };
  timestamp: string;
}

// Execution tracking interfaces
export interface SchemaValidationExecution {
  id: string;
  schemaId: string;
  status: 'ready' | 'running' | 'completed' | 'error';
  executionTime?: string;
  lastRun?: string;
  error?: string;
  // For JavaScript validations
  jsResult?: JavaScriptValidationResult;
  // For Python validations - just track that HTML was generated
  htmlGenerated?: boolean;
  htmlPath?: string;
}

// Static schema validations (will be replaced by runtime loading)
export const schemaValidations: SchemaValidation[] = [
  // Example JavaScript validation
  {
    id: 'sample-data-js-validation',
    title: 'Sample Data Basic Validation',
    description: 'Basic JavaScript validation for sample CSV data structure and content',
    validationType: 'javascript',
    targetFileId: 'identity',
    category: 'validation',
    tags: ['sample', 'csv', 'basic'],
    validationRules: {
      requiredColumns: ['id', 'name'],
      columnTypes: {
        id: 'number',
        name: 'string'
      },
      constraints: {
        id: {
          min: 1,
          notNull: true
        },
        name: {
          notNull: true,
          pattern: '^[A-Za-z\\s]+$'
        }
      },
      rowCount: {
        min: 1,
        max: 100000
      }
    }
  },
  // Example Python validation  
  {
    id: 'random-data-python-validation',
    title: 'Random Data Advanced Validation',
    description: 'Advanced Python validation for random data with statistical analysis',
    validationType: 'python',
    targetFileId: 'random_data',
    category: 'quality',
    tags: ['random', 'parquet', 'advanced'],
    filename: 'random_data_validation.py',
    outputHtml: 'random_data_report.html'
  }
];