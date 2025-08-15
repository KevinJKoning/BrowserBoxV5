import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import { viteStaticCopy } from 'vite-plugin-static-copy';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const PYODIDE_EXCLUDE = [
	"!**/*.{md,html}",
	"!**/*.d.ts",
	"!**/*.whl",
	"!**/node_modules",
];

export function viteStaticCopyPyodide() {
	// Use our local pyodide_0-27-7 directory instead of npm package
	// We must copy ALL wheels and support files or SRI (integrity) checks will fail when
	// Pyodide attempts to fetch packages listed in pyodide-lock.json. Previously only a
	// subset was copied which caused fetch() to retrieve a 404 fallback (HTML) and thus
	// mismatch the expected SHA-256 digest -> integrity errors & missing packages (e.g. numpy).
	return viteStaticCopy({
		targets: [
			{
				// Copy everything in the local build directory (wheels, wasm, lock file, stdlib, etc.)
				src: 'pyodide_0-27-7/**',
				dest: 'assets',
			},
		],
	});
}

export default defineConfig(({ command, mode }) => ({
	base: mode === 'production' ? '/BrowserBoxV5/' : '/',
	plugins: [
		tailwindcss(), 
		svelte(),
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
				start_url: mode === 'production' ? '/BrowserBoxV5/' : '/',
				scope: mode === 'production' ? '/BrowserBoxV5/' : '/',
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
