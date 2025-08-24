<script lang="ts">
  import MarkdownIt from 'markdown-it';
  import katexPlugin from '@vscode/markdown-it-katex';
  import 'katex/dist/katex.min.css';
  import { tick } from 'svelte';
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
  let proseEl = $state<HTMLDivElement | null>(null);

  // Create a map of related file paths to blob URLs for quick lookup
  const objectUrls = new Map<string, string>();

  // Initialize markdown-it with VSCode's exact approach
  const md = new MarkdownIt({
    html: true,         // Enable HTML tags in source
    breaks: true,       // Convert '\n' in paragraphs into <br>
    linkify: true,      // Autoconvert URL-like text to links
    typographer: true   // Enable some language-neutral replacement + quotes beautification
  })
  // Use VSCode's proven KaTeX plugin with their exact configuration
  .use(katexPlugin, {
    throwOnError: false,
    errorColor: '#cc0000',
    enableFencedBlocks: true,
    globalGroup: true
  });

  // Override fence renderer to handle Mermaid properly (avoid <pre> wrapper)
  const origFence = md.renderer.rules.fence || ((tokens, idx, options, env, renderer) => {
    return renderer.renderToken(tokens, idx, options);
  });

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    const info = (token.info || '').trim().toLowerCase();
    if (info === 'mermaid') {
      return `<div class="mermaid">${token.content}</div>`;
    }
    return origFence(tokens, idx, options, env, self);
  };

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
    
    try {
      const text = await file.text();
      const baseDir = getBaseDir(filename);

      // Override the default image renderer to handle local assets
      const defaultImageRender = md.renderer.rules.image || function(tokens, idx, options, env, renderer) {
        return renderer.renderToken(tokens, idx, options);
      };

      md.renderer.rules.image = function(tokens, idx, options, env, renderer) {
        const token = tokens[idx];
        const srcIndex = token.attrIndex('src');
        if (srcIndex >= 0) {
          const src = token.attrGet('src') || '';
          const resolvedSrc = resolveAssetUrl(src, baseDir);
          token.attrSet('src', resolvedSrc);
        }
        return defaultImageRender(tokens, idx, options, env, renderer);
      };

      // Override link renderer
      const defaultLinkRender = md.renderer.rules.link_open || function(tokens, idx, options, env, renderer) {
        return renderer.renderToken(tokens, idx, options);
      };

      md.renderer.rules.link_open = function(tokens, idx, options, env, renderer) {
        const token = tokens[idx];
        const hrefIndex = token.attrIndex('href');
        if (hrefIndex >= 0) {
          const href = token.attrGet('href') || '';
          const resolvedHref = resolveLinkUrl(href, baseDir);
          token.attrSet('href', resolvedHref);
          
          // Add target="_blank" for external links
          if (!href.startsWith('#') && !objectUrls.has(href)) {
            token.attrSet('target', '_blank');
            token.attrSet('rel', 'noopener noreferrer');
          }
        }
        return defaultLinkRender(tokens, idx, options, env, renderer);
      };

      // Render the markdown
      html = md.render(text);
      loading = false;
      
      // Process Mermaid after DOM is ready - use proper Svelte lifecycle
      await tick(); // Ensure DOM is flushed
      await processMermaidDiagrams();
      
    } catch (e) {
      throw e;
    }
  }

  async function processMermaidDiagrams() {
    // Defensive guard - wait for DOM if needed
    if (!proseEl) {
      await tick();
    }
    if (!proseEl) {
      return;
    }
    
    const mermaidDivs = Array.from(proseEl.querySelectorAll('.mermaid')) as HTMLElement[];
    
    if (mermaidDivs.length === 0) {
      return;
    }

    try {
      const mermaid = (await import('mermaid')).default;
      
      await mermaid.initialize({ 
        startOnLoad: false,
        theme: 'default',
        securityLevel: 'loose',
        fontFamily: 'inherit'
      });

      // Process each diagram individually for better control
      for (let i = 0; i < mermaidDivs.length; i++) {
        const div = mermaidDivs[i];
        const code = div.textContent?.trim();
        
        if (!code) {
          continue;
        }
        
        try {
          const id = `mermaid-${Date.now()}-${i}`;
          const { svg } = await mermaid.render(id, code);
          div.innerHTML = svg;
          div.classList.add('mermaid-rendered');
        } catch (e) {
          div.innerHTML = `<div class="mermaid-error">Failed to render diagram: ${e.message || 'Unknown error'}</div>`;
        }
      }
    } catch (e) {
      // Silently fail if Mermaid can't be loaded
    }
  }

  function resolveAssetUrl(src: string, baseDir: string): string {
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
    return srcStr;
  }

  function resolveLinkUrl(href: string, baseDir: string): string {
    const hrefStr = String(href || '');
    if (!hrefStr) return '';
    
    if (/^(https?:)?\/\//i.test(hrefStr) || /^data:/i.test(hrefStr) || hrefStr.startsWith('#')) return hrefStr;
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
      <div class="prose max-w-none p-6 mx-auto" style="max-width: 800px;" bind:this={proseEl}>
        {@html html}
      </div>
    {/if}
  </CardContent>
</Card>

<style>
  /* VS Code-like Markdown styling (scoped) */
  :global(.prose) {
    font-family: inherit;
    font-size: var(--markdown-font-size, 14px);
    line-height: var(--markdown-line-height, 22px);
    word-wrap: break-word;
    color: inherit;
  }
  
  /* Reset top margins for common blocks */
  :global(.prose h1),
  :global(.prose h2),
  :global(.prose h3),
  :global(.prose h4),
  :global(.prose h5),
  :global(.prose h6),
  :global(.prose p),
  :global(.prose ol),
  :global(.prose ul),
  :global(.prose pre) {
    margin-top: 0;
  }
  
  /* Headings */
  :global(.prose h1),
  :global(.prose h2),
  :global(.prose h3),
  :global(.prose h4),
  :global(.prose h5),
  :global(.prose h6) {
    font-weight: 600;
    margin-top: 24px;
    margin-bottom: 16px;
    line-height: 1.25;
  }
  :global(.prose h1) {
    font-size: 2em;
    margin-top: 0;
    padding-bottom: 0.3em;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--border);
  }
  :global(.prose h2) {
    font-size: 1.5em;
    padding-bottom: 0.3em;
    border-bottom-width: 1px;
    border-bottom-style: solid;
    border-bottom-color: var(--border);
  }
  :global(.prose h3) { font-size: 1.25em; }
  :global(.prose h4) { font-size: 1em; }
  :global(.prose h5) { font-size: 0.875em; }
  :global(.prose h6) { font-size: 0.85em; }

  /* Paragraphs and lists */
  :global(.prose p) { margin-bottom: 16px; }
  :global(.prose li p) { margin-bottom: 0.7em; }
  :global(.prose ul),
  :global(.prose ol) {
    margin-bottom: 0.7em;
    padding-left: 1.25rem;
  }
  :global(.prose li) { margin: 0.25em 0; }
  :global(.prose input[type="checkbox"]) {
    accent-color: var(--sidebar-primary);
    margin-right: 0.4rem;
    vertical-align: middle;
  }

  /* Links */
  :global(.prose a) {
    color: var(--sidebar-primary);
    text-decoration: none;
  }
  :global(.prose a:hover) { text-decoration: underline; }
  :global(.prose a:focus),
  :global(.prose input:focus),
  :global(.prose select:focus),
  :global(.prose textarea:focus) {
    outline: 1px solid -webkit-focus-ring-color;
    outline-offset: -1px;
  }

  /* Media */
  :global(.prose img),
  :global(.prose video) {
    max-width: 100%;
    max-height: 100%;
  }

  /* Horizontal rule */
  :global(.prose hr) {
    border: 0;
    height: 1px;
    border-bottom: 1px solid var(--border);
    margin: 1.5rem 0;
  }

  /* Blockquotes */
  :global(.prose blockquote) {
    margin: 0;
    padding: 0 16px 0 10px;
    border-left-width: 5px;
    border-left-style: solid;
    border-left-color: var(--border);
    border-radius: 2px;
  }

  /* Tables */
  :global(.prose table) {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 0.7em;
    font-size: 0.95em;
  }
  :global(.prose th) {
    text-align: left;
    border-bottom: 1px solid var(--border);
  }
  :global(.prose th),
  :global(.prose td) { padding: 5px 10px; }
  :global(.prose table > tbody > tr + tr > td) {
    border-top: 1px solid var(--border);
  }

  /* Code and preformatted */
  :global(.prose code) {
    font-family: var(--vscode-editor-font-family, "SF Mono", Monaco, Menlo, Consolas, "Ubuntu Mono", "Liberation Mono", "DejaVu Sans Mono", "Courier New", monospace);
    font-size: 1em;
    line-height: 1.357em;
  }
  :global(.prose pre) {
    background-color: var(--vscode-textCodeBlock-background, color-mix(in oklab, currentColor 8%, transparent));
    border: 1px solid var(--vscode-widget-border, var(--border));
    padding: 16px;
    border-radius: 3px;
    overflow: auto;
  }
  :global(.prose pre code) {
    display: inline-block;
    color: var(--vscode-editor-foreground, inherit);
    tab-size: 4;
    background: none;
  }

  /* Misc */
  :global(.prose sub),
  :global(.prose sup) { line-height: 0; }

  /* KaTeX tweaks */
  :global(.prose .katex-display) {
    margin: 1em 0;
  }

  /* Mermaid styling */
  :global(.prose .mermaid) {
    text-align: center;
    margin: 1em 0;
  }
  
  :global(.prose .mermaid svg) {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
  
  :global(.prose .mermaid-error) {
    color: var(--destructive);
    background: var(--muted);
    padding: 0.5em;
    border-radius: 4px;
    font-family: monospace;
    font-size: 0.9em;
    text-align: left;
    border: 1px solid var(--border);
  }
</style>