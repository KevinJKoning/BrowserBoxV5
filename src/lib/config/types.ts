/**
 * Configuration types for the BrowserBox application
 * These types are used across the application for configuration management
 */

// File requirement interfaces
export interface FileRequirement {
  id: string;
  title: string;
  description: string;
  defaultFilename: string;
  required: boolean;
  acceptedTypes?: string[];
  maxSize?: number; // in MB
}

export interface UploadedFile {
  id: string;
  filename: string;
  originalName: string;
  size: string;
  uploadedAt: string;
  status: "waiting" | "uploading" | "completed" | "error";
  file?: File; // Store the actual File object for preview
  wasRenamed?: boolean; // Flag to show if file was renamed to match expected name
}

// Script configuration interfaces
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
    [key: string]: unknown;
  };
}

// Schema validation interfaces
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
  /** Python script content (loaded dynamically) */
  content?: string;
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