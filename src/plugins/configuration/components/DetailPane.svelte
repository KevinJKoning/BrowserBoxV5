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
    refreshActivePackages,
    isPackageActive
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
        <Badge variant={isPackageActive(selectedPackage) ? "default" : selectedPackage.isValid ? "secondary" : "destructive"}>
          {isPackageActive(selectedPackage) ? "Active" : selectedPackage.isValid ? "Valid" : "Invalid"}
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
  <div class="bg-muted/50 flex-1 rounded-xl overflow-auto">
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">Configuration Management</h1>
      <p class="text-base text-muted-foreground mb-6">
        Manage configuration packages that define file requirements, analysis scripts, and schema validations.
        The sidebar shows available configuration packages and their status.
      </p>
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Features:</h2>
        <ul class="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Load configuration packages from ZIP files</li>
          <li>Package validation and error reporting</li>
          <li>Real-time configuration status monitoring</li>
          <li>Activate configurations to apply to workspace</li>
          <li>Package search and filtering capabilities</li>
          <li>Detailed package content inspection</li>
        </ul>
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border">
          <h3 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Getting Started
          </h3>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Click "Load" in the sidebar to upload a ZIP configuration package, then use "Activate" 
            to apply the configuration to your workspace. Click on any package to view its detailed contents.
          </p>
        </div>
        <div class="mt-6 p-4 bg-gray-50 dark:bg-gray-950/20 rounded-lg border">
          <h3 class="font-medium text-gray-900 dark:text-gray-100 mb-2">
            Package Structure
          </h3>
          <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">Expected ZIP structure:</p>
          <ul class="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside ml-4 space-y-1">
            <li><code>package.json</code> - Package metadata (name, version, description)</li>
            <li><code>files/requirements.json</code> - File requirement definitions</li>
            <li><code>scripts/*.py + scripts/metadata.json</code> - Python analysis scripts</li>
            <li><code>schemas/*.py + schemas/metadata.json</code> - Schema validation scripts</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
{/if}