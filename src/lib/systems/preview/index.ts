/**
 * Preview System - Centralized file preview registry
 * 
 * This system allows plugins to register preview components for specific file types,
 * and provides a universal preview renderer that automatically selects the best
 * preview component for any given file.
 */

export { 
  registerPreview, 
  getPreviewComponent, 
  getAllPreviews, 
  hasPreview,
  initializeBuiltinPreviews,
  type PreviewRegistration 
} from './registry.svelte.js';

export { default as PreviewRenderer } from './PreviewRenderer.svelte';