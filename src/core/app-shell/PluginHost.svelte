<script lang="ts">
  import * as Breadcrumb from "../../lib/components/ui/breadcrumb/index.js";
  import * as Sidebar from "../../lib/components/ui/sidebar/index.js";
  import { Separator } from "../../lib/components/ui/separator/index.js";
  import { getAllPlugins } from "../state/plugin-registry.svelte";
  import { workspace } from "../state/workspace.svelte";
  import { generateBreadcrumbs, handleBreadcrumbClick } from "../../lib/utils/breadcrumbs.js";
  import type { ComponentType } from 'svelte';

  let { class: className, ...restProps } = $props();

  let currentPlugin = $derived(getAllPlugins().find(p => p.id === workspace.activePluginId));
  // Dynamic component loaded from plugin main()
  let MainComponent = $state<ComponentType | null>(null);
  
  // Note: resize handling removed since we're using flexbox layout

  // Load main component when plugin changes
  $effect(() => {
    if (!currentPlugin) {
      MainComponent = null;
      return;
    }
  // fire & forget async loader (explicitly voided to satisfy no-floating-promises)
	void (async () => {
      try {
        const loaded = await currentPlugin.main();
        // Safely extract default export if present
        let comp: ComponentType;
        if (typeof loaded === 'object' && loaded && 'default' in loaded) {
          comp = (loaded as { default: ComponentType }).default;
        } else {
          comp = loaded as ComponentType;
        }
        MainComponent = comp;
      } catch (error) {
        console.error(`Failed to load main component for plugin ${currentPlugin.id}:`, error);
        MainComponent = null;
      }
    })();
  });

  // Generate breadcrumbs based on current state
  const breadcrumbs = $derived(generateBreadcrumbs());
</script>

<div class={"flex flex-col min-h-0 h-full overflow-hidden " + (className ?? '')} {...restProps}>
  <header class="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
    <Sidebar.Trigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {#each breadcrumbs as item, index (index)}
          <Breadcrumb.Item class="hidden md:block">
            {#if item.isClickable}
              <Breadcrumb.Link 
                href="#" 
                onclick={(e) => { e.preventDefault(); handleBreadcrumbClick(item); }}
                class="cursor-pointer hover:text-foreground transition-colors"
              >
                {item.label}
              </Breadcrumb.Link>
            {:else}
              <Breadcrumb.Page>{item.label}</Breadcrumb.Page>
            {/if}
          </Breadcrumb.Item>
          
          {#if index < breadcrumbs.length - 1}
            <Breadcrumb.Separator class="hidden md:block" />
          {/if}
        {/each}
        
        <!-- Fallback for when no breadcrumbs are generated -->
        {#if breadcrumbs.length === 0}
          <Breadcrumb.Item class="hidden md:block">
            <Breadcrumb.Page>BrowserBox</Breadcrumb.Page>
          </Breadcrumb.Item>
        {/if}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </header>
  
  <div class="flex flex-1 flex-col gap-4 p-4 min-h-0 overflow-hidden">
    {#if MainComponent}
      <MainComponent />
    {:else if currentPlugin}
      <div class="flex items-center justify-center h-full">
        <div class="text-center text-muted-foreground">
          <div class="text-4xl mb-2">⚙️</div>
          <p>Loading {currentPlugin.title}...</p>
        </div>
      </div>
    {:else}
      <!-- Default dashboard -->
      <div class="bg-muted/50 flex-1 rounded-xl overflow-auto">
        <div class="p-8">
          <h1 class="text-3xl font-bold mb-4">Welcome to BrowserBoxV5</h1>
          <p class="text-lg text-muted-foreground mb-6">
            A modular file management and analysis platform with Python execution capabilities.
          </p>
          <div class="space-y-4">
            <h2 class="text-xl font-semibold">Available Plugins:</h2>
            <ul class="list-disc list-inside space-y-2 text-muted-foreground">
              {#each getAllPlugins() as plugin (plugin.id)}
                <li>{plugin.title} - Click the icon in the sidebar to get started</li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>