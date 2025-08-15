<script lang="ts">
  import { Button } from "../../../lib/components/ui/button/index.js";
  import * as Sidebar from "../../../lib/components/ui/sidebar/index.js";
  import FileCard from "../../../lib/components/file-card.svelte";
  import FolderUpIcon from "@lucide/svelte/icons/folder-up";
  import XIcon from "@lucide/svelte/icons/x";
  import { fileRequirements } from "../../../lib/config/file-config.js";
  import { loadFile, loadFilesFromFolder, removeFile, selectFile, getFile, getUploadState } from "../store.js";

  let searchQuery = $state("");

  // Filter files based on search
  const filteredFiles = $derived.by(() => {
    let files = fileRequirements;
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      files = files.filter(file => 
        file.title.toLowerCase().includes(query) ||
        file.description.toLowerCase().includes(query) ||
        file.defaultFilename.toLowerCase().includes(query)
      );
    }
    
    return files;
  });

  // Handle individual file upload
  async function handleUpload(fileId: string) {
    const input = document.createElement('input');
    input.type = 'file';
    
    const requirement = fileRequirements.find(req => req.id === fileId);
    input.accept = requirement?.acceptedTypes?.join(',') || '.parquet,.csv,.gpkg';
    
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        try {
          await loadFile(fileId, file);
        } catch (error) {
          console.error('File loading failed:', error);
        }
      }
    };
    
    input.click();
  }

  // Handle folder upload
  async function handleUploadAll() {
    const input = document.createElement('input');
    input.type = 'file';
    input.webkitdirectory = true;
    input.multiple = true;
    input.accept = '.parquet,.csv,.gpkg';
    
    input.onchange = async (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      if (files.length > 0) {
        try {
          const result = await loadFilesFromFolder(files);
          
          if (result.matched > 0) {
            console.log(`Successfully uploaded ${result.matched} out of ${result.total} files.`);
          }
          if (result.errors.length > 0) {
            console.warn('Some files failed to upload:', result.errors);
          }
          if (result.matched === 0 && result.total > 0) {
            console.warn(`Found ${result.total} files but none matched expected filenames.`);
          }
        } catch (error) {
          console.error('Folder upload failed:', error);
        }
      }
    };
    
    input.click();
  }

  function handlePreview(fileId: string) {
    selectFile(fileId);
  }

  function handleRemove(fileId: string) {
    removeFile(fileId);
  }
</script>

<Sidebar.Header class="gap-3.5 border-b p-4 min-w-0">
  <div class="flex w-full items-center justify-between min-w-0">
    <div class="text-foreground text-base font-medium truncate">
      Required Files
    </div>
    <Button
      size="sm"
      variant="outline"
      class="text-xs h-7"
      onclick={handleUploadAll}
      disabled={filteredFiles.length === 0}
    >
      <FolderUpIcon class="size-3 mr-1" />
      Upload All
    </Button>
  </div>
  <div class="relative min-w-0">
    <Sidebar.Input 
      bind:value={searchQuery} 
      placeholder="Search files..." 
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
        Found {filteredFiles.length} file{filteredFiles.length === 1 ? '' : 's'} matching "{searchQuery}"
      </div>
    {/if}
    <Sidebar.GroupContent class="space-y-4 px-2 py-2">
      {#if filteredFiles.length === 0}
        <div class="text-center py-8 text-muted-foreground">
          <div class="text-6xl mb-4">📁</div>
          <p class="text-sm">
            {#if searchQuery.trim()}
              No files match your search
            {:else}
              No files available
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
        {#each filteredFiles as fileReq (fileReq.id)}
          {@const uploadedFile = getFile(fileReq.id)}
          {@const uploadState = getUploadState(fileReq.id)}
          <FileCard
            id={fileReq.id}
            title={fileReq.title}
            description={fileReq.description}
            defaultFilename={fileReq.defaultFilename}
            status={uploadState}
            uploadedFilename={uploadedFile?.filename}
            fileSize={uploadedFile?.size}
            uploadedAt={uploadedFile?.uploadedAt}
            wasRenamed={uploadedFile?.wasRenamed}
            onUpload={() => handleUpload(fileReq.id)}
            onRemove={() => handleRemove(fileReq.id)}
            onPreview={() => handlePreview(fileReq.id)}
          />
        {/each}
      {/if}
    </Sidebar.GroupContent>
  </Sidebar.Group>
</Sidebar.Content>