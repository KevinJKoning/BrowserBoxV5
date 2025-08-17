import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';


export function viteStaticCopyPyodide() {
	// Use local pyodide_0-27-7 directory for compatibility
	return viteStaticCopy({
		targets: [
			{
				// Copy everything from local pyodide_0-27-7 directory
				src: 'pyodide_0-27-7/*',
				dest: 'assets',
			},
		],
	});
}

export default defineConfig(({ command, mode }) => ({
	base: '/',
	resolve: {
		alias: {
			'@core': '/src/core',
			'@utils': '/src/lib/utils',
			'@ui': '/src/lib/components/ui',
			'@plugins': '/src/plugins',
			'@worker': '/src/core/pyodide',
			'@config': '/src/lib/config'
		}
	},
	plugins: [
		tailwindcss(), 
		svelte({
			// Only process real .svelte files; .svelte.ts legacy hybrids removed
			extensions: ['.svelte'],
			inspector: {
				// Enable Svelte Inspector in development mode
				toggleKeyCombo: 'meta-shift',
				holdMode: true,
				showToggleButton: 'always',
				toggleButtonPos: 'top-right'
			}
		}),
		viteStaticCopyPyodide(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				maximumFileSizeToCacheInBytes: 120 * 1024 * 1024, // 120MB for critical Python packages + core files
				// Pre-cache critical Python packages for offline use
				additionalManifestEntries: [
					// Core Pyodide files
					{ url: '/assets/pyodide.js', revision: null },
					{ url: '/assets/pyodide.asm.js', revision: null },
					{ url: '/assets/pyodide.asm.wasm', revision: null },
					{ url: '/assets/python_stdlib.zip', revision: null },
					
					// Critical Python packages - Core data science stack
					{ url: '/assets/numpy-2.0.2-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					{ url: '/assets/pandas-2.2.3-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					{ url: '/assets/matplotlib-3.8.4-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					{ url: '/assets/scipy-1.14.1-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					
					// Machine learning
					{ url: '/assets/scikit_learn-1.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					{ url: '/assets/statsmodels-0.14.4-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					
					// Geospatial packages
					{ url: '/assets/geopandas-1.0.1-py3-none-any.whl', revision: null },
					{ url: '/assets/shapely-2.0.6-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					{ url: '/assets/pyproj-3.6.1-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					{ url: '/assets/fiona-1.9.5-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					
					// File handling
					{ url: '/assets/fastparquet-2024.5.0-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					
					// Network and utilities
					{ url: '/assets/requests-2.31.0-py3-none-any.whl', revision: null },
					{ url: '/assets/micropip-0.9.0-py3-none-any.whl', revision: null },
					
					// Essential dependencies
					{ url: '/assets/packaging-24.2-py3-none-any.whl', revision: null },
					{ url: '/assets/python_dateutil-2.9.0.post0-py2.py3-none-any.whl', revision: null },
					{ url: '/assets/pytz-2024.1-py2.py3-none-any.whl', revision: null },
					{ url: '/assets/tzdata-2024.1-py2.py3-none-any.whl', revision: null },
					{ url: '/assets/six-1.16.0-py2.py3-none-any.whl', revision: null },
					{ url: '/assets/certifi-2024.12.14-py3-none-any.whl', revision: null },
					{ url: '/assets/charset_normalizer-3.3.2-py3-none-any.whl', revision: null },
					{ url: '/assets/idna-3.7-py3-none-any.whl', revision: null },
					{ url: '/assets/urllib3-2.2.3-py3-none-any.whl', revision: null },
					
					// Matplotlib dependencies
					{ url: '/assets/contourpy-1.3.0-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					{ url: '/assets/cycler-0.12.1-py3-none-any.whl', revision: null },
					{ url: '/assets/fonttools-4.51.0-py3-none-any.whl', revision: null },
					{ url: '/assets/kiwisolver-1.4.5-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					{ url: '/assets/pillow-10.2.0-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					{ url: '/assets/pyparsing-3.1.2-py3-none-any.whl', revision: null },
					
					// Scikit-learn dependencies
					{ url: '/assets/joblib-1.4.0-py3-none-any.whl', revision: null },
					{ url: '/assets/threadpoolctl-3.5.0-py3-none-any.whl', revision: null },
					
					// Other critical dependencies
					{ url: '/assets/attrs-23.2.0-py3-none-any.whl', revision: null },
					{ url: '/assets/click-8.1.7-py3-none-any.whl', revision: null },
					{ url: '/assets/cligj-0.7.2-py3-none-any.whl', revision: null },
					{ url: '/assets/munch-4.0.0-py2.py3-none-any.whl', revision: null },
					{ url: '/assets/cramjam-2.8.3-cp312-cp312-pyodide_2024_0_wasm32.whl', revision: null },
					{ url: '/assets/patsy-0.5.6-py2.py3-none-any.whl', revision: null }
				],
				runtimeCaching: [
					{
						// Core Pyodide assets plus any additional wheels
						urlPattern: /^.*\/assets\/(.*\.(wasm|zip|json|js|whl|data)).*$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'pyodide-core-assets',
							expiration: {
								maxEntries: 100, // Increased for more packages
								maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
							}
						}
					}
				]
			},
			manifest: {
				name: 'PRAv3 - File Management System',
				short_name: 'PRAv3',
				description: 'Progressive file management system with Python analysis capabilities',
				theme_color: '#ffffff',
				background_color: '#ffffff',
				display: 'standalone',
				start_url: '/',
				scope: '/',
				icons: [
					{
						src: 'icon.svg',
						sizes: '192x192',
						type: 'image/svg+xml'
					},
					{
						src: 'icon.svg',
						sizes: '512x512',
						type: 'image/svg+xml'
					}
				]
			}
		})
	],
	build: {
		target: 'esnext',
		outDir: 'dist'
	},
	server: {
		fs: {
			allow: ['..']
		},
		headers: {
			'Cross-Origin-Embedder-Policy': 'require-corp',
			'Cross-Origin-Opener-Policy': 'same-origin'
		}
	},
	optimizeDeps: { 
		exclude: ["pyodide"] 
	},
	test: {
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					environment: 'browser',
					browser: {
						enabled: true,
						provider: 'playwright',
						instances: [{ browser: 'chromium' }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**'],
					setupFiles: ['./vitest-setup-client.ts']
				}
			},
			{
				extends: './vite.config.ts',
				test: {
					name: 'server',
					environment: 'node',
					include: ['src/**/*.{test,spec}.{js,ts}'],
					exclude: ['src/**/*.svelte.{test,spec}.{js,ts}']
				}
			}
		]
	}
}));
