/**
 * Pyodide Web Worker for Isolated Script Execution
 * Each script runs in a fresh worker to ensure memory isolation and clean state
 */

// Worker script content that will be converted to a blob URL
export const PYODIDE_WORKER_SCRIPT = `
let pyodide;

async function loadPyodideAndPackages(embeddedAssets, baseUrl) {
    // Check if we have embedded assets (single-file build)
    if (embeddedAssets && embeddedAssets['pyodide.js']) {
        // Load Pyodide from embedded assets with improved approach
        try {
            // Create blob URLs for all embedded assets first
            const assetBlobUrls = {};
            const cleanupUrls = [];
            
            for (const [filename, dataUri] of Object.entries(embeddedAssets)) {
                try {
                    const base64Data = dataUri.split(',')[1];
                    if (base64Data) {
                        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
                        const mimeType = getMimeTypeFromFilename(filename);
                        const blob = new Blob([binaryData], { type: mimeType });
                        const blobUrl = URL.createObjectURL(blob);
                        assetBlobUrls[filename] = blobUrl;
                        cleanupUrls.push(blobUrl);
                    }
                } catch (error) {
                    console.error(\`Failed to create blob URL for \${filename}:\`, error);
                }
            }
            
            // Set up both fetch and importScripts interception for CSP compliance
            const originalFetch = globalThis.fetch;
            const originalImportScripts = globalThis.importScripts;
            
            globalThis.fetch = function(url, options) {
                const urlString = String(url);
                console.log(\`Fetch intercepted: \${urlString}\`);
                if (urlString.startsWith('https://pyodide-embedded/')) {
                    const filename = urlString.replace('https://pyodide-embedded/', '');
                    console.log(\`Looking for embedded file: \${filename}\`);
                    if (assetBlobUrls[filename]) {
                        console.log(\`Redirecting \${filename} to blob URL\`);
                        return originalFetch.call(this, assetBlobUrls[filename], options);
                    }
                    console.error(\`Embedded asset not found: \${filename}\`);
                    console.error('Available assets:', Object.keys(assetBlobUrls));
                    return Promise.reject(new Error(\`Embedded asset not found: \${filename}\`));
                }
                return originalFetch.call(this, url, options);
            };
            
            // Intercept importScripts for CSP compliance
            globalThis.importScripts = function(...urls) {
                const mappedUrls = urls.map(url => {
                    const urlString = String(url);
                    if (urlString.startsWith('https://pyodide-embedded/')) {
                        const filename = urlString.replace('https://pyodide-embedded/', '');
                        if (assetBlobUrls[filename]) {
                            console.log(\`Redirecting importScripts for \${filename} to blob URL\`);
                            return assetBlobUrls[filename];
                        }
                        throw new Error(\`Embedded asset not found for importScripts: \${filename}\`);
                    }
                    return url;
                });
                return originalImportScripts.apply(this, mappedUrls);
            };
            
            // Load pyodide.js using importScripts with proper cleanup
            const pyodideJsUrl = assetBlobUrls['pyodide.js'];
            if (!pyodideJsUrl) {
                throw new Error('pyodide.js not found in embedded assets');
            }
            
            try {
                importScripts(pyodideJsUrl);
                
                // Load Pyodide with embedded assets - keep fetch interception active
                self.pyodide = await loadPyodide({
                    indexURL: 'https://pyodide-embedded/',
                    stdout: (text) => {
                        self.postMessage({ type: 'stdout', data: text });
                    },
                    stderr: (text) => {
                        self.postMessage({ type: 'stderr', data: text });
                    }
                });
                
                // Load micropip first with our fetch interception still active
                await self.pyodide.loadPackage("micropip");
                await self.pyodide.loadPackage("packaging");
                
                // Keep fetch interception active for the entire worker session
                // Only restore importScripts since it's not needed after initial loading
                globalThis.importScripts = originalImportScripts;
                
                // Store the asset URLs globally so they persist for the worker lifetime
                self.pyodideAssetUrls = assetBlobUrls;
                
            } catch (error) {
                // On error, restore everything
                globalThis.fetch = originalFetch;
                globalThis.importScripts = originalImportScripts;
                cleanupUrls.forEach(url => URL.revokeObjectURL(url));
                throw error;
            }
            
        } catch (error) {
            console.error('Failed to load Pyodide from embedded assets:', error);
            throw error;
        }
    } else {
        // Standard mode - load from Vite-generated paths
        try {
            // Use base URL passed from main thread
            if (!baseUrl) {
                throw new Error('Base URL not provided');
            }
            
            // Detect GitHub Pages deployment
            const isGitHubPages = baseUrl.includes('github.io');
            const basePath = isGitHubPages ? '/BrowserBoxV5' : '';
            
            // Import from assets directory (where Vite places core Pyodide files)
            importScripts(\`\${baseUrl}\${basePath}/assets/pyodide.js\`);
            
            // Load Pyodide with assets path for core files
            self.pyodide = await loadPyodide({
                indexURL: \`\${baseUrl}\${basePath}/assets/\`,
                stdout: (text) => {
                    self.postMessage({ type: 'stdout', data: text });
                },
                stderr: (text) => {
                    self.postMessage({ type: 'stderr', data: text });
                }
            });
        } catch (error) {
            console.error('Failed to load Pyodide from local files:', error);
            throw error;
        }
    }
    
    return self.pyodide;
}

function getMimeTypeFromFilename(filename) {
    if (filename.endsWith('.wasm')) return 'application/wasm';
    if (filename.endsWith('.js')) return 'application/javascript';
    if (filename.endsWith('.json')) return 'application/json';
    if (filename.endsWith('.zip')) return 'application/zip';
    if (filename.endsWith('.whl')) return 'application/zip';
    if (filename.endsWith('.tar')) return 'application/x-tar';
    if (filename.endsWith('.tar.gz')) return 'application/gzip';
    if (filename.endsWith('.data')) return 'application/octet-stream';
    if (filename.endsWith('.txt')) return 'text/plain';
    if (filename.endsWith('.map')) return 'application/json';
    return 'application/octet-stream';
}

// Pyodide will be loaded when we receive the first message with embedded assets
let pyodideReadyPromise = null;

self.onmessage = async function(event) {
    try {
        const { id, python, files, embeddedAssets, baseUrl } = event.data;
        
        // Initialize Pyodide on first message with embedded assets
        if (!pyodideReadyPromise) {
            pyodideReadyPromise = loadPyodideAndPackages(embeddedAssets, baseUrl);
        }
        
        // Make sure pyodide is ready
        self.pyodide = await pyodideReadyPromise;
        
        function sendStatus(status) {
            self.postMessage({ type: 'status', id, data: status });
        }
        
        sendStatus("Setting up environment...");
        
        sendStatus("Loading packages...");
        
        // Load micropip first
        await self.pyodide.loadPackage("micropip");
        const micropip = self.pyodide.pyimport("micropip");
        
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
        
        // Matplotlib dependencies that need to be installed first
        const matplotlibDeps = [
            'cycler-0.12.1-py3-none-any.whl',
            'fonttools-4.51.0-py3-none-any.whl',
            'kiwisolver-1.4.5-cp312-cp312-pyodide_2024_0_wasm32.whl',
            'pillow-10.2.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
            'pyparsing-3.1.2-py3-none-any.whl',
            'contourpy-1.3.0-cp312-cp312-pyodide_2024_0_wasm32.whl'
            // packaging and python-dateutil already available in base pyodide
            // numpy already installed in basicPackages
        ];
        
        // Matplotlib itself
        const matplotlibPackages = [
            'matplotlib-3.8.4-cp312-cp312-pyodide_2024_0_wasm32.whl'
        ];
        
        // Install basic packages first
        if (embeddedAssets) {
            // Single-file build mode - use embedded wheels directly
            for (const filename of basicPackages) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        
                        try {
                            self.pyodide.FS.mkdir('/wheels');
                        } catch (e) {
                            // Directory might already exist
                        }
                        
                        self.pyodide.FS.writeFile(wheelPath, data);
                        await micropip.install(\`emfs:\${wheelPath}\`);
                        console.log(\`Installed: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to install \${filename}:\`, error);
                    }
                }
            }
        } else {
            // Standard mode - use pyodide directory for wheel files
            for (const filename of basicPackages) {
                try {
                    const response = await fetch(\`\${baseUrl}\${basePath}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    
                    try {
                        self.pyodide.FS.mkdir('/wheels');
                    } catch (e) {
                        // Directory might already exist
                    }
                    
                    self.pyodide.FS.writeFile(wheelPath, data);
                    await micropip.install(\`emfs:\${wheelPath}\`);
                    console.log(\`Installed: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to install \${filename} from pyodide directory:\`, error);
                }
            }
        }
        
        // Install Fiona dependencies first
        console.log('Installing Fiona dependencies...');
        if (embeddedAssets) {
            for (const filename of fionaDeps) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        self.pyodide.FS.writeFile(wheelPath, data);
                        await micropip.install(\`emfs:\${wheelPath}\`);
                        console.log(\`Installed fiona dependency: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to install fiona dependency \${filename}:\`, error);
                    }
                }
            }
        } else {
            for (const filename of fionaDeps) {
                try {
                    const response = await fetch(\`\${baseUrl}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    self.pyodide.FS.writeFile(wheelPath, data);
                    await micropip.install(\`emfs:\${wheelPath}\`);
                    console.log(\`Installed fiona dependency: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to install fiona dependency \${filename} from local files:\`, error);
                }
            }
        }
        
        // Install GeoPandas dependencies from embedded wheels
        console.log('Installing GeoPandas dependencies...');
        if (embeddedAssets) {
            for (const filename of geopandasDeps) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        self.pyodide.FS.writeFile(wheelPath, data);
                        await micropip.install(\`emfs:\${wheelPath}\`);
                        console.log(\`Installed dependency: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to install dependency \${filename}:\`, error);
                    }
                }
            }
        } else {
            for (const filename of geopandasDeps) {
                try {
                    const response = await fetch(\`\${baseUrl}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    self.pyodide.FS.writeFile(wheelPath, data);
                    await micropip.install(\`emfs:\${wheelPath}\`);
                    console.log(\`Installed dependency: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to install dependency \${filename} from local files:\`, error);
                }
            }
        }
        
        // Finally install GeoPandas - extract wheel manually to bypass micropip dependency issues
        console.log('Installing GeoPandas manually...');
        if (embeddedAssets) {
            for (const filename of geopandasPackages) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        self.pyodide.FS.writeFile(wheelPath, data);
                        
                        // Extract the wheel manually using Python's zipfile instead of micropip
                        await self.pyodide.runPythonAsync(\`
import zipfile
import sys
import os

# Extract geopandas wheel manually
with zipfile.ZipFile('/wheels/\${filename}', 'r') as zip_file:
    # Extract to site-packages
    zip_file.extractall('/lib/python3.12/site-packages/')

# Refresh module cache to recognize new packages
import importlib
if hasattr(importlib, 'invalidate_caches'):
    importlib.invalidate_caches()

print("GeoPandas wheel extracted manually")
                        \`);
                        console.log(\`Manually extracted: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to manually extract \${filename}:\`, error);
                    }
                }
            }
        } else {
            for (const filename of geopandasPackages) {
                try {
                    const response = await fetch(\`\${baseUrl}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    self.pyodide.FS.writeFile(wheelPath, data);
                    
                    // Extract the wheel manually using Python's zipfile instead of micropip
                    await self.pyodide.runPythonAsync(\`
import zipfile
import sys
import os

# Extract geopandas wheel manually
with zipfile.ZipFile('/wheels/\${filename}', 'r') as zip_file:
    # Extract to site-packages
    zip_file.extractall('/lib/python3.12/site-packages/')

# Refresh module cache to recognize new packages
import importlib
if hasattr(importlib, 'invalidate_caches'):
    importlib.invalidate_caches()

print("GeoPandas wheel extracted manually")
                    \`);
                    console.log(\`Manually extracted: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to manually extract \${filename} from local files:\`, error);
                }
            }
        }
        
        // Install matplotlib dependencies
        console.log('Installing matplotlib dependencies...');
        if (embeddedAssets) {
            for (const filename of matplotlibDeps) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        self.pyodide.FS.writeFile(wheelPath, data);
                        await micropip.install(\`emfs:\${wheelPath}\`);
                        console.log(\`Installed matplotlib dependency: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to install matplotlib dependency \${filename}:\`, error);
                    }
                }
            }
        } else {
            for (const filename of matplotlibDeps) {
                try {
                    const response = await fetch(\`\${baseUrl}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    self.pyodide.FS.writeFile(wheelPath, data);
                    await micropip.install(\`emfs:\${wheelPath}\`);
                    console.log(\`Installed matplotlib dependency: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to install matplotlib dependency \${filename} from local files:\`, error);
                }
            }
        }
        
        // Install matplotlib itself
        console.log('Installing matplotlib...');
        if (embeddedAssets) {
            for (const filename of matplotlibPackages) {
                if (embeddedAssets[filename]) {
                    try {
                        // Convert embedded asset directly to binary data
                        const base64Data = embeddedAssets[filename].split(',')[1];
                        const binaryData = atob(base64Data);
                        const data = new Uint8Array(binaryData.length);
                        for (let i = 0; i < binaryData.length; i++) {
                            data[i] = binaryData.charCodeAt(i);
                        }
                        
                        const wheelPath = \`/wheels/\${filename}\`;
                        self.pyodide.FS.writeFile(wheelPath, data);
                        await micropip.install(\`emfs:\${wheelPath}\`);
                        console.log(\`Installed matplotlib: \${filename}\`);
                    } catch (error) {
                        console.error(\`Failed to install matplotlib \${filename}:\`, error);
                    }
                }
            }
        } else {
            for (const filename of matplotlibPackages) {
                try {
                    const response = await fetch(\`\${baseUrl}/pyodide/\${filename}\`);
                    const arrayBuffer = await response.arrayBuffer();
                    const data = new Uint8Array(arrayBuffer);
                    
                    const wheelPath = \`/wheels/\${filename}\`;
                    self.pyodide.FS.writeFile(wheelPath, data);
                    await micropip.install(\`emfs:\${wheelPath}\`);
                    console.log(\`Installed matplotlib: \${filename}\`);
                } catch (error) {
                    console.error(\`Failed to install matplotlib \${filename} from local files:\`, error);
                }
            }
        }
        
        console.log('GeoPandas and matplotlib installation phase completed, moving to filesystem setup...');
        sendStatus("Setting up filesystem...");
        
        // Create data directory
        console.log('Creating data directory...');
        self.pyodide.runPython(\`
import os
if not os.path.exists('/data'):
    os.makedirs('/data')
        \`);
        console.log('Data directory created.');
        
        // Record initial filesystem state
        console.log('Recording initial filesystem state...');
        const initialFiles = new Set();
        try {
            const dataFiles = self.pyodide.FS.readdir('/data');
            dataFiles.forEach(name => {
                if (name !== '.' && name !== '..') {
                    initialFiles.add(name);
                }
            });
        } catch (e) {
            // Directory might not exist yet
        }
        console.log('Initial filesystem state recorded.');
        
        // Add files to the virtual filesystem
        if (files && files.length > 0) {
            console.log('Loading files into filesystem...');
            sendStatus("Loading files into filesystem...");
            
            for (const file of files) {
                const path = \`/data/\${file.name}\`;
                self.pyodide.FS.writeFile(path, new Uint8Array(file.data));
                initialFiles.add(file.name); // Mark as initial file
                
                // Log file mapping for debugging
                if (file.originalName !== file.name) {
                    console.log(\`File renamed: \${file.originalName} -> \${file.name}\`);
                } else {
                    console.log(\`File loaded: \${file.name}\`);
                }
            }
            console.log('Files loaded into filesystem.');
        } else {
            console.log('No files to load into filesystem.');
        }
        
        sendStatus("Setting up Python environment...");
        
        // Set up Python environment
        console.log('Setting up Python environment...');
        self.pyodide.runPython(\`
import sys
import os

# Set working directory to data directory
os.chdir('/data')

# Set up output capturing
import io
import contextlib

class OutputCollector:
    def __init__(self):
        self.value = ""
    
    def write(self, text):
        self.value += text
        return len(text)
    
    def flush(self):
        pass

stdout_collector = OutputCollector()
stderr_collector = OutputCollector()

old_stdout = sys.stdout
old_stderr = sys.stderr

sys.stdout = stdout_collector
sys.stderr = stderr_collector
        \`);
        console.log('Python environment setup completed.');
        
        sendStatus("Executing Python script...");
        
        // Execute the Python code with enhanced error handling
        console.log('Starting Python script execution...');
        let result;
        try {
            // Wrap user code in try-except for better error reporting
            // Indent each line of user code to be inside the try block
            const indentedPython = python.split('\\n').map(line => '    ' + line).join('\\n');
            const wrappedPython = \`
try:
\${indentedPython}
except Exception as e:
    import traceback
    error_msg = "Python Error: " + type(e).__name__ + ": " + str(e) + "\\\\n"
    error_msg += "Traceback:\\\\n" + traceback.format_exc()
    print(error_msg, file=sys.stderr)
    raise e
            \`;
            result = await self.pyodide.runPythonAsync(wrappedPython);
        } catch (pythonError) {
            console.log('Python script execution failed with error:', pythonError);
            // Don't re-throw yet, let's capture stderr first
        }
        console.log('Python script execution completed.');
        
        // Get captured output
        const stdout = self.pyodide.runPython("stdout_collector.value");
        const stderr = self.pyodide.runPython("stderr_collector.value");
        
        // Reset stdout and stderr
        self.pyodide.runPython(\`
sys.stdout = old_stdout
sys.stderr = old_stderr
        \`);
        
        sendStatus("Collecting output files...");
        
        // Collect new/modified files
        const modifiedFiles = [];
        try {
            const currentFiles = self.pyodide.FS.readdir('/data');
            const newFiles = currentFiles.filter(name => 
                name !== '.' && name !== '..' && !initialFiles.has(name)
            );
            
            for (const fileName of newFiles) {
                try {
                    const path = \`/data/\${fileName}\`;
                    const content = self.pyodide.FS.readFile(path, { encoding: 'binary' });
                    
                    modifiedFiles.push({
                        name: fileName,
                        data: content,
                        path: path
                    });
                } catch (fileError) {
                    console.error(\`Error reading file \${fileName}:\`, fileError);
                }
            }
        } catch (fsError) {
            console.error("Error reading filesystem:", fsError);
        }
        
        // Send results - check if we have errors in stderr
        if (stderr && stderr.trim()) {
            // Python error occurred - send as error but include output
            self.postMessage({
                type: 'error',
                id,
                data: {
                    error: stderr,
                    stdout: stdout || '',
                    stderr: stderr,
                    modifiedFiles: modifiedFiles
                }
            });
        } else {
            // Successful execution
            self.postMessage({
                type: 'complete',
                id,
                data: {
                    result,
                    stdout,
                    stderr,
                    modifiedFiles
                }
            });
        }
        
    } catch (error) {
        // Send error
        self.postMessage({
            type: 'error',
            id: event.data.id,
            data: {
                error: error.message,
                stack: error.stack
            }
        });
    }
};
`;

// Interface for worker communication
export interface WorkerMessage {
    type: 'status' | 'stdout' | 'stderr' | 'complete' | 'error';
    id: string;
    data: any;
}

export interface ScriptExecutionRequest {
    id: string;
    python: string;
    files?: Array<{ name: string; originalName: string; requirementId: string; data: ArrayBuffer }>;
    embeddedAssets?: Record<string, string>;
    baseUrl?: string;
}

export interface ScriptExecutionResult {
    result?: any;
    stdout: string;
    stderr: string;
    modifiedFiles: Array<{
        name: string;
        data: Uint8Array;
        path: string;
    }>;
}

// Create a web worker from the script content
export function createPyodideWorker(): Worker {
    const blob = new Blob([PYODIDE_WORKER_SCRIPT], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);
    
    // Clean up the blob URL after worker is created
    setTimeout(() => URL.revokeObjectURL(workerUrl), 1000);
    
    return worker;
}