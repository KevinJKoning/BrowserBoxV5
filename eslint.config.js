import prettier from 'eslint-config-prettier';
import { includeIgnoreFile } from '@eslint/compat';
import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';
import svelteConfig from './svelte.config.js';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

// We build a focused, type-aware configuration only over our source files.
export default ts.config(
	includeIgnoreFile(gitignorePath),
	js.configs.recommended,
	// Type-aware rules (stricter, aligns with TS server diagnostics)
	...ts.configs.recommendedTypeChecked,
	...svelte.configs.recommended,
	prettier,
	...svelte.configs.prettier,
	{
		name: 'app/pyodide-internals',
		files: ['src/core/pyodide/internal/**/*.ts'],
		rules: {
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off'
		}
	},
	{
		name: 'app/util-dependencies-relax',
		files: ['src/lib/utils/dependencies.ts'],
		rules: {
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off'
		}
	},
	{
		name: 'app/parquet-preview-relax',
		files: ['src/core/services/preview/parquet-preview.svelte'],
		rules: {
			'@typescript-eslint/no-base-to-string': 'off'
		}
	},
	{
		name: 'app/base-overrides',
		files: ['src/**/*.{ts,js,cts,mts}','src/**/*.svelte'],
		ignores: [
			'pyodide_0-27-7/**', // vendored assets (binary / generated)
			'dist/**',
			'build/**',
			'build-inline/**'
		],
		languageOptions: {
			globals: { ...globals.browser, ...globals.node },
					parserOptions: {
						project: ['./tsconfig.eslint.json'],
						tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url))
					}
		},
		rules: {
			'no-undef': 'off',
			// Allow intentional unused vars/args prefixed with _
			'@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true }],
			// Keep explicit any banned in source .ts / .svelte script blocks
			'@typescript-eslint/no-explicit-any': 'error',
			// Helpful for catching subtle logic mistakes
			'@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
			// Allow empty interfaces only when extending something else (already covered by rule) – keep default
			'@typescript-eslint/no-empty-object-type': ['error', { allowInterfaces: 'with-single-extends' }],
			// Enforce use of path aliases instead of deep relative traversal into config/core domains
			'no-restricted-imports': ['error', {
				patterns: [
					'../**/lib/config/*',
					'../../lib/config/*',
					'../../../lib/config/*',
					'../../core/state/*',
					'../../../core/state/*'
				]
			}]
			// Svelte specifics already covered by plugin; we can tighten keys requirement (already default) if needed
		}
	},
	{
		name: 'app/svelte-specific',
		files: ['src/**/*.svelte', 'src/**/*.svelte.ts', 'src/**/*.svelte.js'],
		languageOptions: {
			parserOptions: {
			project: ['./tsconfig.eslint.json'],
				extraFileExtensions: ['.svelte'],
				parser: ts.parser,
				svelteConfig
			}
		},
		rules: {
			// Relax "unsafe" rules inside Svelte components due to current Svelte 5 runes
			// macro typing gaps that surface large volumes of low‑value noise. Keep them
			// enforced in plain .ts files where types are explicit.
			'@typescript-eslint/no-unsafe-assignment': 'off',
			'@typescript-eslint/no-unsafe-call': 'off',
			'@typescript-eslint/no-unsafe-member-access': 'off',
			'@typescript-eslint/no-unsafe-argument': 'off',
			'@typescript-eslint/no-unsafe-return': 'off',
			// Allow lightweight async placeholders in component scripts
			'@typescript-eslint/require-await': 'off',
			// Svelte plugin handles reactivity; additional tightening can be revisited later
		}
	},
	{
		name: 'app/declarations-relaxed',
		files: ['**/*.d.ts'],
		rules: {
			// So that third-party or ambient d.ts (if added later) don't explode lint
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/no-explicit-any': 'off'
		}
	}
);
