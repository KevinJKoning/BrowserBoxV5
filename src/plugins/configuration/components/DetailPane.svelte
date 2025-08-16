<script lang="ts">
  import { 
    loadConfigurationPackage, 
    clearMessages, 
    getSelectedPackage, 
    getPackageStats,
    activePackages,
    getIsLoading,
    getLoadingMessage,
    getErrorMessage,
    getSuccessMessage,
    refreshActivePackages
  } from "../store.svelte";
  import { onMount } from 'svelte';
  import type { ConfigPackage } from "@core/config-runtime/loader";
  import { Button } from "@ui/button";
  import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
  import { Badge } from "@ui/badge";
  import { Separator } from "@ui/separator";
  import FileUpIcon from "@lucide/svelte/icons/file-up";
  import LoaderIcon from "@lucide/svelte/icons/loader";
  import CheckCircleIcon from "@lucide/svelte/icons/check-circle";
  import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
  import PackageIcon from "@lucide/svelte/icons/package";
  import FileIcon from "@lucide/svelte/icons/file";
  import CodeIcon from "@lucide/svelte/icons/code";
  import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";

  let fileInput: HTMLInputElement | undefined = $state();
  const selectedPackage = $derived(getSelectedPackage());
  const isLoading = $derived(getIsLoading());
  const loadingMessage = $derived(getLoadingMessage());
  const errorMessage = $derived(getErrorMessage());
  const successMessage = $derived(getSuccessMessage());

  async function handleFileUpload(event: Event) {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];
    
    if (!file) return;
    
    try {
      await loadConfigurationPackage(file);
      // Clear the file input
      target.value = '';
    } catch (error) {
      // Error is already handled in the store
    }
  }

  function handleUploadClick() {
    fileInput?.click();
  }

  // Initialize packages on mount
  onMount(() => {
    refreshActivePackages();
  });
</script>

