/**
 * Simplified Pyodide Manager - Modern approach using standard loadPyodide
 * Based on https://pyodide.org/en/stable/usage/working-with-bundlers.html
 */

// Standard Pyodide types
interface PyodideInterface {
  runPython(code: string): any;
  runPythonAsync(code: string): Promise<any>;
  loadPackage(packages: string | string[]): Promise<void>;
  FS: {
    writeFile(path: string, data: Uint8Array): void;
    readFile(path: string): Uint8Array;
    mkdir(path: string): void;
  };
}

declare global {
  function loadPyodide(options?: {
    indexURL?: string;
    stdout?: (text: string) => void;
    stderr?: (text: string) => void;
  }): Promise<PyodideInterface>;
}

export interface ScriptResult {
  success: boolean;
  output: string;
  error?: string;
  executionTime: number;
  modifiedFiles?: Array<{
    name: string;
    data: Uint8Array;
    path: string;
  }>;
}

export interface ScriptOptions {
  dataFiles?: Array<{ file: File; filename?: string }>;
  timeout?: number;
  onStatusUpdate?: (status: string) => void;
  onStdout?: (output: string) => void;
  onStderr?: (output: string) => void;
}

export interface Script {
  id: string;
  content: string;
  title?: string;
}

/**
 * Simple Pyodide executor that creates fresh workers for each script
 */
export class SimplePyodideExecutor {
  private activeWorkers = new Map<string, Worker>();
  private executionCounter = 0;

  async executeScript(script: Script, options: ScriptOptions = {}): Promise<ScriptResult> {
    const startTime = Date.now();
    const executionId = `exec_${++this.executionCounter}_${Date.now()}`;

    return new Promise((resolve) => {
      // Create fresh worker for this execution
      const worker = this.createWorker();
      this.activeWorkers.set(executionId, worker);

      let stdout = '';
      let stderr = '';

      // Set up timeout
      const timeoutId = options.timeout ? setTimeout(() => {
        this.cleanup(executionId);
        resolve({
          success: false,
          output: stdout,
          error: `Execution timed out after ${options.timeout}ms`,
          executionTime: Date.now() - startTime
        });
      }, options.timeout) : null;

      // Handle worker messages
      worker.onmessage = (event) => {
        const { type, data } = event.data;

        switch (type) {
          case 'status':
            options.onStatusUpdate?.(data);
            break;

          case 'stdout':
            stdout += data;
            options.onStdout?.(data);
            break;

          case 'stderr':
            stderr += data;
            options.onStderr?.(data);
            break;

          case 'success':
            if (timeoutId) clearTimeout(timeoutId);
            this.cleanup(executionId);
            resolve({
              success: true,
              output: data.output || stdout,
              executionTime: Date.now() - startTime,
              modifiedFiles: data.modifiedFiles || []
            });
            break;

          case 'error':
            if (timeoutId) clearTimeout(timeoutId);
            this.cleanup(executionId);
            resolve({
              success: false,
              output: data.output || stdout,
              error: data.error,
              executionTime: Date.now() - startTime
            });
            break;
        }
      };

      worker.onerror = (error) => {
        if (timeoutId) clearTimeout(timeoutId);
        this.cleanup(executionId);
        resolve({
          success: false,
          output: stdout,
          error: `Worker error: ${error.message}`,
          executionTime: Date.now() - startTime
        });
      };

      // Send execution request with base URL
      const basePath = window.location.pathname.includes('/BrowserBoxV5/') ? '/BrowserBoxV5' : '';
      const baseUrl = `${window.location.origin}${basePath}`;
      
      worker.postMessage({
        type: 'execute',
        script: script.content,
        files: options.dataFiles || [],
        executionId,
        baseUrl
      });
    });
  }

