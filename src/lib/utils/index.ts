/**
 * Utilities Index
 * Re-exports all utility functions in organized modules
 */

// Generic utilities (most commonly used)
export * from './generic.js'; // keep .js extension for current import style; alias users can omit

// Formatting utilities
export * from './formatting.js';

// Status utilities
export * from './status.js';

// Dependency utilities
export * from './dependencies.js';

// For backwards compatibility, export the main cn function directly
export { cn } from './generic.js';