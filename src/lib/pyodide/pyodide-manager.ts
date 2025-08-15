/**
 * PyodideManager - Singleton class for managing Pyodide runtime
 * Uses standard Pyodide loading for PWA deployment
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

      // Use standard Pyodide loading approach
      const isProduction = window.location.pathname.includes('/BrowserBoxV5/');
      const basePath = isProduction ? '/BrowserBoxV5' : '';
      const loadPyodideOptions: LoadPyodideOptions = {
        stdout: this.handleStdout,
        stderr: this.handleStderr,
        indexURL: `${basePath}/assets/`, // Path where Vite places Pyodide core assets
      };

      // Initialize Pyodide with standard configuration
      this.pyodide = await loadPyodide(loadPyodideOptions);

      this.setStatus('loading-packages');

      // Load micropip first (as per Pyodide documentation)
      await this.pyodide.loadPackage("micropip");
      
      // Get micropip reference in JavaScript
      const micropip = this.pyodide.pyimport("micropip");
      
      // Configure micropip for offline mode - disable PyPI index to prevent CDN access
      micropip.set_index_urls([]);

      // Install packages in dependency order
      const basicPackages = [
        'numpy-2.0.2-cp312-cp312-pyodide_2024_0_wasm32.whl',
        'pandas-2.2.3-cp312-cp312-pyodide_2024_0_wasm32.whl',
        'fastparquet-2024.5.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
        'scikit_learn-1.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl'
      ];
      
      const fionaDeps = [
        'attrs-23.2.0-py3-none-any.whl',
        'certifi-2024.12.14-py3-none-any.whl',
        'setuptools-69.5.1-py3-none-any.whl',
        'click-8.1.7-py3-none-any.whl',
        'cligj-0.7.2-py3-none-any.whl'
      ];
      
      const geopandasDeps = [
        'shapely-2.0.6-cp312-cp312-pyodide_2024_0_wasm32.whl',
        'fiona-1.9.5-cp312-cp312-pyodide_2024_0_wasm32.whl', 
        'pyproj-3.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl'
      ];
      
      const geopandasPackages = [
        'geopandas-1.0.1-py3-none-any.whl'
      ];
      
      const matplotlibDeps = [
        'cycler-0.12.1-py3-none-any.whl',
        'fonttools-4.51.0-py3-none-any.whl',
        'kiwisolver-1.4.5-cp312-cp312-pyodide_2024_0_wasm32.whl',
        'pillow-10.2.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
        'pyparsing-3.1.2-py3-none-any.whl',
        'contourpy-1.3.0-cp312-cp312-pyodide_2024_0_wasm32.whl'
      ];
      
      const matplotlibPackages = [
        'matplotlib-3.8.4-cp312-cp312-pyodide_2024_0_wasm32.whl'
      ];

      const allPackageArrays = [basicPackages, fionaDeps, geopandasDeps, geopandasPackages, matplotlibDeps, matplotlibPackages];
      
      // Create wheels directory if it doesn't exist
      try {
        this.pyodide.FS.mkdir('/wheels');
      } catch (e) {
        // Directory might already exist
      }
      
      // Install each package group in dependency order
      for (let i = 0; i < allPackageArrays.length; i++) {
        const packageArray = allPackageArrays[i];
        const groupName = ['basic packages', 'fiona dependencies', 'geopandas dependencies', 'geopandas', 'matplotlib dependencies', 'matplotlib'][i];
        
        console.log(`Installing ${groupName}...`);
        
        for (const filename of packageArray) {
          try {
            // Use pyodide path for wheel files (they're copied to public/pyodide)
            const packageUrl = `${basePath}/pyodide/${filename}`;
            
            // Install geopandas manually by extracting the wheel to bypass micropip dependency checking
            if (filename === 'geopandas-1.0.1-py3-none-any.whl') {
              // Fetch and write to filesystem first
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
          import fiona
          import geopandas as gpd
          import matplotlib.pyplot as plt
          print("All packages successfully imported!")
          print(f"GeoPandas version: {gpd.__version__}")
          print(f"Fiona version: {fiona.__version__}")
          print(f"Matplotlib version: {plt.matplotlib.__version__}")
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

      // Load Pyodide script from standard location  
      const isProduction = window.location.pathname.includes('/BrowserBoxV5/');
      const basePath = isProduction ? '/BrowserBoxV5' : '';
      const script = document.createElement('script');
      script.src = `${basePath}/assets/pyodide.js`;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Pyodide script'));
      document.head.appendChild(script);
    });
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

  public async isPackageAvailable(packageName: string): Promise<boolean> {
    try {
      await this.runPython(`import ${packageName}`);
      return true;
    } catch {
      return false;
    }
  }

  public async createDataDirectory(): Promise<void> {
    const pyodide = await this.getPyodide();
    try {
      pyodide.FS.mkdir('/data');
    } catch (error) {
      // Directory might already exist, ignore error
    }
  }
}