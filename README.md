## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

This creates a **completely self-contained single HTML file** in the `dist/` directory. The file includes:
- All JavaScript code inlined
- All CSS styles inlined  
- No external dependencies
- Ready for sharing or embedding

You can preview the production build with `npm run preview`.

### Architecture

This application uses **vanilla Vite + Svelte** (not SvelteKit) for optimal single-file output:
- **Vite** for fast development and building
- **vite-plugin-singlefile** for complete inlining
- **Svelte 5** with Runes for reactive state management
- **No server-side rendering** - pure client-side application

## Application State Management

This application uses **Svelte 5 Runes** for reactive state management. Here are the key patterns and best practices implemented:

### State Architecture

The application follows a centralized state pattern with the following structure:

- **`fileManagerState`** - Core reactive state using `$state()`
- **`fileActions`** - Action functions that modify state
- **Component-level selectors** - Reactive selectors using `$derived.by()` defined in components

### Key Files

- `src/lib/stores/file-store.svelte.ts` - Main state store with actions
- `src/routes/+page.svelte` - Example of component-level reactive selectors
- `src/lib/components/app-sidebar.svelte` - State consumption and user interactions

### Best Practices for Svelte 5 Runes

#### ✅ Do: Define Complex Selectors in Components

```typescript
// In your component (.svelte file)
import { fileManagerState } from "$lib/stores/file-store.svelte.js";

const selectedFile = $derived.by(() => {
  const selectedId = fileManagerState.selectedFileId;
  return selectedId ? fileManagerState.files[selectedId] ?? null : null;
});
```

#### ❌ Avoid: Module-level $derived.by() with Complex Dependencies

```typescript
// In store module (.svelte.ts file) - CAN CAUSE REACTIVITY ISSUES
export const fileSelectors = {
  selectedFile: $derived.by(() => { // May not update properly
    return fileManagerState.selectedFileId 
      ? fileManagerState.files[fileManagerState.selectedFileId] ?? null 
      : null;
  })
};
```

#### ✅ Do: Use Simple State Objects

```typescript
export const fileManagerState = $state({
  files: {} as Record<string, UploadedFile>,
  selectedFileId: null as string | null,
  uploadStates: {} as Record<string, "waiting" | "uploading" | "completed" | "error">
});
```

#### ✅ Do: Use Plain Functions for Actions

```typescript
export const fileActions = {
  selectFile(fileId: string | null) {
    fileManagerState.selectedFileId = fileId;
  },
  // ... other actions
};
```

### Common Pitfalls and Solutions

1. **Issue**: `$derived.by()` not updating when state changes
   - **Solution**: Move complex selectors to component level instead of store module level

2. **Issue**: Circular dependencies between state and selectors
   - **Solution**: Keep selectors simple or define them where they're consumed

3. **Issue**: State proxy warnings in console logs
   - **Solution**: Use `$state.snapshot()` for logging or avoid logging state objects directly

### Debugging State Issues

If you encounter reactivity issues:

1. Add `$effect()` blocks to track state changes:
```typescript
$effect(() => {
  console.log('State changed:', fileManagerState.selectedFileId);
});
```

2. Check that `$derived.by()` selectors are re-running when expected
3. Consider moving complex selectors from store modules to components
4. Verify that state mutations are direct assignments, not through intermediate variables

## Pyodide Version Management

This application includes a complete Pyodide distribution for offline Python execution. The Pyodide assets are copied from `/pyodide_0-27-7/` to `/public/pyodide/` and then embedded into the single-file build.

### Current Version: Pyodide 0.27.7

We recently downgraded from Pyodide 0.28.0 to 0.27.7 to ensure compatibility with geopandas and other geospatial packages.

### Complications During Downgrade

**Root Issue**: Version mismatch between hardcoded wheel filenames and actual distribution

When downgrading from 0.28.0 to 0.27.7, we encountered the following complications:

1. **Hardcoded Wheel Versions**: The `pyodide-worker.ts` had hardcoded wheel filenames using `cp313-cp313-pyodide_2025_0_wasm32` (Python 3.13, 2025.0 ABI) but the 0.27.7 distribution uses `cp312-cp312-pyodide_2024_0_wasm32` (Python 3.12, 2024.0 ABI).

2. **CDN Fallback Behavior**: When the worker couldn't find the expected wheel files in embedded assets, micropip would fall back to fetching packages from PyPI CDN, attempting to download `pyogrio` which isn't available in the 0.27.7 distribution.

3. **Package Availability Differences**: Some packages available in 0.28.0 are not available in 0.27.7, requiring careful dependency management.

**Fixed Files:**
- `src/lib/pyodide/pyodide-worker.ts` - Updated wheel filenames to match 0.27.7 versions
- Package list updated to use correct versions:
  - `numpy-2.0.2-cp312-cp312-pyodide_2024_0_wasm32.whl`
  - `pandas-2.2.3-cp312-cp312-pyodide_2024_0_wasm32.whl`
  - `fastparquet-2024.5.0-cp312-cp312-pyodide_2024_0_wasm32.whl`
  - `scikit_learn-1.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl`
  - `geopandas-1.0.1-py3-none-any.whl`

### Future Upgrade Considerations

When upgrading to a future Pyodide version (e.g., 0.28.x with geopandas support):

1. **Check Wheel Versions**: Update hardcoded wheel filenames in both `pyodide-manager.ts` and `pyodide-worker.ts` to match the new distribution's ABI version and Python version.

2. **Verify Package Availability**: Check the new `pyodide-lock.json` to ensure all required packages (especially geopandas and its dependencies) are available in the target version.

3. **Test Offline Functionality**: Ensure that all packages install from embedded assets without falling back to CDN, especially for geospatial packages that may have complex dependency chains.

4. **Update Asset Copying**: Verify that the Vite plugin correctly embeds all necessary wheel files from the new Pyodide distribution.

The key lesson is that Pyodide version changes require careful synchronization between the distribution assets and the hardcoded package references in the codebase.
