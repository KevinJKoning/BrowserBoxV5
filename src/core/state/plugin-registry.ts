/**
 * Plugin Registry - Central plugin discovery and management
 * Uses Svelte 5 runes for reactive plugin state
 */

import type { ComponentType } from "svelte";

export interface PluginDefinition {
  id: string;
  title: string;
  order?: number;
  icon?: ComponentType;
  sidebar: () => Promise<{ default: ComponentType }> | ComponentType;
  main: () => Promise<{ default: ComponentType }> | ComponentType;
  init?: () => Promise<void> | void;
  dispose?: () => void;
  capabilities?: string[]; // plugin-provided features
}

// Global plugin state using Svelte 5 runes
const pluginList = $state<PluginDefinition[]>([]);

export function setPlugins(list: PluginDefinition[]) {
  pluginList.length = 0;
  list
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .forEach(p => pluginList.push(p));
}

export const allPlugins = $derived(pluginList);

/**
 * Auto-discover plugins from the plugins directory
 * Uses import.meta.glob for dynamic plugin loading
 */
export async function discoverPlugins(): Promise<PluginDefinition[]> {
  // Dynamic import of all plugin index files
  const modules = import.meta.glob("../../plugins/*/index.ts") as Record<
    string,
    () => Promise<{ default: PluginDefinition }>
  >;

  const plugins: PluginDefinition[] = [];
  
  for (const [path, importFn] of Object.entries(modules)) {
    try {
      const module = await importFn();
      plugins.push(module.default);
    } catch (error) {
      console.warn(`Failed to load plugin from ${path}:`, error);
    }
  }

  return plugins;
}

/**
 * Initialize the plugin system
 */
export async function initializePlugins() {
  const discoveredPlugins = await discoverPlugins();
  setPlugins(discoveredPlugins);
  
  // Initialize each plugin
  for (const plugin of allPlugins) {
    try {
      await plugin.init?.();
    } catch (error) {
      console.warn(`Failed to initialize plugin ${plugin.id}:`, error);
    }
  }
}

/**
 * Get plugin by ID
 */
export function getPlugin(id: string): PluginDefinition | undefined {
  return allPlugins.find(p => p.id === id);
}

/**
 * Check if plugin supports a capability
 */
export function hasCapability(pluginId: string, capability: string): boolean {
  const plugin = getPlugin(pluginId);
  return plugin?.capabilities?.includes(capability) ?? false;
}