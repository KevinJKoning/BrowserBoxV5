<script module lang="ts">
  /**
   * Plugin Registry - Central plugin discovery and management (rune processed via .svelte module)
   */
  import type { ComponentType } from 'svelte';

  export interface PluginDefinition {
    id: string;
    title: string;
    order?: number;
    icon?: ComponentType;
    sidebar: () => Promise<{ default: ComponentType }> | ComponentType;
    main: () => Promise<{ default: ComponentType }> | ComponentType;
    init?: () => Promise<void> | void;
    dispose?: () => void;
    capabilities?: string[];
  }

  // Rune state
  const pluginList = $state<PluginDefinition[]>([]);

  export function setPlugins(list: PluginDefinition[]) {
    pluginList.length = 0;
    list
      .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
      .forEach(p => pluginList.push(p));
  }

  export function getAllPlugins(): PluginDefinition[] {
    return pluginList;
  }

  export async function discoverPlugins(): Promise<PluginDefinition[]> {
    const modules = import.meta.glob('../../plugins/*/index.ts') as Record<string, () => Promise<{ default: PluginDefinition }>>;
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

  export async function initializePlugins() {
    const discovered = await discoverPlugins();
    setPlugins(discovered);
    for (const plugin of pluginList) {
      try { await plugin.init?.(); } catch (e) { console.warn(`Failed to init plugin ${plugin.id}`, e); }
    }
  }

  export function getPlugin(id: string) { return pluginList.find(p => p.id === id); }
  export function hasCapability(pluginId: string, capability: string) { return getPlugin(pluginId)?.capabilities?.includes(capability) ?? false; }
</script>
