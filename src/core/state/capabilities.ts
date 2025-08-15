/**
 * Capabilities Registry - Feature detection and version management
 * Prepared for future external config validation
 */

export const APP_VERSION = "1.0.0";

/**
 * List of features/capabilities supported by this app version
 */
export function getSupportedCapabilities(): string[] {
  return [
    "pyodide:0.27",
    "schema:json-validation",
    "file:parquet",
    "file:csv", 
    "file:geopackage",
    "preview:html",
    "preview:parquet",
    "preview:csv",
    "preview:geopackage",
    "scripts:python",
    "results:download"
  ];
}

/**
 * Check if a specific capability is supported
 */
export function hasCapability(capability: string): boolean {
  return getSupportedCapabilities().includes(capability);
}

/**
 * Check if all required capabilities are supported
 */
export function supportsAllCapabilities(required: string[]): boolean {
  const supported = getSupportedCapabilities();
  return required.every(cap => supported.includes(cap));
}

/**
 * Get missing capabilities from a required list
 */
export function getMissingCapabilities(required: string[]): string[] {
  const supported = getSupportedCapabilities();
  return required.filter(cap => !supported.includes(cap));
}

/**
 * Version checking utilities (for future config packages)
 */
export function checkVersionRange(appVersion: string, requiredRange: string): boolean {
  // Simplified version check for now
  // TODO: Implement proper semver range checking when needed
  return true;
}