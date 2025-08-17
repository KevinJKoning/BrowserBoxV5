/**
 * Breadcrumb Utilities
 * Provides enhanced breadcrumb functionality with selection resolution and navigation
 */

import { getActivePluginId, getSelection, select, activatePlugin } from "@core/state/workspace.svelte";
import { getAllPlugins } from "@core/state/plugin-registry.svelte";

export interface BreadcrumbItem {
  label: string;
  isClickable: boolean;
  onClick?: () => void;
  icon?: any;
}

export interface SelectionResolver {
  getDisplayName: (id: string) => string | null;
  getIcon?: (id: string) => any;
  getStatus?: (id: string) => string;
}

// Registry of selection resolvers by category
const selectionResolvers = new Map<string, SelectionResolver>();

/**
 * Register a selection resolver for a specific category
 */
export function registerSelectionResolver(category: string, resolver: SelectionResolver) {
  selectionResolvers.set(category, resolver);
}

/**
 * Get display name for a selection
 */
export function getSelectionDisplayName(category: string, id: string): string {
  const resolver = selectionResolvers.get(category);
  if (resolver) {
    const displayName = resolver.getDisplayName(id);
    if (displayName) return displayName;
  }
  
  // Fallback to formatted category and ID
  return `${formatCategoryName(category)}: ${id}`;
}

/**
 * Format technical category names to user-friendly display names
 */
export function formatCategoryName(category: string): string {
  const categoryMap: Record<string, string> = {
    'file': 'File',
    'script': 'Script', 
    'schema': 'Schema',
    'config-package': 'Configuration',
    'result': 'Result'
  };
  
  return categoryMap[category] || category;
}

/**
 * Get current active selection across all categories
 */
export function getCurrentSelection(): { category: string; id: string } | null {
  const categories = ['file', 'script', 'schema', 'config-package', 'result'];
  
  for (const category of categories) {
    const id = getSelection(category);
    if (id) {
      return { category, id };
    }
  }
  
  return null;
}

/**
 * Navigate to application root (dashboard)
 */
export function navigateToRoot() {
  // Clear all selections and plugin
  const categories = ['file', 'script', 'schema', 'config-package', 'result'];
  categories.forEach(category => select(category, null));
  activatePlugin(null);
}

/**
 * Navigate to plugin overview (clear item selections but keep plugin active)
 */
export function navigateToPlugin(pluginId: string) {
  // Clear all item selections but keep plugin active
  const categories = ['file', 'script', 'schema', 'config-package', 'result'];
  categories.forEach(category => select(category, null));
  
  // Ensure plugin is active
  if (getActivePluginId() !== pluginId) {
    activatePlugin(pluginId);
  }
}

/**
 * Generate breadcrumb items for current application state
 */
export function generateBreadcrumbs(): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // 1. Application root
  breadcrumbs.push({
    label: 'BrowserBox',
    isClickable: true,
    onClick: navigateToRoot
  });
  
  // 2. Current plugin
  const activePluginId = getActivePluginId();
  if (activePluginId) {
    const plugin = getAllPlugins().find(p => p.id === activePluginId);
    if (plugin) {
      breadcrumbs.push({
        label: plugin.title,
        isClickable: true,
        onClick: () => navigateToPlugin(activePluginId)
      });
    }
  }
  
  // 3. Current selection (if any)
  const currentSelection = getCurrentSelection();
  if (currentSelection) {
    const { category, id } = currentSelection;
    const displayName = getSelectionDisplayName(category, id);
    
    breadcrumbs.push({
      label: displayName,
      isClickable: false // Current page, not clickable
    });
  } else if (activePluginId) {
    // Plugin is active but no selection - show "Overview"
    breadcrumbs.push({
      label: 'Overview',
      isClickable: false
    });
  }
  
  return breadcrumbs;
}

/**
 * Handle breadcrumb link click with fallback behavior
 */
export function handleBreadcrumbClick(item: BreadcrumbItem) {
  if (item.isClickable && item.onClick) {
    try {
      item.onClick();
    } catch (error) {
      console.error('Breadcrumb navigation error:', error);
      // Fallback to root navigation
      navigateToRoot();
    }
  }
}

/**
 * Validate breadcrumb state consistency
 */
export function validateBreadcrumbState(): { isValid: boolean; issues: string[] } {
  const issues: string[] = [];
  const activePluginId = getActivePluginId();
  
  // Check if plugin exists
  if (activePluginId) {
    const plugin = getAllPlugins().find(p => p.id === activePluginId);
    if (!plugin) {
      issues.push(`Active plugin '${activePluginId}' not found in registry`);
    }
  }
  
  // Check for orphaned selections
  const selection = getCurrentSelection();
  if (selection && !activePluginId) {
    issues.push(`Selection '${selection.category}:${selection.id}' exists without active plugin`);
  }
  
  // Check for multiple selections (should not happen with proper state management)
  const categories = ['file', 'script', 'schema', 'config-package', 'result'];
  const activeSelections = categories.filter(cat => getSelection(cat) !== null);
  if (activeSelections.length > 1) {
    issues.push(`Multiple selections active: ${activeSelections.join(', ')}`);
  }
  
  return {
    isValid: issues.length === 0,
    issues
  };
}