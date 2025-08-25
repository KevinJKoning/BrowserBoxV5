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
				maximumFileSizeToCacheInBytes: 400 * 1024 * 1024, // 400MB for all Python packages + assets
				// Don't exclude anything - we want to cache all assets for offline use
				globIgnores: [],
				// Include all files in assets directory
				globPatterns: [
					'**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,eot}',
					'**/*.{wasm,zip,whl,data,json}', // Pyodide and Python files
					'manifest.webmanifest',
					'registerSW.js'
				],
				// Ensure consistent URL paths for cross-platform compatibility
				manifestTransforms: [
					(manifestEntries) => {
						// Ensure all asset URLs start with / for absolute paths
						const manifest = manifestEntries.map(entry => ({
							...entry,
							url: entry.url.startsWith('/') ? entry.url : `/${entry.url}`
						}));
						return { manifest };
					}
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
					},
					{
						// Web assets (CSS, images, fonts, etc.)
						urlPattern: /^.*\/assets\/(.*\.(css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)).*$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'web-assets',
							expiration: {
								maxEntries: 50,
								maxAgeSeconds: 60 * 60 * 24 * 30 // 30 days
							}
						}
					}
				]
			},
			manifest: {
				name: 'BrowserBox',
				short_name: 'BrowserBox',
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
