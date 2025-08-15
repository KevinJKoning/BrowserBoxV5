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

      // Load micropip from our pyodide_0-27-7 distribution
      console.log('Loading micropip from local pyodide_0-27-7...');
      
      try {
        await this.pyodide.loadPackage(['micropip']);
        console.log('Micropip 0.9.0 loaded successfully');
        
        // Get micropip for installing local wheel files
        const micropip = this.pyodide.pyimport("micropip");
        
        // Configure micropip to only use our local wheels
        await this.pyodide.runPython(`
import micropip
# Disable PyPI index to use only our local wheels
micropip.set_index_urls([])
        `);
        
        // Install ALL packages from our pyodide_0-27-7 wheel files
        console.log('Installing all packages from pyodide_0-27-7 wheels...');
        
        // Install in dependency order using our local wheel files
        const geoPackages = [
          // Basic dependencies (some may already be available)
          'attrs-23.2.0-py3-none-any.whl',
          'certifi-2024.12.14-py3-none-any.whl', 
          'setuptools-69.5.1-py3-none-any.whl',
          'click-8.1.7-py3-none-any.whl',
          'cligj-0.7.2-py3-none-any.whl',
          'python_dateutil-2.9.0.post0-py2.py3-none-any.whl',
          'pytz-2024.1-py2.py3-none-any.whl',
          'six-1.16.0-py2.py3-none-any.whl',
          'packaging-24.2-py3-none-any.whl',
          'tzdata-2024.1-py2.py3-none-any.whl',
          // Enhanced data processing
          'fastparquet-2024.5.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
          // Matplotlib dependencies
          'cycler-0.12.1-py3-none-any.whl',
          'fonttools-4.51.0-py3-none-any.whl',
          'kiwisolver-1.4.5-cp312-cp312-pyodide_2024_0_wasm32.whl',
          'pillow-10.2.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
          'pyparsing-3.1.2-py3-none-any.whl',
          'contourpy-1.3.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
          // Core geospatial packages
          'shapely-2.0.6-cp312-cp312-pyodide_2024_0_wasm32.whl',
          'fiona-1.9.5-cp312-cp312-pyodide_2024_0_wasm32.whl',
          'pyproj-3.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl',
          // GeoPandas itself
          'geopandas-1.0.1-py3-none-any.whl'
        ];
        
        for (const wheelFile of geoPackages) {
          try {
            const wheelUrl = `${basePath}/pyodide/${wheelFile}`;
            console.log(`Installing ${wheelFile}...`);
            await micropip.install(wheelUrl);
            console.log(`✓ Installed ${wheelFile}`);
          } catch (error) {
            console.warn(`⚠ Failed to install ${wheelFile}:`, error);
            // Continue with other packages even if one fails
          }
        }
        
        // Test all functionality
        await this.pyodide.runPython(`
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import sklearn

print("✓ Basic scientific computing packages loaded successfully!")
print(f"NumPy version: {np.__version__}")
print(f"Pandas version: {pd.__version__}")
print(f"Matplotlib version: {plt.matplotlib.__version__}")
print(f"Scikit-learn version: {sklearn.__version__}")

try:
    import fastparquet
    print(f"✓ FastParquet version: {fastparquet.__version__}")
except ImportError as e:
    print(f"⚠ FastParquet not available: {e}")

try:
    import geopandas as gpd
    import fiona
    import shapely
    print("✓ Geospatial packages loaded successfully!")
    print(f"GeoPandas version: {gpd.__version__}")
    print(f"Fiona version: {fiona.__version__}")
    print(f"Shapely version: {shapely.__version__}")
except ImportError as e:
    print(f"⚠ Some geospatial packages not available: {e}")
        `);
        
      } catch (error) {
        console.error('Failed to load packages:', error);
        throw error;
      }

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