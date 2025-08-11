/**
 * PyodideManager - Singleton class for managing Pyodide runtime
 * Uses modern Pyodide v0.28.0 APIs and best practices
 */

// Type declarations for Pyodide (basic types for our use case)
interface PyodideInterface {
  runPython(code: string): any;
  runPythonAsync(code: string): Promise<any>;
  loadPackage(packages: string | string[]): Promise<void>;
  pyimport(name: string): any;
  globals: Map<string, any>;
  toPy(obj: any): any;
  FS: {
    writeFile(path: string, data: Uint8Array): void;
    readFile(path: string): Uint8Array;
    mkdir(path: string): void;
    rmdir(path: string): void;
  };
}

interface LoadPyodideOptions {
  indexURL?: string;
  stdout?: (text: string) => void;
  stderr?: (text: string) => void;
  packages?: string[];
  jsURL?: string;
  wasmURL?: string;
  locateFile?: (path: string, prefix: string) => string;
  config?: {
    pyodide_py?: string;
    pyodide_lock?: string;
    packages?: {
        [key: string]: {
            fileName: string;
            url: string;
            md5?: string;
        }
    }
  };
}

declare global {
  function loadPyodide(options?: LoadPyodideOptions): Promise<PyodideInterface>;
}

export type PyodideInitializationStatus = 
  | 'not-initialized' 
  | 'initializing' 
  | 'loading-packages' 
  | 'ready' 
  | 'error';

export interface PyodideOutputHandler {
  onStdout?: (output: string) => void;
  onStderr?: (output: string) => void;
  onStatusChange?: (status: PyodideInitializationStatus) => void;
}

export class PyodideManager {
  private static instance: PyodideManager | null = null;
  private pyodide: PyodideInterface | null = null;
  private status: PyodideInitializationStatus = 'not-initialized';
  private initializationPromise: Promise<PyodideInterface> | null = null;
  private outputHandlers: PyodideOutputHandler[] = [];
  private stdoutBuffer: string = '';
  private stderrBuffer: string = '';

  private constructor() {}

  public static getInstance(): PyodideManager {
    if (!PyodideManager.instance) {
      PyodideManager.instance = new PyodideManager();
    }
    return PyodideManager.instance;
  }

  public getStatus(): PyodideInitializationStatus {
    return this.status;
  }

  public isReady(): boolean {
    return this.status === 'ready' && this.pyodide !== null;
  }

  public addOutputHandler(handler: PyodideOutputHandler): void {
    this.outputHandlers.push(handler);
  }

  public removeOutputHandler(handler: PyodideOutputHandler): void {
    const index = this.outputHandlers.indexOf(handler);
    if (index > -1) {
      this.outputHandlers.splice(index, 1);
    }
  }

  private setStatus(status: PyodideInitializationStatus): void {
    this.status = status;
    this.outputHandlers.forEach(handler => {
      handler.onStatusChange?.(status);
    });
  }

  private handleStdout = (output: string): void => {
    this.stdoutBuffer += output;
    this.outputHandlers.forEach(handler => {
      handler.onStdout?.(output);
    });
  };

  private handleStderr = (output: string): void => {
    this.stderrBuffer += output;
    this.outputHandlers.forEach(handler => {
      handler.onStderr?.(output);
    });
  };

