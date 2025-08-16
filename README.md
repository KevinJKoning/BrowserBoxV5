## Developing

Install dependencies (`npm install`, `pnpm install`, or `yarn`) then start a dev server:

```sh
npm run dev
```

## Building

Produce an optimized multi-file PWA bundle:

```sh
npm run build
```

Outputs `dist/` with:
* Code-split ES modules & CSS
* `sw.js` + Workbox runtime for offline caching
* Pyodide assets (wheels, wasm, data)

Preview locally:

```sh
npm run preview
```

Or serve the built PWA (ensures service worker scope) via the included Python script:

```sh
cd dist
python3 serve.py
```

We intentionally dropped the previous “single inlined HTML” target in favor of browser caching, smaller first-load JS, and clearer architectural boundaries.

### Architecture

The project uses **vanilla Vite + Svelte 5 (Runes)** (not SvelteKit) to keep control over the output, support offline Pyodide execution, and progressively evolve toward a robust **local-first PWA** deployable to any static host (GitHub Pages, S3, etc.). We explicitly **dropped the former single-file build requirement** to gain better caching, faster cold starts for large dependencies, and clearer architectural boundaries.

Core architectural goals:
1. Stable public surfaces (domains) with clear ownership
2. Zero fragile deep `../../../` import chains
3. Fast, testable core logic isolated from UI
4. Pluggable analysis/preview features (Pyodide, file previews, validations)
5. Efficient, cache-friendly multi-file PWA bundle with offline capability

#### Domain Boundaries (planned / rolling out)
We are introducing path aliases & barrels to formalize domains:

Alias -> Path | Purpose
- `@core/*` -> `src/lib/core/*` (pure logic, types, schemas, state factories)
- `@utils/*` -> `src/lib/utils/*` (generic + formatting helpers)
- `@ui/*` -> `src/lib/components/ui/*` (reusable design‑system primitives)
- `@plugins/*` -> `src/plugins/*` (feature / extension modules)
- `@worker/*` -> `src/lib/pyodide/*` (Pyodide & worker boundary code)

Barrels will re‑export only intentional public APIs; internal implementation files should not be imported directly across domains.

#### Why this matters
Removing the legacy `src/lib/utils.ts` barrel exposed brittle deep import paths. Introducing aliases + curated barrels prevents future breakage, improves IDE DX, and enables safer code splitting (e.g. plugin / heavy preview chunks) because boundaries become explicit.

#### Layering Rules (conceptual)
`@core` (pure) ← consumed by `@plugins` & `@ui` ← composed into screens/routes. Workers use `@core` types via `@worker` message handlers. No UI imports inside `@core`.

#### Coding Standards (in progress enforcement)
* No deep relative imports that cross domain roots (>= 3 `..` segments) — replace with alias.
* Barrels stay side‑effect free (pure re‑exports) to keep tree‑shaking effective.
* Utilities remain pure (no DOM access) except explicitly side‑effect helpers (e.g. clipboard) which reside in dedicated modules.
* Worker communication: plain data (structured clone); never pass component or store instances.

#### Plugin Architecture (roadmap)
Plugins declare a manifest (id, human name, capabilities) and register views or analysis actions. They depend only on public APIs (`@core`, `@utils`, UI primitives) and never reach into internal file structures. Versioned manifest typing will allow evolution without breaking existing plugins.

#### Worker / Pyodide Boundary
Interaction will move toward a schema‑first message layer (TypeScript types or zod schemas) with a central router. This isolates computational code and keeps the UI responsive.

#### Performance & Bundling Strategy
* Dynamic `import()` for rarely used preview/analysis modules
* Clear alias boundaries allow targeted code splitting
* Service worker precaches core shell + Pyodide assets while allowing long-term caching of rarely changing chunks
* Avoids monolithic inlining—browser caching leveraged across sessions
* Reusable UI primitives keep component code size small and compilation fast
* Extreme micro-optimizations (e.g. aggressive manual chunk surgery, icon tree‑shaking beyond current needs) are intentionally deprioritized right now in favor of architectural clarity; we will revisit once core feature set stabilizes.

#### Testing Strategy (progressive)
* Unit tests live near pure `@core` modules.
* Contract tests validate worker message schemas & plugin manifests.
* Component tests cover critical UI primitives (breadcrumb, sidebar, buttons) using their public barrels.

#### Roadmap Snapshot
| Phase | Focus |
| ----- | ----- |
| 1 | (Current) Introduce path aliases + replace deep relatives |
| 2 | Enforce layering & restricted imports via ESLint |
| 3 | Formal plugin manifest + versioned API surface |
| 4 | Worker message schema router |
| 5 | Consolidated core store layer & derived selectors |
| 6 | Error/logging bus + analytics hooks |
| 7 | Strategic code splitting & performance tuning |

---

## Application State Management

We use **Svelte 5 Runes** with a pragmatic pattern that balances global coherence and local clarity.

### Principles
* Keep state **close to where it’s used** unless truly global.
* Global/core state lives under `@core/state` (planned) as factory modules exporting `$state()` objects + action objects.
* Complex derivations stay inside the consuming component via `$derived.by()` to avoid accidental stale dependencies.
* Pure helper logic (sorting, formatting) is never embedded inside derivations—lives in `@utils`.

### Recommended Store Shape
```ts
// Example future core store (files)
export const filesState = $state<{
  byId: Record<string, FileEntry>;
  selectedId: string | null;
  uploads: Record<string, "waiting"|"uploading"|"completed"|"error">;
}>({ byId: {}, selectedId: null, uploads: {} });

export const filesActions = {
  select(id: string | null) { filesState.selectedId = id; },
  upsert(entry: FileEntry) { filesState.byId[entry.id] = entry; },
  remove(id: string) { delete filesState.byId[id]; if (filesState.selectedId===id) filesState.selectedId=null; }
};
```

### Component-Level Derivation
```svelte
<script lang="ts">
  import { filesState } from '@core/state/files';
  const selectedFile = $derived.by(() => filesState.selectedId ? filesState.byId[filesState.selectedId] ?? null : null);
  const fileCount = $derived.by(() => Object.keys(filesState.byId).length);
</script>
```

### Do / Avoid
| Do | Avoid |
|----|-------|
| Co-locate complex `$derived.by()` with usage | Exporting many heavy derived values from store modules |
| Use plain action objects for mutations | Hiding mutations inside derived callbacks |
| Snapshot for debugging (`$state.snapshot(obj)`) | Logging proxied state directly (noisy) |
| Keep stores framework-pure (no DOM) | Mixing UI side effects into stores |

### Debugging Tips
1. Add temporary `$effect()` in components, not in core stores, for tracing.
2. If a derivation doesn’t re-run, ensure all accessed properties are directly read inside the callback.
3. Prefer splitting overly broad stores before adding complex invalidation logic.

### Migration Path (Current → Target)
1. Introduce aliases (`@core/state`) and move existing `file-store` there.
2. Replace deep relative imports to utils with `@utils/*`.
3. Gradually extract other global concerns (preview registry, plugin registry) into discrete state modules.
4. Add contract tests around action objects once stabilized.

---

## Pyodide Version Management

This application includes a complete Pyodide distribution for offline Python execution. The Pyodide assets are copied from `/pyodide_0-27-7/` into the build output (`dist/assets/...`) via the static copy plugin and are precached by the service worker for offline use (no single-file embedding required anymore).

### Current Version: Pyodide 0.27.7

We recently downgraded from Pyodide 0.28.0 to 0.27.7 to ensure compatibility with geopandas and other geospatial packages.