  private createWorker(): Worker {
    const workerCode = `
      let pyodide;
      let stdout = '';
      let stderr = '';

      // Load Pyodide script from assets
      async function initPyodide(baseUrl) {
        // Import Pyodide from standard location using passed base URL
        const pyodideUrl = \`\${baseUrl}/assets/pyodide.js\`;
        importScripts(pyodideUrl);
        
        // Basic environment check
        console.log('Initializing Pyodide...');
        
        // Initialize Pyodide
        try {
          console.log('Loading Pyodide...');
          pyodide = await loadPyodide({
            indexURL: \`\${baseUrl}/assets/\`,
            stdout: (text) => {
              stdout += text;
              self.postMessage({ type: 'stdout', data: text });
            },
            stderr: (text) => {
              stderr += text;
              self.postMessage({ type: 'stderr', data: text });
            }
          });
          console.log('Pyodide loaded successfully');
        } catch (error) {
          console.error('Failed to load Pyodide:', error);
          throw new Error('Pyodide initialization failed: ' + error.message);
        }

        // Load basic scientific packages with error handling
        try {
          console.log('Loading Pyodide packages...');
          const packages = [
            'numpy', 'pandas', 'matplotlib', 'scikit-learn',
            'fastparquet', 'shapely', 'pyproj', 'micropip',
            'requests', 'geopandas'
          ];
          await pyodide.loadPackage(packages);
          console.log('All packages loaded successfully');
        } catch (error) {
          console.error('Error loading packages:', error);
          // Try loading packages individually
          const packages = [
            'numpy', 'pandas', 'matplotlib', 'scikit-learn',
            'fastparquet', 'shapely', 'pyproj', 'micropip',
            'requests', 'geopandas'
          ];
          for (const pkg of packages) {
            try {
              await pyodide.loadPackage(pkg);
              console.log(\`Successfully loaded \${pkg}\`);
            } catch (err) {
              console.warn(\`Failed to load \${pkg}:\`, err);
            }
          }
        }
        
        return pyodide;
      }

      self.onmessage = async function(event) {
        try {
          const { type, script, files, baseUrl } = event.data;
          
          if (type === 'execute') {
            self.postMessage({ type: 'status', data: 'Initializing Pyodide...' });
            
            if (!pyodide) {
              await initPyodide(baseUrl);
            }

            self.postMessage({ type: 'status', data: 'Setting up environment...' });

            // Create data directory
            try {
              pyodide.FS.mkdir('/data');
            } catch (e) {
              // Directory might exist
            }

            // Load files
            const initialFiles = new Set();
            for (const fileData of files) {
              const arrayBuffer = await fileData.file.arrayBuffer();
              const filename = fileData.filename || fileData.file.name;
              pyodide.FS.writeFile(\`/data/\${filename}\`, new Uint8Array(arrayBuffer));
              initialFiles.add(filename);
            }

            // Set working directory and capture output
            pyodide.runPython(\`
import os
import sys
os.chdir('/data')

class OutputCapture:
    def __init__(self):
        self.output = ''
    def write(self, text):
        self.output += text
    def flush(self):
        pass

_stdout_capture = OutputCapture()
_stderr_capture = OutputCapture()
_original_stdout = sys.stdout  
_original_stderr = sys.stderr
sys.stdout = _stdout_capture
sys.stderr = _stderr_capture
            \`);

            self.postMessage({ type: 'status', data: 'Executing script...' });

            // Execute user script
            try {
              await pyodide.runPythonAsync(script);
            } catch (error) {
              // Error will be captured in stderr
            }

            // Get captured output
            const capturedStdout = pyodide.runPython('_stdout_capture.output');
            const capturedStderr = pyodide.runPython('_stderr_capture.output');
            
            // Reset stdout/stderr
            pyodide.runPython('sys.stdout = _original_stdout; sys.stderr = _original_stderr');

            // Collect modified files
            const modifiedFiles = [];
            try {
              const currentFiles = pyodide.FS.readdir('/data');
              for (const fileName of currentFiles) {
                if (fileName !== '.' && fileName !== '..' && !initialFiles.has(fileName)) {
                  const content = pyodide.FS.readFile(\`/data/\${fileName}\`);
                  modifiedFiles.push({
                    name: fileName,
                    data: content,
                    path: \`/data/\${fileName}\`
                  });
                }
              }
            } catch (e) {
              // Ignore filesystem errors
            }

            // Send results
            if (capturedStderr && capturedStderr.trim()) {
              self.postMessage({
                type: 'error',
                data: {
                  error: capturedStderr,
                  output: capturedStdout || ''
                }
              });
            } else {
              self.postMessage({
                type: 'success',
                data: {
                  output: capturedStdout || '',
                  modifiedFiles
                }
              });
            }
          }
        } catch (error) {
          self.postMessage({
            type: 'error',
            data: {
              error: error.message,
              output: stdout
            }
          });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);
    
    // Clean up blob URL
    setTimeout(() => URL.revokeObjectURL(workerUrl), 1000);
    
    return worker;
  }

  private cleanup(executionId: string) {
    const worker = this.activeWorkers.get(executionId);
    if (worker) {
      worker.terminate();
      this.activeWorkers.delete(executionId);
    }
  }

  public cancelExecution(executionId?: string) {
    if (executionId) {
      this.cleanup(executionId);
    } else {
      // Cancel all
      for (const [id] of this.activeWorkers) {
        this.cleanup(id);
      }
    }
  }

  public dispose() {
    this.cancelExecution();
  }
}