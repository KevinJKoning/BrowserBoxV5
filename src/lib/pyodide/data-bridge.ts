/**
 * DataBridge - Manages data flow between browser File objects and Pyodide filesystem
 * Handles file uploads, conversions, and data access for Python scripts
 */

import { PyodideManager } from './pyodide-manager.js';
import { fileManagerState } from '../stores/file-store.svelte.js';

export interface DataFile {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  type: string;
  pythonPath: string; // Path in Pyodide filesystem
  uploadedAt: Date;
  file: File;
}

export interface DataSummary {
  totalFiles: number;
  totalSize: number;
  availableFiles: DataFile[];
  pythonPaths: Record<string, string>; // filename -> python path mapping
}

export class DataBridge {
  private pyodideManager: PyodideManager;
  private uploadedFiles: Map<string, DataFile> = new Map();

  constructor() {
    this.pyodideManager = PyodideManager.getInstance();
  }

  /**
   * Upload a file to Pyodide filesystem for Python access with custom name
   */
  public async uploadFileWithCustomName(fileId: string, file: File, customFilename: string): Promise<DataFile> {
    try {
      // Ensure Pyodide is ready
      await this.pyodideManager.getPyodide();
      
      // Create data directory if it doesn't exist
      await this.pyodideManager.createDataDirectory();

      // Use the custom filename provided by the file store
      const pythonFilename = this.sanitizeFilename(customFilename);
      const pythonPath = `/data/${pythonFilename}`;

      // Convert File to ArrayBuffer then Uint8Array
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      // Write file to Pyodide filesystem
      await this.pyodideManager.writeFile(pythonPath, data);

      // Create DataFile record
      const dataFile: DataFile = {
        id: fileId,
        filename: pythonFilename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        pythonPath,
        uploadedAt: new Date(),
        file
      };

      // Store in our registry
      this.uploadedFiles.set(fileId, dataFile);

      // Make the file path available in Python as a variable
      const variableName = this.createVariableName(pythonFilename);
      await this.pyodideManager.runPython(`${variableName} = "${pythonPath}"`);

      console.log(`File uploaded to Pyodide: ${file.name} -> ${pythonPath} (as ${customFilename})`);
      return dataFile;

    } catch (error) {
      console.error(`Failed to upload file ${file.name}:`, error);
      throw error;
    }
  }

  /**
   * Upload a file to Pyodide filesystem for Python access
   */
  public async uploadFile(fileId: string, file: File): Promise<DataFile> {
    try {
      // Ensure Pyodide is ready
      await this.pyodideManager.getPyodide();
      
      // Create data directory if it doesn't exist
      await this.pyodideManager.createDataDirectory();

      // Generate Python-safe filename
      const pythonFilename = this.sanitizeFilename(file.name);
      const pythonPath = `/data/${pythonFilename}`;

      // Convert File to ArrayBuffer then Uint8Array
      const arrayBuffer = await file.arrayBuffer();
      const data = new Uint8Array(arrayBuffer);

      // Write file to Pyodide filesystem
      await this.pyodideManager.writeFile(pythonPath, data);

      // Create DataFile record
      const dataFile: DataFile = {
        id: fileId,
        filename: pythonFilename,
        originalName: file.name,
        size: file.size,
        type: file.type,
        pythonPath,
        uploadedAt: new Date(),
        file
      };

      // Store in our registry
      this.uploadedFiles.set(fileId, dataFile);

      // Make the file path available in Python as a variable
      const variableName = this.createVariableName(pythonFilename);
      await this.pyodideManager.runPython(`${variableName} = "${pythonPath}"`);

      console.log(`File uploaded to Pyodide: ${file.name} -> ${pythonPath}`);
      return dataFile;

    } catch (error) {
      console.error(`Failed to upload file ${file.name}:`, error);
      throw error;
    }
  }

  /**
   * Remove a file from Pyodide filesystem
   */
  public async removeFile(fileId: string): Promise<void> {
    const dataFile = this.uploadedFiles.get(fileId);
    if (!dataFile) {
      return;
    }

    try {
      // Remove from Pyodide filesystem
      await this.pyodideManager.runPython(`
import os
if os.path.exists("${dataFile.pythonPath}"):
    os.remove("${dataFile.pythonPath}")
      `);

      // Remove from our registry
      this.uploadedFiles.delete(fileId);

      console.log(`File removed from Pyodide: ${dataFile.pythonPath}`);
    } catch (error) {
      console.error(`Failed to remove file ${dataFile.originalName}:`, error);
    }
  }

  /**
   * Get data summary for Python scripts
   */
  public getDataSummary(): DataSummary {
    const files = Array.from(this.uploadedFiles.values());
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    
    const pythonPaths: Record<string, string> = {};
    files.forEach(file => {
      pythonPaths[file.filename] = file.pythonPath;
    });

    return {
      totalFiles: files.length,
      totalSize,
      availableFiles: files,
      pythonPaths
    };
  }

