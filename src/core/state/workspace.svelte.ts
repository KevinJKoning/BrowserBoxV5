/**
 * Workspace State - Global application state management
 * Uses Svelte 5 runes for reactive state
 */

export interface WorkspaceState {
  activePluginId: string | null;
  selections: Record<string, string | null>;
  sidebarOpen: boolean;
}

// Global workspace state using Svelte 5 runes
export const workspace = $state<WorkspaceState>({
  activePluginId: null,
  selections: {},
  sidebarOpen: true
});

/**
 * Activate a specific plugin
 */
export function activatePlugin(id: string) {
  workspace.activePluginId = id;
}

/**
 * Get the currently active plugin ID
 */
export function getActivePluginId(): string | null {
  return workspace.activePluginId;
}

/**
 * Set selection for a specific category (e.g., 'file', 'schema', 'script', 'result')
 */
export function select(category: string, id: string | null) {
  workspace.selections[category] = id;
}

/**
 * Get selection for a specific category
 */
export function getSelection(category: string): string | null {
  return workspace.selections[category] ?? null;
}

/**
 * Clear all selections except for the specified category
 */
export function clearOtherSelections(keepCategory: string) {
  Object.keys(workspace.selections).forEach(category => {
    if (category !== keepCategory) {
      workspace.selections[category] = null;
    }
  });
}

/**
 * Toggle sidebar open/closed
 */
export function toggleSidebar() {
  workspace.sidebarOpen = !workspace.sidebarOpen;
}

/**
 * Set sidebar state
 */
export function setSidebarOpen(open: boolean) {
  workspace.sidebarOpen = open;
}

/**
 * Get sidebar state
 */
export function getSidebarOpen(): boolean {
  return workspace.sidebarOpen;
}

/**
 * Check if a specific item is selected in a category
 */
export function isSelected(category: string, id: string): boolean {
  return workspace.selections[category] === id;
}