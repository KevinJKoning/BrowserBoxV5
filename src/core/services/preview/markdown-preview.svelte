<script lang="ts">
  import { marked } from 'marked';
  import { Card, CardContent, CardHeader, CardTitle } from "../../../lib/components/ui/card/index.js";
  import { Badge } from "../../../lib/components/ui/badge/index.js";

  interface RelatedFile { path: string; file: File }
  interface Props {
    file: File;
    filename: string;
    containerSize?: { width: number; height: number };
    relatedFiles?: RelatedFile[]; // files referenced from the markdown (e.g., images in subfolders)
  }

  let { file, filename, containerSize = { width: 0, height: 0 }, relatedFiles = [] }: Props = $props();

  let html = $state<string>("");
  let loading = $state(true);
  let error = $state<string | null>(null);

  // Create a map of related file paths to blob URLs for quick lookup
  const objectUrls = new Map<string, string>();

  // Configure marked with good defaults
  marked.setOptions({
    breaks: true,        // Line breaks become <br>
    gfm: true           // GitHub flavored markdown
  });

  $effect(() => {
    // Reset state when inputs change
    html = "";
    error = null;
    loading = true;

    // Clean up previous URLs
    for (const url of objectUrls.values()) URL.revokeObjectURL(url);
    objectUrls.clear();

    // Pre-create object URLs for related files
    const baseDir = getBaseDir(filename);
    for (const rf of relatedFiles ?? []) {
      try {
        const normalized = normalizePath(joinPath(baseDir, rf.path));
        const url = URL.createObjectURL(rf.file);
        objectUrls.set(normalized, url);
        // Also try the direct path without base dir joining
        objectUrls.set(rf.path, url);
      } catch (error) {
        console.error('Error creating object URL for related file:', rf, error);
      }
    }

    renderMarkdown().catch(err => {
      error = `Failed to render markdown: ${err instanceof Error ? err.message : String(err)}`;
      loading = false;
    });
  });

  function getBaseDir(name: string): string {
    const i = name.lastIndexOf('/');
    return i === -1 ? '' : name.slice(0, i);
  }

  async function renderMarkdown() {
    const text = await file.text();
    const baseDir = getBaseDir(filename);

    // Create custom renderer to handle asset URLs
    const renderer = new marked.Renderer();
    
    // Override image rendering to resolve local assets
    renderer.image = function(token) {
      // Extract values from token object (new marked API)
      const href = token?.href || token?.src || '';
      const title = token?.title || '';
      const text = token?.text || token?.alt || '';
      
      const resolvedHref = resolveAssetUrl(String(href), baseDir);
      const titleAttr = title ? ` title="${escapeHtml(String(title))}"` : '';
      return `<img src="${resolvedHref}" alt="${escapeHtml(String(text))}"${titleAttr} />`;
    };

    // Override link rendering to resolve local links
    renderer.link = function(token) {
      // Extract values from token object (new marked API)
      const href = token?.href || '';
      const title = token?.title || '';
      const text = token?.text || '';
      
      const resolvedHref = resolveLinkUrl(String(href), baseDir);
      const titleAttr = title ? ` title="${escapeHtml(String(title))}"` : '';
      return `<a href="${resolvedHref}" target="_blank" rel="noopener noreferrer"${titleAttr}>${String(text)}</a>`;
    };

    // Render markdown with custom renderer
    html = marked(text, { renderer });
    loading = false;
  }

  function escapeHtml(text: string): string {
    return text.replace(/[&<>"']/g, (c) => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c] as string));
  }

  function resolveAssetUrl(src: string, baseDir: string): string {
    // Ensure src is a string and not null/undefined
    const srcStr = String(src || '');
    if (!srcStr) return '';
    
    
    // Leave absolute/data URLs untouched
    if (/^(https?:)?\/\//i.test(srcStr) || /^data:/i.test(srcStr)) {
      return srcStr;
    }
    
    const normalized = normalizePath(joinPath(baseDir, srcStr));
    const localUrl = objectUrls.get(normalized) || objectUrls.get(srcStr) || '';
    if (localUrl) {
      return localUrl;
    }
    // Fallback to original src if no related file mapping exists
    return srcStr;
  }

  function resolveLinkUrl(href: string, baseDir: string): string {
    // Ensure href is a string and not null/undefined
    const hrefStr = String(href || '');
    if (!hrefStr) return '';
    
    if (/^(https?:)?\/\//i.test(hrefStr) || /^data:/i.test(hrefStr) || hrefStr.startsWith('#')) return hrefStr;
    // Try to resolve to a related file, otherwise leave as-is
    return resolveAssetUrl(hrefStr, baseDir);
  }

  function joinPath(base: string, rel: string): string {
    if (!base) return rel;
    if (!rel) return base;
    const b = base.replace(/\\/g, '/');
    const r = rel.replace(/\\/g, '/');
    return (b ? b + '/' : '') + r;
  }

  function normalizePath(p: string): string {
    const parts = p.split('/');
    const stack: string[] = [];
    for (const part of parts) {
      if (!part || part === '.') continue;
      if (part === '..') stack.pop(); else stack.push(part);
    }
    return stack.join('/');
  }

  $effect.root(() => () => {
    for (const url of objectUrls.values()) URL.revokeObjectURL(url);
    objectUrls.clear();
  });
</script>

<Card class="h-full">
  <CardHeader>
    <CardTitle class="flex items-center justify-between">
      <span class="truncate">{filename}</span>
      {#if !loading && !error}
        <Badge variant="secondary">Markdown</Badge>
      {/if}
    </CardTitle>
  </CardHeader>
  <CardContent class="p-0 h-[calc(100%-4rem)] overflow-auto">
    {#if loading}
      <div class="flex items-center justify-center h-full">
        <div class="text-center">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p class="text-sm text-muted-foreground">Rendering markdown...</p>
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
      <div class="prose max-w-none p-6">
        {@html html}
      </div>
    {/if}
  </CardContent>
</Card>

<style>
  :global(.prose) {
    /* Minimal readable defaults without relying on typography plugin */
    line-height: 1.6;
  }
  :global(.prose h1), :global(.prose h2), :global(.prose h3), :global(.prose h4), :global(.prose h5), :global(.prose h6) { margin: 1em 0 0.5em; font-weight: 600; }
  :global(.prose p) { margin: 0.75em 0; }
  :global(.prose ul) { margin: 0.75em 0; padding-left: 1.25rem; }
  :global(.prose img) { max-width: 100%; height: auto; }
  :global(.prose pre) { background: color-mix(in oklab, currentColor 8%, transparent); padding: 0.75rem; border-radius: 0.5rem; overflow: auto; }
  :global(.prose code) { background: color-mix(in oklab, currentColor 8%, transparent); padding: 0.15rem 0.35rem; border-radius: 0.25rem; }
  :global(.prose a) { color: var(--sidebar-primary); }
</style>