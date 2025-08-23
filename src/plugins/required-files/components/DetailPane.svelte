<script lang="ts">
  import { PreviewRenderer, initializeBuiltinPreviews } from "../../../core/services/preview/index.js";
  import { getSelection } from "@core/state/workspace.svelte";
  import { getFile } from "../store.svelte";
  import { onMount } from "svelte";

  // Initialize built-in preview components
  onMount(() => {
    initializeBuiltinPreviews();
  });

  // Get selected file
  const selectedFileId = $derived(getSelection('file'));
  const selectedFile = $derived(selectedFileId ? getFile(selectedFileId) : null);
  
  // Create preview props for uploaded file
  const previewProps = $derived(() => {
    if (!selectedFile?.file) return {};
    
    return {
      file: selectedFile.file,
      fileSize: selectedFile.file.size,
      uploadedAt: selectedFile.uploadedAt
    };
  });
</script>

{#if selectedFile?.file}
  <!-- File Preview Mode -->
  <div class="h-full min-h-0 overflow-hidden">
    <PreviewRenderer 
      filename={selectedFile.originalName} 
      previewProps={previewProps()}
      fallbackMessage="Preview not available for this file type"
    />
  </div>
{:else}
  <!-- No file selected -->
  <div class="bg-muted/50 flex-1 rounded-xl overflow-auto border border-border">
    <div class="p-8">
      <h1 class="text-3xl font-bold mb-4">File Management</h1>
      <p class="text-base text-muted-foreground mb-6">
        Upload and manage your data files with real-time preview capabilities. 
        The sidebar shows your file requirements and upload status.
      </p>
      <div class="space-y-4">
        <h2 class="text-lg font-semibold">Features:</h2>
        <ul class="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Upload files with progress tracking</li>
          <li>Real-time parquet file preview with hyparquet</li>
          <li>CSV and GeoPackage file support</li>
          <li>File search and filtering capabilities</li>
          <li>Automatic file validation and type checking</li>
          <li>Bulk folder upload with smart matching</li>
        </ul>
        <div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border">
          <h3 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
            Getting Started
          </h3>
          <p class="text-sm text-blue-700 dark:text-blue-300">
            Click "Upload All" to select a folder containing your data files, or upload individual files 
            using the upload buttons on each file card. Click on any uploaded file to preview its contents.
          </p>
        </div>
      </div>
    </div>
  </div>
{/if}
