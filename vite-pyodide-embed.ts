import { readFileSync, readdirSync, existsSync } from 'fs';
import { resolve, join } from 'path';
import type { Plugin } from 'vite';

export function pyodideEmbedPlugin(): Plugin {
  return {
    name: 'pyodide-embed',
    apply: 'build',
    generateBundle(options, bundle) {
      const pyodideAssets: Record<string, string> = {};
      
      try {
        // Find the public/pyodide directory
        const pyodideDir = resolve('public/pyodide');
        
        if (!existsSync(pyodideDir)) {
          console.warn('Pyodide directory not found at:', pyodideDir);
          return;
        }
        
        // Read all pyodide files and convert to base64 data URLs
        const files = readdirSync(pyodideDir);
        
        for (const file of files) {
          if (file.endsWith('.wasm') || file.endsWith('.js') || file.endsWith('.json') || file.endsWith('.zip') || file.endsWith('.whl')) {
            const filePath = join(pyodideDir, file);
            const fileContent = readFileSync(filePath);
            const base64 = fileContent.toString('base64');
            const mimeType = getMimeType(file);
            pyodideAssets[file] = `data:${mimeType};base64,${base64}`;
          }
        }
        
        console.log(`Embedded ${Object.keys(pyodideAssets).length} Pyodide assets for single-file build`);
        
        // Inject the asset map into the main bundle
        for (const [fileName, bundleInfo] of Object.entries(bundle)) {
          if (bundleInfo.type === 'chunk' && bundleInfo.isEntry) {
            bundleInfo.code = `
window.__PYODIDE_ASSETS__ = ${JSON.stringify(pyodideAssets)};
${bundleInfo.code}
            `;
          }
        }
      } catch (error) {
        console.warn('Could not embed Pyodide assets:', error);
      }
    }
  };
}

function getMimeType(filename: string): string {
  if (filename.endsWith('.wasm')) return 'application/wasm';
  if (filename.endsWith('.js')) return 'application/javascript';
  if (filename.endsWith('.json')) return 'application/json';
  if (filename.endsWith('.zip')) return 'application/zip';
  if (filename.endsWith('.whl')) return 'application/zip';
  return 'application/octet-stream';
}