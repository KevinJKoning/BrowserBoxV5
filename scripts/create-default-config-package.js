#!/usr/bin/env node

/**
 * Script to create a default configuration ZIP package from current static configuration
 * This generates a ZIP file that can be used to test the configuration loading system
 */

import JSZip from 'jszip';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

async function createDefaultConfigPackage() {
  console.log('Creating default configuration package...');
  
  const zip = new JSZip();
  
  // Package metadata
  const packageMetadata = {
    name: 'default-prav3-config',
    version: '1.0.0',
    description: 'Default configuration package for PRAv3 with file requirements, scripts, and schema validations',
    author: 'PRAv3 System',
    created: new Date().toISOString(),
    updated: new Date().toISOString()
  };
  
  zip.file('package.json', JSON.stringify(packageMetadata, null, 2));
  
  // Extract file requirements
  console.log('Processing file requirements...');
  const fileConfigPath = path.join(projectRoot, 'src/lib/config/file-config.ts');
  const fileConfigContent = await fs.readFile(fileConfigPath, 'utf-8');
  
  // Parse the fileRequirements export (simplified extraction)
  const fileRequirementsMatch = fileConfigContent.match(/export const fileRequirements: FileRequirement\[\] = (\[[\s\S]*?\]);/);
  if (fileRequirementsMatch) {
    // Convert TypeScript object literal to JSON (simplified approach)
    let requirementsCode = fileRequirementsMatch[1];
    // Replace TypeScript syntax with JSON syntax
    requirementsCode = requirementsCode
      .replace(/\t/g, '  ')  // Replace tabs with spaces
      .replace(/,(\s*[}\]])/g, '$1')  // Remove trailing commas
      .replace(/(\w+):/g, '"$1":')   // Quote property names
      .replace(/'/g, '"');           // Single quotes to double quotes
    
    try {
      const fileRequirements = JSON.parse(requirementsCode);
      zip.file('files/requirements.json', JSON.stringify(fileRequirements, null, 2));
      console.log(`✓ Added ${fileRequirements.length} file requirements`);
    } catch (e) {
      console.warn('Could not parse file requirements automatically, creating minimal version');
      zip.file('files/requirements.json', JSON.stringify([], null, 2));
    }
  }
  
  // Extract scripts
  console.log('Processing scripts...');
  const scriptsDir = path.join(projectRoot, 'src/lib/config/scripts');
  
  try {
    const scriptFiles = await fs.readdir(scriptsDir);
    const scriptMetadata = [];
    
    for (const file of scriptFiles) {
      if (file.endsWith('.ts')) {
        const scriptPath = path.join(scriptsDir, file);
        const scriptContent = await fs.readFile(scriptPath, 'utf-8');
        
        // Extract script object (simplified)
        const scriptMatch = scriptContent.match(/export const \w+: Script = ({[\s\S]*?});/);
        if (scriptMatch) {
          try {
            // Extract script metadata and content
            const scriptDefMatch = scriptContent.match(/export const \w+: Script = \{[\s\S]*?id: ["']([^"']+)["'][\s\S]*?title: ["']([^"']+)["'][\s\S]*?description: ["']([^"']+)["'][\s\S]*?filename: ["']([^"']+)["'][\s\S]*?content: `([\s\S]*?)`[\s\S]*?\}/);
            
            if (scriptDefMatch) {
              const [, id, title, description, filename, content] = scriptDefMatch;
              
              // Create Python file from content
              const pythonFilename = filename.replace('.py', '') + '.py';
              zip.file(`scripts/${pythonFilename}`, content);
              
              // Add to metadata
              scriptMetadata.push({
                id,
                title,
                description,
                filename: pythonFilename,
                category: 'analysis',
                dependencies: [] // Simplified for now
              });
            }
          } catch (e) {
            console.warn(`Could not process script ${file}:`, e.message);
          }
        }
      }
    }
    
    zip.file('scripts/metadata.json', JSON.stringify(scriptMetadata, null, 2));
    console.log(`✓ Added ${scriptMetadata.length} scripts`);
  } catch (e) {
    console.warn('Could not process scripts:', e.message);
    zip.file('scripts/metadata.json', JSON.stringify([], null, 2));
  }
  
  // Extract schemas
  console.log('Processing schemas...');
  const schemasDir = path.join(projectRoot, 'src/lib/config/schema');
  
  try {
    const schemaFiles = await fs.readdir(schemasDir);
    const schemaMetadata = [];
    
    for (const file of schemaFiles) {
      if (file.endsWith('.ts')) {
        const schemaPath = path.join(schemasDir, file);
        const schemaContent = await fs.readFile(schemaPath, 'utf-8');
        
        // Extract schema object (simplified)
        const schemaMatch = schemaContent.match(/export const \w+: SchemaValidation = ({[\s\S]*?});/);
        if (schemaMatch) {
          try {
            // Extract schema metadata and content
            const schemaDefMatch = schemaContent.match(/export const \w+: SchemaValidation = \{[\s\S]*?id: ["']([^"']+)["'][\s\S]*?title: ["']([^"']+)["'][\s\S]*?description: ["']([^"']+)["'][\s\S]*?filename: ["']([^"']+)["'][\s\S]*?content: `([\s\S]*?)`[\s\S]*?\}/);
            
            if (schemaDefMatch) {
              const [, id, title, description, filename, content] = schemaDefMatch;
              
              // Create Python file from content
              const pythonFilename = filename.replace('.py', '') + '.py';
              zip.file(`schemas/${pythonFilename}`, content);
              
              // Add to metadata (simplified expectations)
              schemaMetadata.push({
                id,
                title,
                description,
                filename: pythonFilename,
                expectations: {
                  description: "Schema validation",
                  columns: {},
                  expected_row_count: { min: 1, max: 1000000 }
                },
                category: 'validation',
                dependencies: []
              });
            }
          } catch (e) {
            console.warn(`Could not process schema ${file}:`, e.message);
          }
        }
      }
    }
    
    zip.file('schemas/metadata.json', JSON.stringify(schemaMetadata, null, 2));
    console.log(`✓ Added ${schemaMetadata.length} schemas`);
  } catch (e) {
    console.warn('Could not process schemas:', e.message);
    zip.file('schemas/metadata.json', JSON.stringify([], null, 2));
  }
  
  // Generate the ZIP file
  console.log('Generating ZIP package...');
  const zipContent = await zip.generateAsync({ type: 'nodebuffer' });
  const outputPath = path.join(projectRoot, 'default-config-package.zip');
  await fs.writeFile(outputPath, zipContent);
  
  console.log(`✅ Default configuration package created: ${outputPath}`);
  console.log(`Package name: ${packageMetadata.name}`);
  console.log(`Package version: ${packageMetadata.version}`);
  
  return outputPath;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createDefaultConfigPackage().catch(console.error);
}

export { createDefaultConfigPackage };