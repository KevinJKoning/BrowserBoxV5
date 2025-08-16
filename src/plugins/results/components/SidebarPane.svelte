<script lang="ts">
  import { Button } from "../../../lib/components/ui/button/index.js";
  import * as Sidebar from "../../../lib/components/ui/sidebar/index.js";
  import ResultCard from "./ResultCard.svelte";
  import DownloadIcon from "@lucide/svelte/icons/download";
  import XIcon from "@lucide/svelte/icons/x";
  import FileIcon from "@lucide/svelte/icons/file";
  import { 
    getAllResults, 
    selectResult, 
    getResultFile, 
    isResultSelected 
  } from "../store.svelte.js";

  let searchQuery = $state("");

  // Filter results based on search
  const filteredResults = $derived.by(() => {
    let results = getAllResults();
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(result => 
        result.filename.toLowerCase().includes(query) ||
        result.fileType.toLowerCase().includes(query) ||
        (result.description && result.description.toLowerCase().includes(query))
      );
    }
    
    return results;
  });

  function handleResultPreview(resultId: string) {
    selectResult(resultId);
  }

  function handleResultDownload(resultId: string) {
    const result = getResultFile(resultId);
    if (!result?.content) {
      console.error('No content available for download:', resultId);
      return;
    }

    // Create a downloadable blob from the content
    const blob = new Blob([result.content], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    
    // Create a temporary download link
    const link = document.createElement('a');
    link.href = url;
    link.download = result.filename;
    link.style.display = 'none';
    
    // Trigger download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up the URL object
    URL.revokeObjectURL(url);
  }

  async function handleDownloadAll() {
    const results = filteredResults;
    if (results.length === 0) {
      console.warn('No results available for download');
      return;
    }

    // Download each file individually
    for (const result of results) {
      if (result.content) {
        try {
          handleResultDownload(result.id);
          // Small delay between downloads to avoid overwhelming the browser
          await new Promise(resolve => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`Failed to download ${result.filename}:`, error);
        }
      } else {
        console.warn(`No content available for ${result.filename}`);
      }
    }
  }
</script>

<Sidebar.Header class="gap-3.5 border-b p-4 min-w-0">
  <div class="flex w-full items-center justify-between min-w-0">
    <div class="text-foreground text-base font-medium truncate">
      Results
    </div>
    <Button
      size="sm"
      variant="outline"
      class="text-xs h-7"
      onclick={handleDownloadAll}
      disabled={filteredResults.length === 0}
    >
      <DownloadIcon class="size-3 mr-1" />
      Download All
    </Button>
  </div>
  <div class="relative min-w-0">
    <Sidebar.Input 
      bind:value={searchQuery} 
      placeholder="Search results..." 
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
        Found {filteredResults.length} result{filteredResults.length === 1 ? '' : 's'} matching "{searchQuery}"
      </div>
    {/if}
    <Sidebar.GroupContent class="space-y-4 px-2 py-2">
      {#if filteredResults.length === 0}
        <div class="text-center py-8 text-muted-foreground">
          <FileIcon class="size-8 mx-auto mb-2 opacity-50" />
          <p class="text-sm">
            {#if searchQuery.trim()}
              No results match your search
            {:else}
              No results available
            {/if}
          </p>
          {#if searchQuery.trim()}
            <button 
              onclick={() => searchQuery = ""} 
              class="text-xs text-primary hover:underline mt-2"
            >
              Clear search
            </button>
          {:else}
            <p class="text-xs text-muted-foreground mt-1">
              Run a script to generate results
            </p>
          {/if}
        </div>
      {:else}
        {#each filteredResults as result (result.id)}
          <ResultCard
            id={result.id}
            filename={result.filename}
            fileType={result.fileType}
            fileSize={result.fileSize}
            createdAt={result.createdAt}
            description={result.description}
            isSelected={isResultSelected(result.id)}
            onPreview={() => handleResultPreview(result.id)}
            onDownload={() => handleResultDownload(result.id)}
          />
        {/each}
      {/if}
    </Sidebar.GroupContent>
  </Sidebar.Group>
</Sidebar.Content>