  /**
   * Sync uploaded files from file store to Pyodide
   */
  public async syncFromFileStore(): Promise<void> {
    try {
      const files = fileManagerState.files;
      console.log(`[DataBridge] Starting sync from file store. Found ${Object.keys(files).length} files in store.`);
      
      for (const [fileId, uploadedFile] of Object.entries(files)) {
        console.log(`[DataBridge] Checking file ${fileId}: ${uploadedFile.filename}, has file object: ${!!uploadedFile.file}, already synced: ${this.uploadedFiles.has(fileId)}`);
        
        if (uploadedFile.file && !this.uploadedFiles.has(fileId)) {
          console.log(`[DataBridge] Syncing new file: ${uploadedFile.filename} ${uploadedFile.wasRenamed ? '(renamed from ' + uploadedFile.originalName + ')' : ''}`);
          await this.uploadFileWithCustomName(fileId, uploadedFile.file, uploadedFile.filename);
        }
      }
      
      console.log(`[DataBridge] Sync complete. Total files in Pyodide: ${this.uploadedFiles.size}`);
      this.uploadedFiles.forEach((dataFile, id) => {
        console.log(`  - ${id}: ${dataFile.filename} -> ${dataFile.pythonPath}`);
      });
    } catch (error) {
      console.error('Failed to sync files from file store:', error);
    }
  }

  /**
   * Create Python code snippet to load available data files
   */
  public generateDataLoadingCode(): string {
    const files = Array.from(this.uploadedFiles.values());
    
    if (files.length === 0) {
      return `
# No data files available
print("No data files have been uploaded yet.")
available_files = []
`;
    }

    const loadingCode = files.map(file => {
      const varName = this.createVariableName(file.filename);
      if (file.type === 'application/octet-stream' || file.originalName.endsWith('.parquet')) {
        return `
# Load ${file.originalName}
try:
    import pandas as pd
    ${varName}_df = pd.read_parquet("${file.pythonPath}")
    print(f"Loaded {file.originalName}: {${varName}_df.shape} rows/columns")
except Exception as e:
    print(f"Failed to load ${file.originalName}: {e}")
    ${varName}_df = None
`;
      } else {
        return `
# File available at: ${file.pythonPath}
${varName}_path = "${file.pythonPath}"
print(f"File available: ${file.originalName} at {${varName}_path}")
`;
      }
    }).join('\n');

    return `
# Available data files
available_files = [
${files.map(f => `    "${f.originalName}"`).join(',\n')}
]

print(f"Available data files: {len(available_files)}")
${loadingCode}
`;
  }

  /**
   * Get file by ID
   */
  public getFile(fileId: string): DataFile | undefined {
    return this.uploadedFiles.get(fileId);
  }

  /**
   * Get all uploaded files
   */
  public getAllFiles(): DataFile[] {
    return Array.from(this.uploadedFiles.values());
  }

  /**
   * Check if a file exists in Pyodide filesystem
   */
  public async fileExists(pythonPath: string): Promise<boolean> {
    try {
      await this.pyodideManager.runPython(`
import os
file_exists = os.path.exists("${pythonPath}")
      `);
      return await this.pyodideManager.runPython('file_exists');
    } catch {
      return false;
    }
  }

  /**
   * Get file size from Pyodide filesystem
   */
  public async getFileSize(pythonPath: string): Promise<number> {
    try {
      return await this.pyodideManager.runPython(`
import os
os.path.getsize("${pythonPath}") if os.path.exists("${pythonPath}") else 0
      `);
    } catch {
      return 0;
    }
  }

  /**
   * Create Python-safe variable name from filename
   */
  private createVariableName(filename: string): string {
    return filename
      .replace(/[^a-zA-Z0-9_]/g, '_')
      .replace(/^[0-9]/, '_$&')
      .toLowerCase();
  }

  /**
   * Sanitize filename for filesystem
   */
  private sanitizeFilename(filename: string): string {
    return filename.replace(/[<>:"/\\|?*]/g, '_');
  }

  /**
   * Clear all uploaded files
   */
  public async clearAllFiles(): Promise<void> {
    const fileIds = Array.from(this.uploadedFiles.keys());
    
    for (const fileId of fileIds) {
      await this.removeFile(fileId);
    }
    
    this.uploadedFiles.clear();
  }

  /**
   * Get Python code to inspect a specific file
   */
  public generateFileInspectionCode(fileId: string): string {
    const file = this.uploadedFiles.get(fileId);
    if (!file) {
      return `print("File not found: ${fileId}")`;
    }

    if (file.type === 'application/octet-stream' || file.originalName.endsWith('.parquet')) {
      return `
# Inspect ${file.originalName}
import pandas as pd
import numpy as np

try:
    df = pd.read_parquet("${file.pythonPath}")
    
    print(f"File: ${file.originalName}")
    print(f"Shape: {df.shape}")
    print(f"Memory usage: {df.memory_usage(deep=True).sum() / 1024**2:.2f} MB")
    print(f"Columns: {list(df.columns)}")
    print(f"Data types:\\n{df.dtypes}")
    print(f"\\nFirst 5 rows:")
    print(df.head())
    print(f"\\nSummary statistics:")
    print(df.describe())
    
except Exception as e:
    print(f"Error inspecting file: {e}")
`;
    } else {
      return `
# File info for ${file.originalName}
print(f"File: ${file.originalName}")
print(f"Path: ${file.pythonPath}")
print(f"Size: ${file.size} bytes")
print(f"Type: ${file.type}")
`;
    }
  }
}