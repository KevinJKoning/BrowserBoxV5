<script module lang="ts">
  import type { ComponentType } from 'svelte';
  export interface PreviewRegistration {
    extensions: string[];
    component: () => Promise<{ default: ComponentType }> | ComponentType;
    priority?: number;
    canPreview?: (filename: string, content?: string | Uint8Array) => boolean;
  }
  const registry = $state<PreviewRegistration[]>([]);
  export function registerPreview(r: PreviewRegistration) {
    const existingIndex = registry.findIndex(x => x.extensions.some(ext => r.extensions.includes(ext)));
    if (existingIndex !== -1) registry[existingIndex] = r; else registry.push(r);
    registry.sort((a,b)=>(b.priority??0)-(a.priority??0));
  }
  function extOf(name: string | undefined | null) { 
    if (!name || typeof name !== 'string') return ''; 
    const i = name.lastIndexOf('.'); 
    return i !== -1 ? name.slice(i).toLowerCase() : ''; 
  }
  export function getPreviewComponent(filename: string | undefined | null, content?: string|Uint8Array) {
    const ext = extOf(filename);
    for (const r of registry) {
      if (r.extensions.includes(ext)) { if (r.canPreview && !r.canPreview(filename, content)) continue; return r; }
    }
    return null;
  }
  export function getAllPreviews() { return [...registry]; }
  export function hasPreview(filename: string | undefined | null) { return getPreviewComponent(filename) !== null; }
  export function initializeBuiltinPreviews() {
    const safe = (loader: () => Promise<unknown>) => async () => {
      const mod = await loader();
      if (typeof mod === 'object' && mod && 'default' in mod) {
        return { default: (mod as { default: ComponentType }).default };
      }
      return { default: mod as ComponentType };
    };
    registerPreview({ extensions:['.csv','.tsv'], component: safe(() => import('./csv-preview.svelte')), priority:10 });
    registerPreview({ extensions:['.parquet','.pq'], component: safe(() => import('./parquet-preview.svelte')), priority:10 });
    registerPreview({ extensions:['.gpkg','.geopackage'], component: safe(() => import('./geopackage-preview.svelte')), priority:10 });
    registerPreview({ extensions:['.html','.htm'], component: safe(() => import('./html-preview.svelte')), priority:10 });
  }
</script>