{#if selectedPackage}
  <!-- Package Details View -->
  <div class="h-full min-h-0 overflow-auto">
    <div class="p-6 space-y-6">
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl font-bold">{selectedPackage.name}</h1>
          <p class="text-muted-foreground">Version {selectedPackage.version}</p>
          {#if selectedPackage.description}
            <p class="text-sm text-muted-foreground mt-2">{selectedPackage.description}</p>
          {/if}
        </div>
        <Badge variant={selectedPackage.isValid ? "default" : "destructive"}>
          {selectedPackage.isValid ? "Valid" : "Invalid"}
        </Badge>
      </div>

      <!-- Package Stats -->
      {#if selectedPackage}
        {@const stats = getPackageStats(selectedPackage)}
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent class="p-4 text-center">
            <FileIcon class="size-8 mx-auto mb-2 text-muted-foreground" />
            <div class="text-2xl font-bold">{stats.files}</div>
            <div class="text-xs text-muted-foreground">Files</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="p-4 text-center">
            <CodeIcon class="size-8 mx-auto mb-2 text-muted-foreground" />
            <div class="text-2xl font-bold">{stats.scripts}</div>
            <div class="text-xs text-muted-foreground">Scripts</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="p-4 text-center">
            <ShieldCheckIcon class="size-8 mx-auto mb-2 text-muted-foreground" />
            <div class="text-2xl font-bold">{stats.schemas}</div>
            <div class="text-xs text-muted-foreground">Schemas</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent class="p-4 text-center">
            <PackageIcon class="size-8 mx-auto mb-2 text-muted-foreground" />
            <div class="text-2xl font-bold">{stats.plugins}</div>
            <div class="text-xs text-muted-foreground">Plugins</div>
          </CardContent>
        </Card>
        </div>
      {/if}

      <!-- Package Contents -->
      <div class="space-y-6">
        {#if selectedPackage.files?.length}
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <FileIcon class="size-5" />
                File Requirements ({selectedPackage.files.length})
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              {#each selectedPackage.files as file (file.id)}
                <div class="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div class="font-medium">{file.title}</div>
                    <div class="text-sm text-muted-foreground">{file.defaultFilename}</div>
                    <div class="text-xs text-muted-foreground">{file.description}</div>
                  </div>
                  <div class="text-right">
                    <Badge variant={file.required ? "default" : "secondary"}>
                      {file.required ? "Required" : "Optional"}
                    </Badge>
                    {#if file.acceptedTypes?.length}
                      <div class="text-xs text-muted-foreground mt-1">
                        {file.acceptedTypes.join(", ")}
                      </div>
                    {/if}
                  </div>
                </div>
              {/each}
            </CardContent>
          </Card>
        {/if}

        {#if selectedPackage.scripts?.length}
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <CodeIcon class="size-5" />
                Scripts ({selectedPackage.scripts.length})
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              {#each selectedPackage.scripts as script (script.id)}
                <div class="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div class="font-medium">{script.title}</div>
                    <div class="text-sm text-muted-foreground">{script.filename}</div>
                    <div class="text-xs text-muted-foreground">{script.description}</div>
                  </div>
                  <div class="text-right">
                    {#if script.category}
                      <Badge variant="outline">{script.category}</Badge>
                    {/if}
                  </div>
                </div>
              {/each}
            </CardContent>
          </Card>
        {/if}

        {#if selectedPackage.schemas?.length}
          <Card>
            <CardHeader>
              <CardTitle class="flex items-center gap-2">
                <ShieldCheckIcon class="size-5" />
                Schema Validations ({selectedPackage.schemas.length})
              </CardTitle>
            </CardHeader>
            <CardContent class="space-y-3">
              {#each selectedPackage.schemas as schema (schema.id)}
                <div class="flex items-center justify-between p-3 border rounded-md">
                  <div>
                    <div class="font-medium">{schema.title}</div>
                    <div class="text-sm text-muted-foreground">{schema.filename}</div>
                    <div class="text-xs text-muted-foreground">{schema.description}</div>
                  </div>
                  <div class="text-right">
                    {#if schema.category}
                      <Badge variant="outline">{schema.category}</Badge>
                    {/if}
                  </div>
                </div>
              {/each}
            </CardContent>
          </Card>
        {/if}
      </div>
    </div>
  </div>
{:else}
  <!-- Configuration Management Main View -->
  <div class="h-full min-h-0 overflow-auto">
    <div class="p-6 space-y-6">
      <div>
        <h1 class="text-2xl font-bold mb-2">Configuration Management</h1>
        <p class="text-muted-foreground">
          Manage configuration packages that define file requirements, analysis scripts, and schema validations.
        </p>
      </div>

      <!-- Upload Section -->
      <Card>
        <CardHeader>
          <CardTitle class="flex items-center gap-2">
            <PackageIcon class="size-5" />
            Load Configuration Package
          </CardTitle>
        </CardHeader>
        <CardContent class="space-y-4">
          <p class="text-sm text-muted-foreground">
            Upload a ZIP configuration package to replace the current file requirements, scripts, and schema validations.
          </p>
          
          <!-- Hidden file input -->
          <input
            bind:this={fileInput}
            type="file"
            accept=".zip"
            onchange={handleFileUpload}
            class="hidden"
          />
          
          <!-- Upload button -->
          <Button 
            onclick={handleUploadClick}
            disabled={isLoading}
            class="w-full"
          >
            {#if isLoading}
              <LoaderIcon class="size-4 mr-2 animate-spin" />
              {loadingMessage || 'Loading...'}
            {:else}
              <FileUpIcon class="size-4 mr-2" />
              Select Configuration Package (ZIP)
            {/if}
          </Button>

          <!-- Messages -->
          {#if errorMessage}
            <div class="flex items-start gap-2 p-3 text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md">
              <AlertCircleIcon class="size-4 mt-0.5 flex-shrink-0" />
              <div class="flex-1">{errorMessage}</div>
              <Button variant="ghost" size="sm" onclick={clearMessages}>×</Button>
            </div>
          {/if}

          {#if successMessage}
            <div class="flex items-start gap-2 p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
              <CheckCircleIcon class="size-4 mt-0.5 flex-shrink-0" />
              <div class="flex-1">{successMessage}</div>
              <Button variant="ghost" size="sm" onclick={clearMessages}>×</Button>
            </div>
          {/if}
        </CardContent>
      </Card>

      <!-- Help Section -->
      <Card>
        <CardHeader>
          <CardTitle>Package Structure</CardTitle>
        </CardHeader>
        <CardContent class="text-sm text-muted-foreground space-y-2">
          <p><strong>Expected ZIP structure:</strong></p>
          <ul class="list-disc list-inside ml-4 space-y-1">
            <li><code>package.json</code> - Package metadata (name, version, description)</li>
            <li><code>files/requirements.json</code> - File requirement definitions</li>
            <li><code>scripts/*.py + scripts/metadata.json</code> - Python analysis scripts</li>
            <li><code>schemas/*.py + schemas/metadata.json</code> - Schema validation scripts</li>
            <li><code>plugins/</code> - Future plugin definitions (optional)</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  </div>
{/if}