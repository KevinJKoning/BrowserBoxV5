<script module lang="ts">
  import { configLoader, type ConfigPackage } from '@core/config-runtime/loader';
  import { select, clearOtherSelections, getSelection } from '@core/state/workspace.svelte';
  import { registerSelectionResolver } from '@utils/breadcrumbs.ts';

  // Configuration management state
  const state = $state({
    activePackages: [] as ConfigPackage[],
    activeConfigId: null as string | null, // Track which configuration is currently active
    isLoading: false,
    loadingMessage: '',
    errorMessage: '',
    successMessage: ''
  });

  export const activePackages = state.activePackages;
  export function getIsLoading() { return state.isLoading; }
  export function getLoadingMessage() { return state.loadingMessage; }
  export function getErrorMessage() { return state.errorMessage; }
  export function getSuccessMessage() { return state.successMessage; }

  // Function to refresh active packages (called manually when needed)
  export function refreshActivePackages() {
    state.activePackages.length = 0;
    state.activePackages.push(...configLoader.getActivePackages());
  }

  export async function loadConfigurationPackage(file: File): Promise<ConfigPackage> {
    clearMessages();
    state.isLoading = true;
    state.loadingMessage = 'Loading configuration package...';
    
    try {
      state.loadingMessage = 'Extracting ZIP package...';
      const configPackage = await configLoader.loadAndApplyPackage(file);
      
      state.loadingMessage = 'Applying configuration...';
      
      // Update active packages list
      refreshActivePackages();
      
      state.successMessage = `Successfully loaded configuration: ${configPackage.name} v${configPackage.version}`;
      
      return configPackage;
      
    } catch (error) {
      state.errorMessage = `Failed to load configuration: ${error instanceof Error ? error.message : String(error)}`;
      throw error;
    } finally {
      state.isLoading = false;
      state.loadingMessage = '';
    }
  }

  export function clearMessages(): void {
    state.errorMessage = '';
    state.successMessage = '';
  }

  export function selectPackage(packageId: string | null): void {
    clearOtherSelections('config-package');
    select('config-package', packageId);
  }

  export function getSelectedPackage(): ConfigPackage | null {
    const selectedId = getSelection('config-package');
    if (!selectedId) return null;
    return state.activePackages.find(pkg => (pkg.name + pkg.version) === selectedId) || null;
  }

  export function isPackageSelected(pkg: ConfigPackage): boolean {
    return getSelection('config-package') === (pkg.name + pkg.version);
  }

  export function getPackageStats(pkg: ConfigPackage) {
    return {
      files: pkg.files?.length || 0,
      scripts: pkg.scripts?.length || 0,
      schemas: pkg.schemas?.length || 0,
      plugins: pkg.plugins?.length || 0
    };
  }

  export function getActivePackages(): ConfigPackage[] {
    return state.activePackages;
  }

  export async function activatePackage(pkg: ConfigPackage): Promise<void> {
    clearMessages();
    state.isLoading = true;
    state.loadingMessage = `Activating configuration: ${pkg.name} v${pkg.version}...`;
    
    try {
      // Apply the package to all plugin stores
      await configLoader.applyPackageToStores(pkg);
      
      // Set this package as the active configuration
      const packageId = pkg.name + pkg.version;
      state.activeConfigId = packageId;
      
      // Keep the package selected to show the detail view
      selectPackage(packageId);
      
      state.successMessage = `Successfully activated configuration: ${pkg.name} v${pkg.version}`;
      
    } catch (error) {
      state.errorMessage = `Failed to activate configuration: ${error instanceof Error ? error.message : String(error)}`;
      throw error;
    } finally {
      state.isLoading = false;
      state.loadingMessage = '';
    }
  }

  export function isPackageActive(pkg: ConfigPackage): boolean {
    const packageId = pkg.name + pkg.version;
    return state.activeConfigId === packageId;
  }

  export function getActiveConfigId(): string | null {
    return state.activeConfigId;
  }

  // Register breadcrumb resolver for configuration packages
  registerSelectionResolver('config-package', {
    getDisplayName: (id: string) => {
      const pkg = state.activePackages.find(p => (p.name + p.version) === id);
      return pkg ? `${pkg.name} v${pkg.version}` : null;
    },
    getStatus: (id: string) => {
      const pkg = state.activePackages.find(p => (p.name + p.version) === id);
      if (!pkg) return 'unknown';
      return isPackageActive(pkg) ? 'active' : pkg.isValid ? 'valid' : 'invalid';
    }
  });
</script>