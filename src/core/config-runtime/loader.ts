/**
 * Config Runtime Loader
 * 
 * This module will handle dynamic loading of external configuration packages
 * including file requirements, schema validations, and script configurations.
 * 
 * TODO: Implement runtime package loading system for External Config Loading phase
 */

import type { FileRequirement, SchemaValidation, Script } from '@config/types.js';
import JSZip from 'jszip';

// Enhanced interfaces for runtime config with ZIP support
export interface ConfigPackageMetadata {
  name: string;
  version: string;
  description?: string;
  author?: string;
  created?: string;
  updated?: string;
}

export interface ConfigPackage extends ConfigPackageMetadata {
  files?: FileRequirement[];
  schemas?: SchemaValidation[];
  scripts?: Script[];
  // Package validation status
  isValid?: boolean;
  validationErrors?: string[];
  // Future extensibility
  plugins?: any[];
}

export interface PackageValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export interface ConfigLoader {
  loadPackage(packageSource: string | File): Promise<ConfigPackage>;
  loadPackageFromZip(zipFile: File): Promise<ConfigPackage>;
  validatePackage(pkg: Partial<ConfigPackage>): PackageValidationResult;
  registerPackage(pkg: ConfigPackage): void;
  getActivePackages(): ConfigPackage[];
  clearPackages(): void;
}

/**
 * Runtime configuration loader with ZIP package support
 */
export class RuntimeConfigLoader implements ConfigLoader {
  private packages: ConfigPackage[] = [];

  async loadPackage(packageSource: string | File): Promise<ConfigPackage> {
    if (packageSource instanceof File) {
      return this.loadPackageFromZip(packageSource);
    } else {
      // Do not implement URL-based package loading
      return Promise.reject(new Error('URL-based package loading not yet implemented'));
    }
  }

