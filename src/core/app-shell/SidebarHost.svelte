<script lang="ts">
  import * as Sidebar from "../../lib/components/ui/sidebar/index.js";
  import { getAllPlugins } from "../state/plugin-registry.svelte";
  import { workspace, activatePlugin } from "../state/workspace.svelte";
  import type { ComponentType } from 'svelte';

  let currentPlugin = $derived(getAllPlugins().find(p => p.id === workspace.activePluginId));
  // Dynamic sidebar component
  let SidebarComponent = $state<ComponentType | null>(null);

  // Load sidebar component when plugin changes
  $effect(() => {
    if (!currentPlugin) {
      SidebarComponent = null;
      return;
    }
  void (async () => {
      try {
        const mod = await currentPlugin.sidebar();
        // Support both ESM default export objects and direct component returns
        let comp: unknown = mod;
        if (comp && typeof comp === 'object' && 'default' in (comp as Record<string, unknown>)) {
          comp = (comp as { default: unknown }).default;
        }
        SidebarComponent = comp as ComponentType;
      } catch (error) {
        console.error(`Failed to load sidebar for plugin ${currentPlugin.id}:`, error);
        SidebarComponent = null;
      }
    })();
  });

  function handlePluginSelect(pluginId: string) {
    activatePlugin(pluginId);
  }
</script>

<Sidebar.Root
  collapsible="icon"
  class="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
>
  <!-- Icon sidebar -->
  <Sidebar.Root collapsible="none" class="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r overflow-visible">
    <Sidebar.Content>
      <Sidebar.Group>
        <Sidebar.GroupContent class="px-1.5 md:px-0 pb-2">
          <Sidebar.Menu>
            {#each getAllPlugins() as plugin (plugin.id)}
              <Sidebar.MenuItem>
                <Sidebar.MenuButton
                  tooltipContentProps={{ hidden: false }}
                  onclick={() => handlePluginSelect(plugin.id)}
                  isActive={workspace.activePluginId === plugin.id}
                  class="px-2.5 md:px-2"
                >
                  {#snippet tooltipContent()}
                    {plugin.title}
                  {/snippet}
                  {#if plugin.icon}
                    <plugin.icon />
                  {:else}
                    <div class="w-4 h-4 bg-gray-400 rounded"></div>
                  {/if}
                  <span>{plugin.title}</span>
                </Sidebar.MenuButton>
              </Sidebar.MenuItem>
            {/each}
          </Sidebar.Menu>
        </Sidebar.GroupContent>
      </Sidebar.Group>
    </Sidebar.Content>
  </Sidebar.Root>

  <!-- Content sidebar -->
  <Sidebar.Root collapsible="none" class="hidden flex-1 md:flex min-w-0 max-w-full overflow-hidden">
    {#if SidebarComponent}
      <SidebarComponent />
    {:else}
      <Sidebar.Content class="flex items-center justify-center">
        <div class="text-center text-muted-foreground">
          <div class="text-4xl mb-2">⚙️</div>
          <p>Loading plugin...</p>
        </div>
      </Sidebar.Content>
    {/if}
  </Sidebar.Root>
</Sidebar.Root>