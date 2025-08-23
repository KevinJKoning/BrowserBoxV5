<script lang="ts">
  import { Button } from "@ui/button";
  import * as Sidebar from "@ui/sidebar";
  import { Badge } from "@ui/badge";
  import { cn } from "@utils/generic.ts";
  import UploadIcon from "@lucide/svelte/icons/upload";
  import PackageIcon from "@lucide/svelte/icons/package";
  import XIcon from "@lucide/svelte/icons/x";
  import CheckIcon from "@lucide/svelte/icons/check";
  import {
    activePackages,
    selectPackage,
    isPackageSelected,
    getPackageStats,
    loadConfigurationPackage,
    clearMessages,
    getIsLoading,
    refreshActivePackages,
    activatePackage,
    isPackageActive
  } from "../store.svelte";
  import { onMount } from 'svelte';

  let fileInput: HTMLInputElement;
  let searchQuery = $state("");
  const isLoading = $derived(getIsLoading());

  // Filter packages based on search
  const filteredPackages = $derived.by(() => {
    if (!searchQuery.trim()) return activePackages;
    
    const query = searchQuery.toLowerCase().trim();
    return activePackages.filter(pkg => 
      pkg.name.toLowerCase().includes(query) ||
      pkg.version.toLowerCase().includes(query) ||
      (pkg.description && pkg.description.toLowerCase().includes(query))
    );
  });

  async function handleQuickUpload() {
    fileInput?.click();
  }

  async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (!file) return;
    
    try {
      await loadConfigurationPackage(file);
      target.value = '';
    } catch (error) {
      // Error handled in store
    }
  }

  function handlePackageSelect(pkg: any) {
    const packageKey = pkg.name + pkg.version;
    if (isPackageSelected(pkg)) {
      selectPackage(null);
    } else {
      selectPackage(packageKey);
    }
  }

  async function handlePackageActivate(pkg: any, event: Event) {
    event.stopPropagation(); // Prevent card selection
    try {
      await activatePackage(pkg);
    } catch (error) {
      // Error handling is done in the store
      console.error('Failed to activate package:', error);
    }
  }

  // Initialize packages on mount
  onMount(() => {
    refreshActivePackages();
  });
</script>

<!-- Hidden file input -->
<input
  bind:this={fileInput}
  type="file"
  accept=".zip"
  onchange={handleFileUpload}
  class="hidden"
/>

<Sidebar.Header class="gap-3.5 border-b p-4 min-w-0">
  <div class="flex w-full items-center justify-between min-w-0">
    <div class="text-foreground text-base font-medium truncate">
      Configuration
    </div>
    <Button
      size="sm"
      variant="outline"
      class="text-xs h-7"
      onclick={handleQuickUpload}
      disabled={isLoading}
    >
      <UploadIcon class="size-3 mr-1" />
      Load
    </Button>
  </div>
  <div class="relative min-w-0">
    <Sidebar.Input 
      bind:value={searchQuery} 
      placeholder="Search packages..." 
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
        Found {filteredPackages.length} package{filteredPackages.length === 1 ? '' : 's'} matching "{searchQuery}"
      </div>
    {/if}
    
    <Sidebar.GroupContent class="space-y-3 px-2 py-2">
      {#if filteredPackages.length === 0}
        <div class="text-center py-8 text-muted-foreground">
          <div class="text-6xl mb-4">📦</div>
          <p class="text-sm">
            {#if searchQuery.trim()}
              No packages match your search
            {:else}
              No configuration packages loaded
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
            <p class="text-xs mt-2">Upload a ZIP package to get started</p>
          {/if}
        </div>
      {:else}
        {#each filteredPackages as pkg (pkg.name + pkg.version)}
          {@const stats = getPackageStats(pkg)}
          {@const selected = isPackageSelected(pkg)}
          <button
            onclick={() => handlePackageSelect(pkg)}
            class={cn(
              "flex flex-col gap-3 rounded-lg border p-4 transition-all w-full text-left",
              "border-border bg-card hover:bg-muted/50",
              "cursor-pointer hover:shadow-md hover:scale-[1.02]",
              selected && "ring-2 ring-blue-500/80 ring-offset-2 shadow-lg drop-shadow-sm"
            )}
          >
            <!-- Header with status -->
            <div class="flex items-center justify-between min-w-0">
              <div class="flex items-center gap-2 min-w-0 flex-1">
                <PackageIcon class="size-4 text-muted-foreground" />
                <span class="font-medium text-sm truncate">{pkg.name}</span>
              </div>
              <Badge 
                variant={isPackageActive(pkg) ? "default" : pkg.isValid ? "secondary" : "destructive"} 
                class="flex-shrink-0"
              >
                {isPackageActive(pkg) ? "Active" : pkg.isValid ? "Valid" : "Invalid"}
              </Badge>
            </div>

            <!-- Description -->
            {#if pkg.description}
              <p class="text-xs text-muted-foreground line-clamp-2">{pkg.description}</p>
            {/if}

            <!-- Package details -->
            <div class="space-y-1">
              <div class="text-xs">
                <span class="font-medium">Version:</span>
                {pkg.version}
              </div>
              <div class="flex gap-2 text-xs">
                {#if stats.files > 0}
                  <Badge variant="secondary" class="text-xs">
                    {stats.files} files
                  </Badge>
                {/if}
                {#if stats.scripts > 0}
                  <Badge variant="secondary" class="text-xs">
                    {stats.scripts} scripts
                  </Badge>
                {/if}
                {#if stats.schemas > 0}
                  <Badge variant="secondary" class="text-xs">
                    {stats.schemas} schemas
                  </Badge>
                {/if}
              </div>
            </div>

            <!-- Actions -->
            <div class="flex gap-2 mt-2">
              <Button
                size="sm"
                variant="outline"
                class="flex-1 text-xs h-7"
                onclick={(e) => handlePackageActivate(pkg, e)}
                disabled={isLoading}
              >
                <CheckIcon class="size-3 mr-1" />
                Activate
              </Button>
            </div>
          </button>
        {/each}
      {/if}
    </Sidebar.GroupContent>
  </Sidebar.Group>
</Sidebar.Content>