  public async getPyodide(): Promise<PyodideInterface> {
    if (this.pyodide) {
      return this.pyodide;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.initializePyodide();
    return this.initializationPromise;
  }

  private async initializePyodide(): Promise<PyodideInterface> {
    try {
      this.setStatus('initializing');

      // Load the Pyodide script first
      await this.loadPyodideScript();

      // Check if we have embedded assets (single-file build)
      const hasEmbeddedAssets = typeof (globalThis as any).__PYODIDE_ASSETS__ !== 'undefined';
      let blobUrls: Record<string, string> = {};
      
      let loadPyodideOptions: LoadPyodideOptions = {
        stdout: this.handleStdout,
        stderr: this.handleStderr,
      };

      if (hasEmbeddedAssets) {
        // Pre-execute pyodide.asm.js content to avoid loading issues
        const assets = (globalThis as any).__PYODIDE_ASSETS__;
        if (assets['pyodide.asm.js']) {
          try {
            const base64Data = assets['pyodide.asm.js'].split(',')[1];
            const jsCode = atob(base64Data);
            
            // Execute the asm.js code directly
            const script = document.createElement('script');
            script.text = jsCode;
            document.head.appendChild(script);
          } catch (error) {
            console.error('Failed to pre-execute pyodide.asm.js:', error);
          }
        }
        
        // Convert embedded assets to blob URLs for fetch interception
        for (const [filename, dataUri] of Object.entries(assets)) {
          try {
            const base64Data = (dataUri as string).split(',')[1];
            if (base64Data) {
              const binaryData = atob(base64Data);
              const arrayBuffer = new Uint8Array(binaryData.length);
              for (let i = 0; i < binaryData.length; i++) {
                arrayBuffer[i] = binaryData.charCodeAt(i);
              }
              const mimeType = this.getMimeTypeFromFilename(filename);
              const blob = new Blob([arrayBuffer], { type: mimeType });
              blobUrls[filename] = URL.createObjectURL(blob);
            }
          } catch (error) {
            console.error(`Failed to create blob URL for ${filename}:`, error);
          }
        }
        
        // Monkey patch the global fetch function to intercept Pyodide's requests
        const originalFetch = globalThis.fetch;
        (globalThis as any).fetch = function(url: string | Request, options?: RequestInit) {
          // Handle different URL input types safely
          let urlString: string;
          try {
            if (typeof url === 'string') {
              urlString = url;
            } else if (url && typeof url === 'object' && 'url' in url) {
              urlString = url.url;
            } else {
              // Fallback for unexpected input types
              urlString = String(url);
            }
          } catch (error) {
            console.warn('Error processing URL in fetch override:', error);
            return originalFetch.call(this, url, options);
          }
          
          // Check if this is a Pyodide asset request
          if (urlString && urlString.startsWith('https://pyodide-embedded/')) {
            const filename = urlString.replace('https://pyodide-embedded/', '');
            
            if (blobUrls[filename]) {
              return originalFetch.call(this, blobUrls[filename], options);
            }
          }
          
          // Fall back to original fetch for non-Pyodide requests
          return originalFetch.call(this, url, options);
        };
        
        // Since we pre-executed pyodide.asm.js, use a simpler approach
        // Set indexURL to our custom domain - fetch interception will handle the files
        loadPyodideOptions.indexURL = 'https://pyodide-embedded/';
      } else {
        loadPyodideOptions.indexURL = './pyodide/';
      }

      // Initialize Pyodide with appropriate configuration
      this.pyodide = await loadPyodide(loadPyodideOptions);

      this.setStatus('loading-packages');

      // Load micropip first (as per Pyodide documentation)
      await this.pyodide.loadPackage("micropip");
      
      // Get micropip reference in JavaScript
      const micropip = this.pyodide.pyimport("micropip");
      
      // Configure micropip for offline mode - disable PyPI index to prevent CDN access
      // This allows graceful failures for missing packages instead of hard blocks
      micropip.set_index_urls([]);

      // Install packages in dependency order
      // First install basic packages
      const basicPackages = [
        'numpy-2.0.2-cp312-cp312-pyodide_2024_0_wasm32.whl',
        'pandas-2.2.3-cp312-cp312-pyodide_2024_0_wasm32.whl',
        'fastparquet-2024.5.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
        'scikit_learn-1.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl'
      ];
      
      // Fiona dependencies that need to be installed first
      const fionaDeps = [
        'attrs-23.2.0-py3-none-any.whl',
        'certifi-2024.12.14-py3-none-any.whl',
        'setuptools-69.5.1-py3-none-any.whl',
        'click-8.1.7-py3-none-any.whl',
        'click_plugins-1.1.1-py2.py3-none-any.whl',
        'cligj-0.7.2-py3-none-any.whl'
        // six is already available in base pyodide
      ];
      
      // GeoPandas dependencies as wheel files  
      const geopandasDeps = [
        'shapely-2.0.6-cp312-cp312-pyodide_2024_0_wasm32.whl',
        'fiona-1.9.5-cp312-cp312-pyodide_2024_0_wasm32.whl', 
        'pyproj-3.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl'
        // packaging already installed above, pandas already installed above
        // pyogrio not provided - geopandas will fall back to fiona
      ];
      
      // GeoPandas itself
      const geopandasPackages = [
        'geopandas-1.0.1-py3-none-any.whl'
      ];

      const allPackageArrays = [basicPackages, fionaDeps, geopandasDeps, geopandasPackages];
      const wheelFilenames = [...basicPackages, ...fionaDeps, ...geopandasDeps, ...geopandasPackages];
      
      // Create wheels directory if it doesn't exist
      try {
        this.pyodide.FS.mkdir('/wheels');
      } catch (e) {
        // Directory might already exist
      }
      
      // Install each package group in dependency order
      for (let i = 0; i < allPackageArrays.length; i++) {
        const packageArray = allPackageArrays[i];
        const groupName = ['basic packages', 'fiona dependencies', 'geopandas dependencies', 'geopandas'][i];
        
        console.log(`Installing ${groupName}...`);
        
        for (const filename of packageArray) {
          try {
            let packageUrl: string;
            
            if (hasEmbeddedAssets && blobUrls[filename]) {
              // Fetch the blob data and write to Pyodide filesystem
              const response = await fetch(blobUrls[filename]);
              const arrayBuffer = await response.arrayBuffer();
              const data = new Uint8Array(arrayBuffer);
              
              const wheelPath = `/wheels/${filename}`;
              this.pyodide.FS.writeFile(wheelPath, data);
              packageUrl = `emfs:${wheelPath}`;
            } else {
              // Use local wheel files
              packageUrl = `./pyodide/${filename}`;
            }
            
            // Install geopandas manually by extracting the wheel to bypass micropip dependency checking
            if (filename === 'geopandas-1.0.1-py3-none-any.whl') {
              if (hasEmbeddedAssets && blobUrls[filename]) {
                // For embedded assets, we already wrote the file above
                await this.pyodide.runPythonAsync(`
import zipfile
import sys
import os

# Extract geopandas wheel manually
with zipfile.ZipFile('/wheels/${filename}', 'r') as zip_file:
    # Extract to site-packages
    zip_file.extractall('/lib/python3.12/site-packages/')

# Refresh module cache to recognize new packages
import importlib
if hasattr(importlib, 'invalidate_caches'):
    importlib.invalidate_caches()

print("GeoPandas wheel extracted manually")
                `);
              } else {
                // For local files, fetch and write to filesystem first
                const response = await fetch(packageUrl);
                const arrayBuffer = await response.arrayBuffer();
                const data = new Uint8Array(arrayBuffer);
                const wheelPath = `/wheels/${filename}`;
                this.pyodide.FS.writeFile(wheelPath, data);
                
                await this.pyodide.runPythonAsync(`
import zipfile
import sys
import os

# Extract geopandas wheel manually
with zipfile.ZipFile('/wheels/${filename}', 'r') as zip_file:
    # Extract to site-packages
    zip_file.extractall('/lib/python3.12/site-packages/')

# Refresh module cache to recognize new packages
import importlib
if hasattr(importlib, 'invalidate_caches'):
    importlib.invalidate_caches()

print("GeoPandas wheel extracted manually")
                `);
              }
            } else {
              await micropip.install(packageUrl);
            }
            
            console.log(`Installed: ${filename}`);
          } catch (error) {
            console.error(`Failed to install ${filename}:`, error);
          }
        }
      }

      // Verify installations
      await this.pyodide.runPython(`
        try:
          import numpy as np
          import pandas as pd
          import fastparquet
          import sklearn
          import fiona  # Explicitly import fiona for geopandas I/O fallback
          import geopandas as gpd
          print("All packages successfully imported!")
          print(f"GeoPandas version: {gpd.__version__}")
          print(f"Fiona version: {fiona.__version__}")
        except ImportError as e:
          print(f"Import error: {e}")
      `);

      this.setStatus('ready');
      return this.pyodide;

    } catch (error) {
      this.setStatus('error');
      console.error('Failed to initialize Pyodide:', error);
      throw error;
    }
  }

  private async loadPyodideScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if loadPyodide is already available
      if (typeof loadPyodide !== 'undefined') {
        resolve();
        return;
      }

      // Check for embedded pyodide.js in single-file build
      const hasEmbeddedAssets = typeof (globalThis as any).__PYODIDE_ASSETS__ !== 'undefined';
      if (hasEmbeddedAssets && (globalThis as any).__PYODIDE_ASSETS__?.['pyodide.js']) {
        try {
          const embeddedScript = (globalThis as any).__PYODIDE_ASSETS__['pyodide.js'];
          // For data URLs containing JavaScript, we need to extract and execute the code
          const base64Data = embeddedScript.split(',')[1];
          const jsCode = atob(base64Data);
          
          // Execute the JavaScript code directly instead of using src
          const script = document.createElement('script');
          script.text = jsCode;
          script.onload = () => resolve();
          script.onerror = () => reject(new Error('Failed to execute embedded Pyodide script'));
          document.head.appendChild(script);
          
          // Resolve immediately since inline scripts execute synchronously
          resolve();
          return;
        } catch (error) {
          console.warn('Failed to load embedded pyodide.js, falling back to file system:', error);
        }
      }

      // Fallback to loading from file system
      const script = document.createElement('script');
      script.src = './pyodide/pyodide.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Pyodide script'));
      document.head.appendChild(script);
    });
  }

  private getMimeTypeFromFilename(filename: string): string {
    if (filename.endsWith('.wasm')) return 'application/wasm';
    if (filename.endsWith('.js')) return 'application/javascript';
    if (filename.endsWith('.json')) return 'application/json';
    if (filename.endsWith('.zip')) return 'application/zip';
    if (filename.endsWith('.whl')) return 'application/zip';
    return 'application/octet-stream';
  }

  public async runPython(code: string): Promise<any> {
    const pyodide = await this.getPyodide();
    return pyodide.runPython(code);
  }

  public async runPythonAsync(code: string): Promise<any> {
    const pyodide = await this.getPyodide();
    return pyodide.runPythonAsync(code);
  }

  public async writeFile(path: string, data: Uint8Array): Promise<void> {
    const pyodide = await this.getPyodide();
    pyodide.FS.writeFile(path, data);
  }

  public async readFile(path: string): Promise<Uint8Array> {
    const pyodide = await this.getPyodide();
    return pyodide.FS.readFile(path);
  }

  public getStdoutBuffer(): string {
    return this.stdoutBuffer;
  }

  public getStderrBuffer(): string {
    return this.stderrBuffer;
  }

  public clearBuffers(): void {
    this.stdoutBuffer = '';
    this.stderrBuffer = '';
  }

  // Utility method to check if a Python package is available
  public async isPackageAvailable(packageName: string): Promise<boolean> {
    try {
      await this.runPython(`import ${packageName}`);
      return true;
    } catch {
      return false;
    }
  }

  // Create a data directory for uploaded files
  public async createDataDirectory(): Promise<void> {
    const pyodide = await this.getPyodide();
    try {
      pyodide.FS.mkdir('/data');
    } catch (error) {
      // Directory might already exist, ignore error
    }
  }
}