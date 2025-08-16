<script lang="ts">
  import { getPreviewComponent } from './registry.svelte';
  import { resize } from '@svelte-put/resize';
  import FileTextIcon from '@lucide/svelte/icons/file-text';
  import AlertCircleIcon from '@lucide/svelte/icons/alert-circle';

  interface Props {
    /** Filename to preview */
    filename: string;
    /** File content (optional, for content-based preview decisions) */
    content?: string | Uint8Array;
    /** Additional props to pass to the preview component */
  previewProps?: Record<string, unknown>;
    /** Custom fallback message */
    fallbackMessage?: string;
  }

  let { 
    filename, 
    content, 
    previewProps = {}, 
    fallbackMessage = "No preview available for this file type" 
  }: Props = $props();

  // Get the appropriate preview component
  const previewRegistration = $derived(getPreviewComponent(filename, content));
  
  import type { ComponentType } from 'svelte';
  let PreviewComponent = $state<ComponentType | null>(null);
  let loading = $state(false);
  let error = $state<string | null>(null);
  
  // Track container size for responsive behavior
  let containerSize = $state({ width: 0, height: 0 });
  
  function handleResize(event: CustomEvent) {
    const { width, height } = event.detail;
    containerSize = { width, height };
  }

  // Load preview component when registration changes
  $effect(() => {
    if (!previewRegistration) {
      PreviewComponent = null;
      loading = false;
      error = null;
      return;
    }
    loading = true;
    error = null;
  void (async () => {
      try {
        const componentOrPromise = previewRegistration.component();
        if (componentOrPromise instanceof Promise) {
          const mod: unknown = await componentOrPromise;
          let resolved: unknown = mod;
          if (resolved && typeof resolved === 'object' && 'default' in (resolved as Record<string, unknown>)) {
            resolved = (resolved as { default: unknown }).default;
          }
          PreviewComponent = resolved as ComponentType;
        } else {
          PreviewComponent = componentOrPromise as ComponentType;
        }
      } catch (err) {
        console.error(`Failed to load preview component for ${filename}:`, err);
        error = `Failed to load preview component: ${err instanceof Error ? err.message : String(err)}`;
        PreviewComponent = null;
      } finally {
        loading = false;
      }
    })();
  });
</script>

<div class="preview-container h-full w-full" use:resize onresized={handleResize}>
  {#if loading}
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <div class="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
        <p class="text-sm text-muted-foreground">Loading preview...</p>
      </div>
    </div>
  {:else if error}
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <AlertCircleIcon class="h-6 w-6 mx-auto mb-2 text-destructive" />
        <p class="text-sm text-destructive">{error}</p>
      </div>
    </div>
  {:else if PreviewComponent}
    <PreviewComponent {filename} {content} {containerSize} {...previewProps} />
  {:else}
    <div class="flex items-center justify-center h-full">
      <div class="text-center">
        <FileTextIcon class="h-6 w-6 mx-auto mb-2 text-muted-foreground opacity-50" />
        <p class="text-sm text-muted-foreground">{fallbackMessage}</p>
        <p class="text-xs text-muted-foreground mt-1">File: {filename}</p>
      </div>
    </div>
  {/if}
</div>

<style>
  .preview-container {
    min-height: 200px;
    /* Performance optimizations */
    contain: layout style paint;
    will-change: auto;
  }
</style>