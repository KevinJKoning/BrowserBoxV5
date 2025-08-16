/**
 * Preview System Registry
 * Central registry for file preview components
 */

import type { ComponentType } from "svelte";

export interface PreviewRegistration {
  /** File extensions this preview handles (e.g., ['.csv', '.tsv']) */
  extensions: string[];
  /** Preview component */
  component: () => Promise<{ default: ComponentType }> | ComponentType;
  /** Priority (higher numbers take precedence) */
  priority?: number;
  /** Whether this preview can handle the file type */
  canPreview?: (filename: string, content?: string | Uint8Array) => boolean;
}

// Global preview registry
const previewRegistry = $state<PreviewRegistration[]>([]);

/**
 * Register a preview component for specific file types
 */
export function registerPreview(registration: PreviewRegistration) {
  // Remove any existing registration with same extensions
  const existingIndex = previewRegistry.findIndex(r => 
    r.extensions.some(ext => registration.extensions.includes(ext))
  );
  
  if (existingIndex !== -1) {
    previewRegistry[existingIndex] = registration;
  } else {
    previewRegistry.push(registration);
  }
  
  // Sort by priority (highest first)
  previewRegistry.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

/**
 * Get the best preview component for a file
 */
export function getPreviewComponent(filename: string, content?: string | Uint8Array): PreviewRegistration | null {
  const extension = getFileExtension(filename);
  
  for (const registration of previewRegistry) {
    // Check extensions
    if (registration.extensions.includes(extension)) {
      // Check custom canPreview function if provided
      if (registration.canPreview && !registration.canPreview(filename, content)) {
        continue;
      }
      return registration;
    }
  }
  
  return null;
}

/**
 * Get all registered preview components
 */
export function getAllPreviews(): PreviewRegistration[] {
  return [...previewRegistry];
}

/**
 * Check if a file type has a preview available
 */
export function hasPreview(filename: string): boolean {
  return getPreviewComponent(filename) !== null;
}

/**
 * Helper to extract file extension
 */
function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot !== -1 ? filename.slice(lastDot).toLowerCase() : '';
}

/**
 * Initialize built-in preview components
 */
export function initializeBuiltinPreviews() {
  // CSV Preview
  registerPreview({
    extensions: ['.csv', '.tsv'],
    component: () => import('./csv-preview.svelte'),
    priority: 10
  });
  
  // Parquet Preview
  registerPreview({
    extensions: ['.parquet', '.pq'],
    component: () => import('./parquet-preview.svelte'),
    priority: 10
  });
  
  // GeoPackage Preview
  registerPreview({
    extensions: ['.gpkg', '.geopackage'],
    component: () => import('./geopackage-preview.svelte'),
    priority: 10
  });
  
  // HTML Preview
  registerPreview({
    extensions: ['.html', '.htm'],
    component: () => import('./html-preview.svelte'),
    priority: 10
  });
}