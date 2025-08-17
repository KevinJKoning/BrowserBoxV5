/**
 * Offline Cache Manager for Pyodide Packages
 * Manages pre-caching and validation of critical Python packages
 */

import { criticalPackageManifest, getAllCriticalWheelUrls } from './package-manifest.js';

export interface CacheStatus {
  isOnline: boolean;
  totalPackages: number;
  cachedPackages: number;
  missingPackages: string[];
  cacheSize: number; // in bytes
}

export class OfflineCacheManager {
  private readonly CACHE_NAME = 'pyodide-core-assets';
  private readonly baseUrl: string;
  
  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || `${window.location.origin}${window.location.pathname.includes('/BrowserBoxV5/') ? '/BrowserBoxV5' : ''}`;
  }
  
  /**
   * Check the current cache status
   */
  async getCacheStatus(): Promise<CacheStatus> {
    const isOnline = navigator.onLine;
    const criticalPackages = Object.keys(criticalPackageManifest);
    const totalPackages = criticalPackages.length;
    
    try {
      const cache = await caches.open(this.CACHE_NAME);
      const cachedRequests = await cache.keys();
      const cachedUrls = cachedRequests.map(req => req.url);
      
      const missingPackages: string[] = [];
      let cachedPackages = 0;
      let cacheSize = 0;
      
      for (const packageName of criticalPackages) {
        const manifest = criticalPackageManifest[packageName];
        if (!manifest) continue;
        
        const isPackageCached = cachedUrls.some(url => 
          url.includes(manifest.filename)
        );
        
        if (isPackageCached) {
          cachedPackages++;
        } else {
          missingPackages.push(packageName);
        }
      }
      
      // Calculate approximate cache size
      for (const request of cachedRequests) {
        try {
          const response = await cache.match(request);
          if (response) {
            const blob = await response.blob();
            cacheSize += blob.size;
          }
        } catch (error) {
          // Ignore individual file errors
        }
      }
      
      return {
        isOnline,
        totalPackages,
        cachedPackages,
        missingPackages,
        cacheSize
      };
    } catch (error) {
      console.error('Failed to check cache status:', error);
      return {
        isOnline,
        totalPackages,
        cachedPackages: 0,
        missingPackages: criticalPackages,
        cacheSize: 0
      };
    }
  }
  
  /**
   * Pre-cache all critical packages for offline use
   */
  async preCacheCriticalPackages(onProgress?: (progress: { loaded: number; total: number; package: string }) => void): Promise<void> {
    const cache = await caches.open(this.CACHE_NAME);
    const wheelUrls = getAllCriticalWheelUrls(this.baseUrl);
    
    console.log(`Pre-caching ${wheelUrls.length} critical Python packages...`);
    
    let loaded = 0;
    const total = wheelUrls.length;
    
    // Cache packages in batches to avoid overwhelming the browser
    const batchSize = 5;
    for (let i = 0; i < wheelUrls.length; i += batchSize) {
      const batch = wheelUrls.slice(i, i + batchSize);
      
      await Promise.allSettled(
        batch.map(async (url) => {
          try {
            const packageName = this.extractPackageNameFromUrl(url);
            
            // Check if already cached
            const cachedResponse = await cache.match(url);
            if (cachedResponse) {
              loaded++;
              onProgress?.({ loaded, total, package: packageName });
              return;
            }
            
            // Cache the package
            await cache.add(url);
            loaded++;
            onProgress?.({ loaded, total, package: packageName });
            
            console.log(`Cached: ${packageName}`);
          } catch (error) {
            console.warn(`Failed to cache ${url}:`, error);
            loaded++; // Still count as processed
            onProgress?.({ loaded, total, package: this.extractPackageNameFromUrl(url) });
          }
        })
      );
    }
    
    console.log(`Successfully processed ${loaded}/${total} packages`);
  }
  
  /**
   * Validate that all critical packages are available offline
   */
  async validateOfflineAvailability(): Promise<{
    isReady: boolean;
    missingPackages: string[];
    suggestions: string[];
  }> {
    const status = await this.getCacheStatus();
    const isReady = status.missingPackages.length === 0;
    
    const suggestions: string[] = [];
    if (!isReady) {
      if (!status.isOnline) {
        suggestions.push('Connect to the internet to download missing packages');
      } else {
        suggestions.push('Run pre-caching to download missing packages');
      }
      
      if (status.missingPackages.length > 0) {
        suggestions.push(`Missing packages: ${status.missingPackages.slice(0, 5).join(', ')}${status.missingPackages.length > 5 ? '...' : ''}`);
      }
    }
    
    return {
      isReady,
      missingPackages: status.missingPackages,
      suggestions
    };
  }
  
  /**
   * Clear the package cache
   */
  async clearCache(): Promise<void> {
    await caches.delete(this.CACHE_NAME);
    console.log('Pyodide package cache cleared');
  }
  
  /**
   * Get formatted cache size string
   */
  formatCacheSize(bytes: number): string {
    const sizes = ['B', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 B';
    
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${sizes[i]}`;
  }
  
  /**
   * Extract package name from wheel URL
   */
  private extractPackageNameFromUrl(url: string): string {
    const filename = url.split('/').pop() || '';
    const match = filename.match(/^([^-]+)/);
    return match ? match[1] : filename;
  }
}

// Singleton instance
export const offlineCacheManager = new OfflineCacheManager();