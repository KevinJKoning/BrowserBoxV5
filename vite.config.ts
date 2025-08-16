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
			'@core': '/src/lib/core',
			'@utils': '/src/lib/utils',
			'@ui': '/src/lib/components/ui',
			'@plugins': '/src/plugins',
			'@worker': '/src/lib/pyodide'
		}
	},
	plugins: [
		tailwindcss(), 
		svelte({
			// Only process real .svelte files; .svelte.ts legacy hybrids removed
			extensions: ['.svelte']
		}),
		viteStaticCopyPyodide(),
		VitePWA({
			registerType: 'autoUpdate',
			workbox: {
				maximumFileSizeToCacheInBytes: 15 * 1024 * 1024, // 15MB
				runtimeCaching: [
					{
						// Core Pyodide assets plus wheels now all live under /assets
						urlPattern: /^.*\/assets\/(.*\.(wasm|zip|json|js|whl|data)).*$/,
						handler: 'CacheFirst',
						options: {
							cacheName: 'pyodide-core-assets',
							expiration: {
								maxEntries: 20,
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
