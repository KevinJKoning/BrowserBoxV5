import tailwindcss from '@tailwindcss/vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';
import path from 'node:path';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
	plugins: [
		tailwindcss(), 
		svelte(),
		viteSingleFile()
	],
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
		},
	},
	build: {
		outDir: 'build-inline',
		emptyOutDir: true,
		assetsInlineLimit: 100000000, // 100MB - inline everything
		chunkSizeWarningLimit: 100000000,
		rollupOptions: {
			output: {
				inlineDynamicImports: true,
			}
		}
	}
});
