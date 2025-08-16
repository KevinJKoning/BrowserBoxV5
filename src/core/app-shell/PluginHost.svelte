<script lang="ts">
  import * as Breadcrumb from "../../lib/components/ui/breadcrumb/index.js";
  import * as Sidebar from "../../lib/components/ui/sidebar/index.js";
  import { Separator } from "../../lib/components/ui/separator/index.js";
  import { getAllPlugins } from "../state/plugin-registry.svelte.js";
  import { workspace, getSelection } from "../state/workspace.svelte.js";

  let { class: className, ...restProps } = $props();

  let currentPlugin = $derived(getAllPlugins().find(p => p.id === workspace.activePluginId));
  let MainComponent = $state<any>(null);

  // Load main component when plugin changes
  $effect(async () => {
    if (currentPlugin) {
      try {
        const module = await currentPlugin.main();
        MainComponent = module.default || module;
      } catch (error) {
        console.error(`Failed to load main component for plugin ${currentPlugin.id}:`, error);
        MainComponent = null;
      }
    } else {
      MainComponent = null;
    }
  });

  // Get current selection context for breadcrumbs
  const currentSelection = $derived(() => {
    const fileId = getSelection('file');
    const schemaId = getSelection('schema');
    const scriptId = getSelection('script');
    const resultId = getSelection('result');
    
    if (fileId) return { type: 'file', id: fileId };
    if (schemaId) return { type: 'schema', id: schemaId };
    if (scriptId) return { type: 'script', id: scriptId };
    if (resultId) return { type: 'result', id: resultId };
    return null;
  });
</script>

<div class={className} {...restProps}>
  <header class="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
    <Sidebar.Trigger class="-ml-1" />
    <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
    <Breadcrumb.Root>
      <Breadcrumb.List>
        <Breadcrumb.Item class="hidden md:block">
          <Breadcrumb.Link href="#">BrowserBoxV5</Breadcrumb.Link>
        </Breadcrumb.Item>
        <Breadcrumb.Separator class="hidden md:block" />
        <Breadcrumb.Item class="hidden md:block">
          <Breadcrumb.Link href="#">
            {currentPlugin?.title || 'Dashboard'}
          </Breadcrumb.Link>
        </Breadcrumb.Item>
        {#if currentSelection}
          <Breadcrumb.Separator class="hidden md:block" />
          <Breadcrumb.Item>
            <Breadcrumb.Page>{currentSelection.type}: {currentSelection.id}</Breadcrumb.Page>
          </Breadcrumb.Item>
        {:else}
          <Breadcrumb.Separator class="hidden md:block" />
          <Breadcrumb.Item>
            <Breadcrumb.Page>Dashboard</Breadcrumb.Page>
          </Breadcrumb.Item>
        {/if}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  </header>
  
  <div class="flex flex-1 flex-col gap-4 p-4 max-h-[calc(100vh-5rem)] min-h-0 overflow-hidden">
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
              {#each getAllPlugins() as plugin}
                <li>{plugin.title} - Click the icon in the sidebar to get started</li>
              {/each}
            </ul>
          </div>
        </div>
      </div>
    {/if}
  </div>
</div>