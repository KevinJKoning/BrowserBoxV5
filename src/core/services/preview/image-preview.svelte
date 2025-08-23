<script lang="ts">
  import { Card, CardContent, CardHeader, CardTitle } from "../../../lib/components/ui/card/index.js";
  import { Badge } from "../../../lib/components/ui/badge/index.js";

  interface Props {
    file: File;
    filename: string;
    containerSize?: { width: number; height: number };
  }

  let { file, filename, containerSize = { width: 0, height: 0 } }: Props = $props();

  let imageUrl = $state<string>("");
  let loading = $state(true);
  let error = $state<string | null>(null);
  let imageDimensions = $state<{ width: number; height: number } | null>(null);

  $effect(() => {
    // Reset state when inputs change
    imageUrl = "";
    error = null;
    loading = true;
    imageDimensions = null;

    // Create object URL for the image
    try {
      const url = URL.createObjectURL(file);
      imageUrl = url;
      
      // Load image to get dimensions
      const img = new Image();
      img.onload = () => {
        imageDimensions = { width: img.width, height: img.height };
        loading = false;
      };
      img.onerror = () => {
        error = "Failed to load image";
        loading = false;
      };
      img.src = url;
    } catch (err) {
      error = `Failed to create image URL: ${err instanceof Error ? err.message : String(err)}`;
      loading = false;
    }
  });

  function getFileExtension(name: string): string {
    const ext = name.toLowerCase().split('.').pop() || '';
    return ext.toUpperCase();
  }

  function formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  }

  $effect.root(() => () => {
    if (imageUrl) URL.revokeObjectURL(imageUrl);
  });
</script>

<Card class="h-full">
  <CardHeader>
    <CardTitle class="flex items-center justify-between">
      <span class="truncate">{filename}</span>
      <div class="flex items-center gap-2">
        {#if !loading && !error}
          <Badge variant="secondary">{getFileExtension(filename)}</Badge>
          {#if imageDimensions}
            <Badge variant="outline">{imageDimensions.width} × {imageDimensions.height}</Badge>
          {/if}
          <Badge variant="outline">{formatFileSize(file.size)}</Badge>
        {/if}
      </div>
    </CardTitle>
  </CardHeader>
  <CardContent class="p-0 h-[calc(100%-4rem)] overflow-auto">
    {#if loading}
      <div class="flex items-center justify-center h-full">
        <div class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p class="text-sm text-muted-foreground">Loading image...</p>
        </div>
      </div>
    {:else if error}
      <div class="flex items-center justify-center h-full">
        <div class="text-center">
          <p class="text-sm text-destructive mb-2">Error</p>
          <p class="text-xs text-muted-foreground">{error}</p>
        </div>
      </div>
    {:else}
      <div class="flex items-center justify-center h-full p-6">
        <img 
          src={imageUrl} 
          alt={filename}
          class="max-w-full max-h-full object-contain rounded-lg shadow-sm"
          style="max-width: 100%; max-height: 100%;"
        />
      </div>
    {/if}
  </CardContent>
</Card>