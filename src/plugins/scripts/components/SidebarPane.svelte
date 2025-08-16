<script lang="ts">
  import { Button } from "../../../lib/components/ui/button/index.js";
  import * as Sidebar from "../../../lib/components/ui/sidebar/index.js";
  import ScriptCard from "./ScriptCard.svelte";
  import PlayIcon from "@lucide/svelte/icons/play";
  import XIcon from "@lucide/svelte/icons/x";
  import FileIcon from "@lucide/svelte/icons/file";
  import { 
    availableScripts, 
    startExecution, 
    selectScript, 
    getExecution, 
    getExecutionStatus, 
    isScriptSelected 
  } from "../store.svelte";

  let searchQuery = $state("");

  // Filter scripts based on search
  const filteredScripts = $derived.by(() => {
    let scripts = availableScripts;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      scripts = scripts.filter(script => 
        script.title.toLowerCase().includes(query) ||
        script.description.toLowerCase().includes(query) ||
        script.filename.toLowerCase().includes(query) ||
        (script.category && script.category.toLowerCase().includes(query))
      );
    }
    
    return scripts;
  });

  async function handleRunAll() {
    const scriptsToRun = filteredScripts.filter(script => 
      getExecutionStatus(script.id) !== "running"
    );
    
    for (const script of scriptsToRun) {
      try {
        await startExecution(script.id);
        
        // Wait for completion before starting next
        while (getExecutionStatus(script.id) === "running") {
          await new Promise(resolve => setTimeout(resolve, 500));
        }
      } catch (error) {
        console.error(`Failed to execute script ${script.id}:`, error);
      }
    }
  }

  function handleScriptRun(scriptId: string) {
    startExecution(scriptId);
  }

  function handleScriptPreview(scriptId: string) {
    selectScript(scriptId);
  }
</script>

<Sidebar.Header class="gap-3.5 border-b p-4 min-w-0">
  <div class="flex w-full items-center justify-between min-w-0">
    <div class="text-foreground text-base font-medium truncate">
      Scripts
    </div>
    <Button
      size="sm"
      variant="outline"
      class="text-xs h-7"
      onclick={handleRunAll}
      disabled={filteredScripts.length === 0 || filteredScripts.some(script => getExecutionStatus(script.id) === "running")}
    >
      <PlayIcon class="size-3 mr-1" />
      Run All
    </Button>
  </div>
  <div class="relative min-w-0">
    <Sidebar.Input 
      bind:value={searchQuery} 
      placeholder="Search scripts..." 
      class="pr-8 w-full"
    />
    {#if searchQuery.trim()}
      <button
        onclick={() => searchQuery = ""}
        class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-sidebar-accent transition-colors"
        title="Clear search"
      >
        <XIcon class="size-3 text-muted-foreground" />
      </button>
    {/if}
  </div>
</Sidebar.Header>

<Sidebar.Content class="min-w-0 overflow-y-auto">
  <Sidebar.Group class="px-2 min-w-0">
    {#if searchQuery.trim()}
      <div class="text-xs text-muted-foreground mb-3 px-1">
        Found {filteredScripts.length} script{filteredScripts.length === 1 ? '' : 's'} matching "{searchQuery}"
      </div>
    {/if}
    <Sidebar.GroupContent class="space-y-4 px-2 py-2">
      {#if filteredScripts.length === 0}
        <div class="text-center py-8 text-muted-foreground">
          <FileIcon class="size-8 mx-auto mb-2 opacity-50" />
          <p class="text-sm">
            {#if searchQuery.trim()}
              No scripts match your search
            {:else}
              No scripts available
            {/if}
          </p>
          {#if searchQuery.trim()}
            <button 
              onclick={() => searchQuery = ""} 
              class="text-xs text-primary hover:underline mt-2"
            >
              Clear search
            </button>
          {/if}
        </div>
      {:else}
        {#each filteredScripts as script (script.id)}
          {@const execution = getExecution(script.id)}
          <ScriptCard
            id={script.id}
            title={script.title}
            description={script.description}
            filename={script.filename}
            status={getExecutionStatus(script.id)}
            executionTime={execution?.executionTime}
            lastRun={execution?.lastRun}
            isSelected={isScriptSelected(script.id)}
            onRun={() => handleScriptRun(script.id)}
            onPreview={() => handleScriptPreview(script.id)}
          />
        {/each}
      {/if}
    </Sidebar.GroupContent>
  </Sidebar.Group>
</Sidebar.Content>