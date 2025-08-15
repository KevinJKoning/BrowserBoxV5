/**
 * Results Plugin Store - Simplified version for initial implementation
 */

import { select, clearOtherSelections } from '../../core/state/workspace.js';

// For now, we'll use the existing results store logic
// TODO: Migrate full results management logic here

export function selectResult(resultId: string | null): void {
  clearOtherSelections('result');
  select('result', resultId);
}