  async loadPackageFromZip(zipFile: File): Promise<ConfigPackage> {
    try {
      const zip = await JSZip.loadAsync(zipFile);
      
      // Extract and parse package.json
      const packageJsonFile = zip.file('package.json');
      if (!packageJsonFile) {
        throw new Error('package.json not found in ZIP file');
      }
      
      const packageJsonContent = await packageJsonFile.async('text');
      const packageMetadata: ConfigPackageMetadata = JSON.parse(packageJsonContent);
      
      // Initialize package with metadata
      const configPackage: ConfigPackage = {
        ...packageMetadata,
        files: [],
        schemas: [],
        scripts: [],
        plugins: []
      };
      
      // Parse file requirements
      configPackage.files = await this.parseFileRequirements(zip);
      
      // Parse script definitions
      configPackage.scripts = await this.parseScriptDefinitions(zip);
      
      // Parse schema definitions
      configPackage.schemas = await this.parseSchemaDefinitions(zip);
      
      // Validate the package
      const validation = this.validatePackage(configPackage);
      configPackage.isValid = validation.isValid;
      configPackage.validationErrors = validation.errors;
      
      if (!validation.isValid) {
        throw new Error(`Package validation failed: ${validation.errors.join(', ')}`);
      }
      
      return configPackage;
      
    } catch (error) {
      throw new Error(`Failed to load ZIP package: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  validatePackage(pkg: Partial<ConfigPackage>): PackageValidationResult {
    const errors: string[] = [];
    const warnings: string[] = [];
    
    // Required metadata validation
    if (!pkg.name) errors.push('Package name is required');
    if (!pkg.version) errors.push('Package version is required');
    
    // Content validation
    if (!pkg.files?.length && !pkg.scripts?.length && !pkg.schemas?.length) {
      warnings.push('Package contains no files, scripts, or schemas');
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      warnings
    };
  }

  registerPackage(pkg: ConfigPackage): void {
    this.packages.push(pkg);
  }

  getActivePackages(): ConfigPackage[] {
    return [...this.packages];
  }

  clearPackages(): void {
    this.packages.length = 0;
  }

  /**
   * Apply a loaded configuration package to the plugin stores
   * This replaces the current configuration with the package contents
   */
  async applyPackageToStores(configPackage: ConfigPackage): Promise<void> {
    try {
      // Dynamically import the store modules to avoid circular dependencies
      const [fileStore, scriptStore, schemaStore] = await Promise.all([
        import('@plugins/required-files/store.svelte'),
        import('@plugins/scripts/store.svelte'),
        import('@plugins/schema-validation/store.svelte')
      ]);

      // Load file requirements
      if (configPackage.files) {
        fileStore.loadFileRequirements(configPackage.files);
      }

      // Load scripts
      if (configPackage.scripts) {
        scriptStore.loadScripts(configPackage.scripts);
      }

      // Load schemas
      if (configPackage.schemas) {
        schemaStore.loadSchemas(configPackage.schemas);
      }

      console.log(`Applied configuration package: ${configPackage.name} v${configPackage.version}`);
    } catch (error) {
      throw new Error(`Failed to apply package to stores: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Load and apply a configuration package in one step
   */
  async loadAndApplyPackage(packageSource: string | File): Promise<ConfigPackage> {
    const configPackage = await this.loadPackage(packageSource);
    await this.applyPackageToStores(configPackage);
    this.registerPackage(configPackage);
    return configPackage;
  }

  /**
   * Load embedded default configuration ZIP file
   */
  async loadEmbeddedDefaultConfig(): Promise<ConfigPackage> {
    try {
      // Fetch the embedded default config ZIP file
      const response = await fetch('/default-config.zip');
      if (!response.ok) {
        throw new Error(`Failed to fetch default config: ${response.status} ${response.statusText}`);
      }
      
      const zipBlob = await response.blob();
      const zipFile = new File([zipBlob], 'default-config.zip', { type: 'application/zip' });
      
      // Use existing ZIP loading logic - no code duplication!
      const configPackage = await this.loadAndApplyPackage(zipFile);
      
      return configPackage;
    } catch (error) {
      throw new Error(`Failed to load embedded default configuration: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // Private methods for parsing package contents
  private async parseFileRequirements(zip: JSZip): Promise<FileRequirement[]> {
    const requirementsFile = zip.file('files/requirements.json');
    if (!requirementsFile) {
      return [];
    }
    
    const content = await requirementsFile.async('text');
    return JSON.parse(content) as FileRequirement[];
  }

  private async parseScriptDefinitions(zip: JSZip): Promise<Script[]> {
    const metadataFile = zip.file('scripts/metadata.json');
    if (!metadataFile) {
      return [];
    }
    
    const metadataContent = await metadataFile.async('text');
    const scriptMetadata = JSON.parse(metadataContent);
    
    const scripts: Script[] = [];
    
    for (const scriptMeta of scriptMetadata) {
      const scriptFile = zip.file(`scripts/${scriptMeta.filename}`);
      if (scriptFile) {
        const scriptContent = await scriptFile.async('text');
        scripts.push({
          ...scriptMeta,
          content: scriptContent
        });
      }
    }
    
    return scripts;
  }

  private async parseSchemaDefinitions(zip: JSZip): Promise<SchemaValidation[]> {
    const metadataFile = zip.file('schemas/metadata.json');
    if (!metadataFile) {
      return [];
    }
    
    const metadataContent = await metadataFile.async('text');
    const schemaMetadata = JSON.parse(metadataContent);
    
    const schemas: SchemaValidation[] = [];
    
    for (const schemaMeta of schemaMetadata) {
      if (schemaMeta.validationType === 'javascript') {
        // JavaScript validation - rules are in metadata, no separate file needed
        schemas.push(schemaMeta);
      } else if (schemaMeta.validationType === 'python' && schemaMeta.filename) {
        // Python validation - load script content from file
        const schemaFile = zip.file(`schemas/${schemaMeta.filename}`);
        if (schemaFile) {
          const schemaContent = await schemaFile.async('text');
          schemas.push({
            ...schemaMeta,
            content: schemaContent
          });
        } else {
          console.warn(`Schema file not found: schemas/${schemaMeta.filename}`);
          // Still add metadata without content
          schemas.push(schemaMeta);
        }
      } else {
        console.warn(`Unknown schema validation type or missing filename:`, schemaMeta);
      }
    }
    
    return schemas;
  }
}

// Global config loader instance
export const configLoader = new RuntimeConfigLoader();

/**
 * Load default configuration from embedded ZIP file
 * Uses the same ZIP loading logic as user-uploaded configs - no code duplication!
 */
export async function loadDefaultConfig(): Promise<void> {
  try {
    const defaultPackage = await configLoader.loadEmbeddedDefaultConfig();
    console.log(`Default configuration loaded successfully: ${defaultPackage.name} v${defaultPackage.version}`);
  } catch (error) {
    console.error('Failed to load default configuration:', error);
    throw new Error('Failed to load default configuration package');
  }
}

