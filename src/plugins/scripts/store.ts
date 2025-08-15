/**
 * Scripts Plugin Store - Simplified version for initial implementation
 */

import { availableScripts } from '../../lib/config/script-config.js';
import { select, clearOtherSelections } from '../../core/state/workspace.js';

// For now, we'll use the existing script store logic
// TODO: Migrate full script execution logic here

export function selectScript(scriptId: string | null): void {
  clearOtherSelections('script');
  select('script', scriptId);
}

export { availableScripts };