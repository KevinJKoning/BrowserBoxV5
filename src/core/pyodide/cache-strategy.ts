/**
 * Pyodide Package Caching Strategy
 * Ensures critical packages are available offline
 */

export interface CacheConfig {
  // Core packages that should always be cached for offline use
  criticalPackages: string[];
  
  // Optional packages that can be cached on-demand
  optionalPackages: string[];
  
  // Cache settings
  maxCacheAge: number; // in milliseconds
  maxCacheEntries: number;
}

/**
 * Configuration for packages that need to be cached for offline use
 */
export const pyodideCacheConfig: CacheConfig = {
  // Critical packages for core functionality - these should be pre-cached
  criticalPackages: [
    // Core Python ecosystem
    'numpy',
    'pandas', 
    'matplotlib',
    'scipy',
    
    // Machine learning stack
    'scikit-learn',
    'statsmodels',
    
    // Geospatial stack 
    'geopandas',
    'shapely',
    'pyproj',
    
    // File handling
    'fastparquet',
    
    // Network/utilities
    'requests',
    'micropip'
  ],
  
  // Additional packages that can be cached on-demand
  optionalPackages: [
    'pillow',
    'networkx',
    'joblib',
    'threadpoolctl',
    'packaging',
    'python-dateutil',
    'pytz',
    'six',
    'certifi',
    'charset-normalizer',
    'idna',
    'urllib3'
  ],
  
  // Cache for 1 year (matching current config)
  maxCacheAge: 365 * 24 * 60 * 60 * 1000,
  
  // Limit cache entries to prevent storage bloat
  maxCacheEntries: 50
};

/**
 * Gets the list of package URLs that should be pre-cached
 */
export function getCriticalPackageUrls(baseUrl: string): string[] {
  const urls: string[] = [];
  
  for (const pkg of pyodideCacheConfig.criticalPackages) {
    // These are the patterns for pyodide wheel files
    urls.push(`${baseUrl}/assets/${pkg}-*.whl`);
  }
  
  return urls;
}

/**
 * Validates if all critical packages are cached
 */
export async function validateCriticalPackagesCache(): Promise<{
  cached: string[];
  missing: string[];
}> {
  const cache = await caches.open('pyodide-core-assets');
  const requests = await cache.keys();
  const cachedUrls = requests.map(req => req.url);
  
  const cached: string[] = [];
  const missing: string[] = [];
  
  for (const pkg of pyodideCacheConfig.criticalPackages) {
    const isPackageCached = cachedUrls.some(url => 
      url.includes(`${pkg}-`) && url.endsWith('.whl')
    );
    
    if (isPackageCached) {
      cached.push(pkg);
    } else {
      missing.push(pkg);
    }
  }
  
  return { cached, missing };
}

/**
 * Pre-cache critical packages on service worker installation
 */
export async function preCacheCriticalPackages(baseUrl: string): Promise<void> {
  try {
    console.log('Pre-caching critical Python packages...');
    
    const cache = await caches.open('pyodide-core-assets');
    
    // Get actual wheel files from the pyodide distribution
    const packageUrls: string[] = [];
    
    for (const pkg of pyodideCacheConfig.criticalPackages) {
      try {
        // Try to find the actual wheel file for this package
        const response = await fetch(`${baseUrl}/assets/`);
        const text = await response.text();
        
        // Extract wheel filename from directory listing or package metadata
        const wheelPattern = new RegExp(`${pkg}[^"]*\\.whl`, 'gi');
        const matches = text.match(wheelPattern);
        
        if (matches && matches.length > 0) {
          const wheelFile = matches[0];
          packageUrls.push(`${baseUrl}/assets/${wheelFile}`);
        }
      } catch (error) {
        console.warn(`Could not find wheel for package ${pkg}:`, error);
      }
    }
    
    // Pre-cache the wheel files
    await cache.addAll(packageUrls.filter(url => url));
    
    console.log(`Successfully pre-cached ${packageUrls.length} critical packages`);
    
  } catch (error) {
    console.error('Failed to pre-cache critical packages:', error);
  }
}