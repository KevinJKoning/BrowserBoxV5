import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { pyodideEmbedPlugin } from './vite-pyodide-embed.js';

export default defineConfig(({ command }) => ({
	plugins: [
		tailwindcss(), 
		svelte(),
		pyodideEmbedPlugin(),
		viteSingleFile({
			removeViteModuleLoader: true,
			deleteInlinedFiles: true,
			useRecommendedBuildConfig: true,
			inlinePattern: ['**/*.js', '**/*.css', '**/*.wasm', '**/*.whl', '**/*.zip', '**/*.json']
		})
	],
	build: {
		target: 'esnext',
		assetsInlineLimit: 100000000, // Very large limit to inline everything
		chunkSizeWarningLimit: 100000000,
		cssCodeSplit: false,
		outDir: 'dist',
		rollupOptions: {
			output: {
				inlineDynamicImports: true,
				assetFileNames: '[name].[ext]'
			}
		}
	},
	publicDir: command === 'serve' ? 'public' : false, // Serve public dir in dev, but don't copy to build
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
		exclude: ['pyodide']
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
