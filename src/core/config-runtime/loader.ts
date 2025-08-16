/**
 * Config Runtime Loader
 * 
 * This module will handle dynamic loading of external configuration packages
 * including file requirements, schema validations, and script configurations.
 * 
 * TODO: Implement runtime package loading system for External Config Loading phase
 */

import type { FileRequirement } from '../../lib/config/file-config.js';
import type { SchemaValidation } from '../../lib/config/schema-config.js';
import type { Script } from '../../lib/config/script-config.js';

// Placeholder interfaces for runtime config
export interface ConfigPackage {
  name: string;
  version: string;
  files?: FileRequirement[];
  schemas?: SchemaValidation[];
  scripts?: Script[];
}

export interface ConfigLoader {
  loadPackage(packageUrl: string): Promise<ConfigPackage>;
  registerPackage(pkg: ConfigPackage): void;
  getActivePackages(): ConfigPackage[];
}

/**
 * Runtime configuration loader (placeholder implementation)
 * TODO: Replace with actual external package loading system
 */
export class RuntimeConfigLoader implements ConfigLoader {
  private packages: ConfigPackage[] = [];

  async loadPackage(packageUrl: string): Promise<ConfigPackage> {
    // TODO: Implement actual package loading from external sources
    throw new Error('Runtime package loading not yet implemented');
  }

  registerPackage(pkg: ConfigPackage): void {
    // TODO: Implement package registration
    this.packages.push(pkg);
  }

  getActivePackages(): ConfigPackage[] {
    return [...this.packages];
  }

  // TODO: Add methods for:
  // - Package validation
  // - Dependency resolution
  // - Hot reloading
  // - Error handling
  // - Package versioning
}

// Global config loader instance
export const configLoader = new RuntimeConfigLoader();

/**
 * Load configuration from legacy static modules
 * TODO: This function bridges legacy static config with runtime config
 * Remove this once all config is loaded at runtime
 */
export async function loadLegacyConfig(): Promise<void> {
  // Dynamic imports to avoid circular dependencies
  const [fileConfig, schemaConfig, scriptConfig] = await Promise.all([
    import('../../lib/config/file-config.js'),
    import('../../lib/config/schema-config.js'),
    import('../../lib/config/script-config.js')
  ]);

  // Register legacy config as a package
  configLoader.registerPackage({
    name: 'legacy-config',
    version: '1.0.0',
    files: fileConfig.fileRequirements,
    schemas: schemaConfig.schemaValidations,
    scripts: scriptConfig.scripts
  });
}