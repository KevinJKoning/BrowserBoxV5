/**
 * Pyodide Package Manifest
 * Contains the exact wheel filenames for critical packages to enable proper caching
 */

export interface PackageManifest {
  [packageName: string]: {
    filename: string;
    dependencies: string[];
  };
}

/**
 * Critical package manifest with exact wheel filenames from pyodide-lock.json
 * This ensures we can pre-cache the exact files needed for offline use
 */
export const criticalPackageManifest: PackageManifest = {
  // Core scientific computing
  'numpy': {
    filename: 'numpy-2.0.2-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: []
  },
  'pandas': {
    filename: 'pandas-2.2.3-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: ['numpy', 'python-dateutil', 'pytz', 'tzdata']
  },
  'matplotlib': {
    filename: 'matplotlib-3.8.4-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: ['contourpy', 'cycler', 'fonttools', 'kiwisolver', 'numpy', 'packaging', 'pillow', 'pyparsing', 'python-dateutil']
  },
  'scipy': {
    filename: 'scipy-1.14.1-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: ['numpy']
  },
  
  // Machine learning
  'scikit-learn': {
    filename: 'scikit_learn-1.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: ['numpy', 'scipy', 'joblib', 'threadpoolctl']
  },
  'statsmodels': {
    filename: 'statsmodels-0.14.4-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: ['numpy', 'scipy', 'pandas', 'patsy', 'packaging']
  },
  
  // Geospatial packages
  'geopandas': {
    filename: 'geopandas-1.0.1-py3-none-any.whl',
    dependencies: ['fiona', 'packaging', 'pandas', 'pyproj', 'shapely']
  },
  'shapely': {
    filename: 'shapely-2.0.6-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: ['numpy']
  },
  'pyproj': {
    filename: 'pyproj-3.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: ['certifi']
  },
  'fiona': {
    filename: 'fiona-1.9.5-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: ['attrs', 'certifi', 'click', 'cligj', 'munch']
  },
  
  // File handling
  'fastparquet': {
    filename: 'fastparquet-2024.5.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: ['numpy', 'pandas', 'packaging', 'cramjam']
  },
  
  // Network and utilities
  'requests': {
    filename: 'requests-2.31.0-py3-none-any.whl',
    dependencies: ['certifi', 'charset-normalizer', 'idna', 'urllib3']
  },
  'micropip': {
    filename: 'micropip-0.9.0-py3-none-any.whl',
    dependencies: ['packaging']
  },
  
  // Core dependencies
  'packaging': {
    filename: 'packaging-24.2-py3-none-any.whl',
    dependencies: []
  },
  'python-dateutil': {
    filename: 'python_dateutil-2.9.0.post0-py2.py3-none-any.whl',
    dependencies: ['six']
  },
  'pytz': {
    filename: 'pytz-2024.1-py2.py3-none-any.whl',
    dependencies: []
  },
  'tzdata': {
    filename: 'tzdata-2024.1-py2.py3-none-any.whl',
    dependencies: []
  },
  'six': {
    filename: 'six-1.16.0-py2.py3-none-any.whl',
    dependencies: []
  },
  'certifi': {
    filename: 'certifi-2024.12.14-py3-none-any.whl',
    dependencies: []
  },
  'charset-normalizer': {
    filename: 'charset_normalizer-3.3.2-py3-none-any.whl',
    dependencies: []
  },
  'idna': {
    filename: 'idna-3.7-py3-none-any.whl',
    dependencies: []
  },
  'urllib3': {
    filename: 'urllib3-2.2.3-py3-none-any.whl',
    dependencies: []
  },
  'contourpy': {
    filename: 'contourpy-1.3.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: ['numpy']
  },
  'cycler': {
    filename: 'cycler-0.12.1-py3-none-any.whl',
    dependencies: []
  },
  'fonttools': {
    filename: 'fonttools-4.51.0-py3-none-any.whl',
    dependencies: []
  },
  'kiwisolver': {
    filename: 'kiwisolver-1.4.5-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: []
  },
  'pillow': {
    filename: 'pillow-10.2.0-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: []
  },
  'pyparsing': {
    filename: 'pyparsing-3.1.2-py3-none-any.whl',
    dependencies: []
  },
  'joblib': {
    filename: 'joblib-1.4.0-py3-none-any.whl',
    dependencies: []
  },
  'threadpoolctl': {
    filename: 'threadpoolctl-3.5.0-py3-none-any.whl',
    dependencies: []
  },
  'patsy': {
    filename: 'patsy-0.5.6-py2.py3-none-any.whl',
    dependencies: ['numpy', 'six']
  },
  'attrs': {
    filename: 'attrs-23.2.0-py3-none-any.whl',
    dependencies: ['six']
  },
  'click': {
    filename: 'click-8.1.7-py3-none-any.whl',
    dependencies: []
  },
  'cligj': {
    filename: 'cligj-0.7.2-py3-none-any.whl',
    dependencies: ['click']
  },
  'munch': {
    filename: 'munch-4.0.0-py2.py3-none-any.whl',
    dependencies: ['six']
  },
  'cramjam': {
    filename: 'cramjam-2.8.3-cp312-cp312-pyodide_2024_0_wasm32.whl',
    dependencies: []
  }
};

/**
 * Gets all wheel files that need to be pre-cached (including dependencies)
 */
export function getAllCriticalWheelUrls(baseUrl: string): string[] {
  const wheelUrls = new Set<string>();
  
  // Get all packages including dependencies
  const allPackages = new Set<string>();
  
  function addPackageAndDeps(packageName: string) {
    if (allPackages.has(packageName)) return;
    
    const manifest = criticalPackageManifest[packageName];
    if (!manifest) {
      console.warn(`Package ${packageName} not found in manifest`);
      return;
    }
    
    allPackages.add(packageName);
    
    // Add dependencies
    manifest.dependencies.forEach(dep => addPackageAndDeps(dep));
  }
  
  // Add all critical packages and their dependencies
  Object.keys(criticalPackageManifest).forEach(pkg => addPackageAndDeps(pkg));
  
  // Convert to URLs
  allPackages.forEach(pkg => {
    const manifest = criticalPackageManifest[pkg];
    if (manifest) {
      wheelUrls.add(`${baseUrl}/assets/${manifest.filename}`);
    }
  });
  
  return Array.from(wheelUrls);
}

/**
 * Checks if a package is in our critical package list
 */
export function isCriticalPackage(packageName: string): boolean {
  return packageName in criticalPackageManifest;
}