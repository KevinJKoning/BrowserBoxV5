<script module lang="ts">
  /** Workspace State managed with runes in a module script */
  export interface WorkspaceState {
    activePluginId: string | null;
    selections: Record<string, string | null>;
    sidebarOpen: boolean;
  }

  export const workspace = $state<WorkspaceState>({
    activePluginId: null,
    selections: {},
    sidebarOpen: true
  });

  export function activatePlugin(id: string | null) { workspace.activePluginId = id; }
  export function getActivePluginId() { return workspace.activePluginId; }
  export function select(category: string, id: string | null) { workspace.selections[category] = id; }
  export function getSelection(category: string) { return workspace.selections[category] ?? null; }
  export function clearOtherSelections(keepCategory: string) { Object.keys(workspace.selections).forEach(c => { if (c !== keepCategory) workspace.selections[c] = null; }); }
  export function clearAllSelections() { Object.keys(workspace.selections).forEach(c => workspace.selections[c] = null); }
  export function toggleSidebar() { workspace.sidebarOpen = !workspace.sidebarOpen; }
  export function setSidebarOpen(open: boolean) { workspace.sidebarOpen = open; }
  export function getSidebarOpen() { return workspace.sidebarOpen; }
  export function isSelected(category: string, id: string) { return workspace.selections[category] === id; }
  
  // Enhanced selection management for breadcrumbs
  export function getAllSelections() { return { ...workspace.selections }; }
  export function hasAnySelection() { return Object.values(workspace.selections).some(v => v !== null); }
  export function getCurrentSelectionInfo(): { category: string; id: string } | null {
    const categories = ['file', 'script', 'schema', 'config-package', 'result'];
    for (const category of categories) {
      const id = workspace.selections[category];
      if (id) return { category, id };
    }
    return null;
  }
</script>
