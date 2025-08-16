<script lang="ts">
  import { setContext, onMount } from "svelte";
  import * as Sidebar from "../../lib/components/ui/sidebar/index.js";
  import SidebarHost from "./SidebarHost.svelte";
  import PluginHost from "./PluginHost.svelte";
  import { pythonExecutor } from "../pyodide/executor.js";
  import { workspace, activatePlugin } from "../state/workspace.svelte";
  import { getAllPlugins, initializePlugins } from "../state/plugin-registry.svelte";
  import { initializeBuiltinPreviews } from "../services/preview/registry.svelte";
  import { loadLegacyConfig } from "../config-runtime/loader";

  // Provide shared services to the component tree
  setContext("executor", pythonExecutor);
  setContext("workspace", { workspace, activatePlugin });

  // Initialize plugins on mount
  onMount(async () => {
    await initializePlugins();
    initializeBuiltinPreviews();
    
    // Load legacy configuration into dynamic stores
    await loadLegacyConfig();
    
    // Activate first plugin if none selected
    if (!workspace.activePluginId && getAllPlugins().length > 0) {
      activatePlugin(getAllPlugins()[0].id);
    }
  });
</script>

<div class="app h-screen flex">
  <Sidebar.Provider style="--sidebar-width: 400px;">
    <SidebarHost />
    <Sidebar.Inset>
      <PluginHost class="flex-1" />
    </Sidebar.Inset>
  </Sidebar.Provider>
</div>