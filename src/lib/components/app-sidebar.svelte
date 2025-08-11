<script lang="ts" module>
	import DatabaseIcon from "@lucide/svelte/icons/database";
	import CodeIcon from "@lucide/svelte/icons/code";
	import BarChartIcon from "@lucide/svelte/icons/bar-chart";
	import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";
	import FileIcon from "@lucide/svelte/icons/file";
	import { fileRequirements } from "../config/file-config.js";

	// This is sample data
	const data = {
		user: {
			name: "shadcn",
			email: "m@example.com",
			avatar: "",
		},
		navMain: [
			{
				title: "Required Files",
				url: "#",
				icon: DatabaseIcon,
				isActive: true,
			},
			{
				title: "Schema Validation",
				url: "#",
				icon: ShieldCheckIcon,
				isActive: false,
			},
			{
				title: "Scripts",
				url: "#",
				icon: CodeIcon,
				isActive: false,
			},
			{
				title: "Results",
				url: "#",
				icon: BarChartIcon,
				isActive: false,
			},
		],
	};
</script>

<script lang="ts">
	import FileCard from "./file-card.svelte";
	import SchemaCard from "./schema-card.svelte";
	import ScriptCard from "./script-card.svelte";
	import ResultCard from "./result-card.svelte";
	import { Button } from "./ui/button/index.js";
	import { Label } from "./ui/label/index.js";
	import { useSidebar } from "./ui/sidebar/context.svelte.js";
	import * as Sidebar from "./ui/sidebar/index.js";
	import { fileManagerState, fileSelectors, fileActions } from "../stores/file-store.svelte.js";
	import { schemaManagerState, schemaSelectors, schemaActions } from "../stores/schema-store.svelte.js";
	import { scriptManagerState, scriptSelectors, scriptActions } from "../stores/script-store.svelte.js";
	import { resultsManagerState, resultsSelectors, resultsActions } from "../stores/results-store.svelte.js";
	import PlayIcon from "@lucide/svelte/icons/play";
	import XIcon from "@lucide/svelte/icons/x";
	import DownloadIcon from "@lucide/svelte/icons/download";
	import FolderUpIcon from "@lucide/svelte/icons/folder-up";
	import type { ComponentProps } from "svelte";

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();

	let activeItem = $state(data.navMain[0]);
	let currentFiles = $state(fileRequirements);
	let searchQuery = $state("");
	
	// Schema-related state - direct reactive access
	const availableSchemas = $derived(schemaManagerState.availableSchemas);
	
	// Script-related state - direct reactive access
	const availableScripts = $derived(scriptManagerState.availableScripts);
	
	// Results-related state - direct reactive access
	const availableResults = $derived(Object.values(resultsManagerState.resultFiles));
	
	const sidebar = useSidebar();

	// Modern runes-based reactive filtering for files
	const filteredFiles = $derived.by(() => {
		let files = currentFiles;
		
		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			files = files.filter(file => 
				file.title.toLowerCase().includes(query) ||
				file.description.toLowerCase().includes(query) ||
				file.defaultFilename.toLowerCase().includes(query)
			);
		}
		
		return files;
	});

	// Modern runes-based reactive filtering for schemas
	const filteredSchemas = $derived.by(() => {
		let schemas = availableSchemas;
		
		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			schemas = schemas.filter(schema => 
				schema.title.toLowerCase().includes(query) ||
				schema.description.toLowerCase().includes(query) ||
				schema.filename.toLowerCase().includes(query) ||
				(schema.category && schema.category.toLowerCase().includes(query))
			);
		}
		
		return schemas;
	});

	// Modern runes-based reactive filtering for scripts
	const filteredScripts = $derived.by(() => {
		let scripts = availableScripts;
		
		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			scripts = scripts.filter(script => 
				script.title.toLowerCase().includes(query) ||
				script.description.toLowerCase().includes(query) ||
				script.filename.toLowerCase().includes(query) ||
				(script.category && script.category.toLowerCase().includes(query))
			);
		}
		
		return scripts;
	});

	// Modern runes-based reactive filtering for results
	const filteredResults = $derived.by(() => {
		let results = availableResults;
		
		// Filter by search query
		if (searchQuery.trim()) {
			const query = searchQuery.toLowerCase().trim();
			results = results.filter(result => 
				result.filename.toLowerCase().includes(query) ||
				result.fileType.toLowerCase().includes(query) ||
				(result.description && result.description.toLowerCase().includes(query))
			);
		}
		
		return results;
	});

	// Handle file upload
	const handleUpload = async (fileId: string) => {
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.parquet';
		
		input.onchange = async (e) => {
			const file = (e.target as HTMLInputElement).files?.[0];
			if (file) {
				try {
					await fileActions.loadFile(fileId, file);
				} catch (error) {
					console.error('File loading failed:', error);
				}
			}
		};
		
		input.click();
	};

	// Handle folder upload (Upload All functionality)
	const handleUploadAll = async () => {
		const input = document.createElement('input');
		input.type = 'file';
		input.webkitdirectory = true; // Enable folder selection
		input.multiple = true;
		input.accept = '.parquet';
		
		input.onchange = async (e) => {
			const files = Array.from((e.target as HTMLInputElement).files || []);
			if (files.length > 0) {
				try {
					const result = await fileActions.loadFilesFromFolder(files);
					
					// Show user feedback about the upload results
					if (result.matched > 0) {
						console.log(`Successfully uploaded ${result.matched} out of ${result.total} parquet files.`);
					}
					if (result.errors.length > 0) {
						console.warn('Some files failed to upload:', result.errors);
					}
					if (result.matched === 0 && result.total > 0) {
						console.warn(`Found ${result.total} parquet files but none matched expected filenames.`);
					}
				} catch (error) {
					console.error('Folder upload failed:', error);
				}
			}
		};
		
		input.click();
	};

	// Handle file removal
	const handleRemove = (fileId: string) => {
		fileActions.removeFile(fileId);
	};

	// Handle file preview - now uses modern runes
	const handlePreview = (fileId: string) => {
		// Clear schema, script and result selections when selecting a file
		schemaActions.selectSchema(null);
		scriptActions.selectScript(null);
		resultsActions.selectResult(null);
		fileActions.selectFile(fileId);
	};

	// Handle schema actions
	const handleSchemaValidate = (schemaId: string) => {
		schemaActions.startExecution(schemaId);
	};

	const handleSchemaPreview = (schemaId: string) => {
		// Clear file, script and result selections when selecting a schema
		fileActions.selectFile(null);
		scriptActions.selectScript(null);
		resultsActions.selectResult(null);
		schemaActions.selectSchema(schemaId);
	};

	// Handle script actions
	const handleScriptRun = (scriptId: string) => {
		scriptActions.startExecution(scriptId);
	};

	const handleScriptPreview = (scriptId: string) => {
		// Clear file, schema and result selections when selecting a script
		fileActions.selectFile(null);
		schemaActions.selectSchema(null);
		resultsActions.selectResult(null);
		scriptActions.selectScript(scriptId);
	};

	// Handle result actions
	const handleResultPreview = (resultId: string) => {
		// Clear file, schema and script selections when selecting a result
		fileActions.selectFile(null);
		schemaActions.selectSchema(null);
		scriptActions.selectScript(null);
		resultsActions.selectResult(resultId);
	};

	const handleResultDownload = async (resultId: string) => {
		handleSingleDownload(resultId);
	};

	// Handle validating all schemas in sequence
	const handleValidateAll = async () => {
		// Only validate schemas that are not currently running
		const schemasToValidate = filteredSchemas.filter(schema => 
			schemaSelectors.getExecutionStatus(schema.id) !== "running"
		);
		
		// Execute validations sequentially to avoid resource conflicts
		for (const schema of schemasToValidate) {
			try {
				// Wait for current validation to complete before starting next one
				await schemaActions.startExecution(schema.id);
				
				// Wait for the validation to finish (poll until not running)
				while (schemaSelectors.getExecutionStatus(schema.id) === "running") {
					await new Promise(resolve => setTimeout(resolve, 500)); // Check every 500ms
				}
			} catch (error) {
				console.error(`Failed to execute schema validation ${schema.id}:`, error);
				// Continue with next validation even if one fails
			}
		}
	};

	// Handle running all scripts in sequence
	const handleRunAll = async () => {
		// Only run scripts that are not currently running
		const scriptsToRun = filteredScripts.filter(script => 
			scriptSelectors.getExecutionStatus(script.id) !== "running"
		);
		
		// Execute scripts sequentially to avoid resource conflicts
		for (const script of scriptsToRun) {
			try {
				// Wait for current script to complete before starting next one
				await scriptActions.startExecution(script.id);
				
				// Wait for the script to finish (poll until not running)
				while (scriptSelectors.getExecutionStatus(script.id) === "running") {
					await new Promise(resolve => setTimeout(resolve, 500)); // Check every 500ms
				}
			} catch (error) {
				console.error(`Failed to execute script ${script.id}:`, error);
				// Continue with next script even if one fails
			}
		}
	};

	// Handle single file download
	const handleSingleDownload = (resultId: string) => {
		const result = resultsSelectors.getResultFile(resultId);
		if (!result?.content) {
			console.error('No content available for download:', resultId);
			return;
		}

		// Create a downloadable blob from the content
		const blob = new Blob([result.content], { type: 'application/octet-stream' });
		const url = URL.createObjectURL(blob);
		
		// Create a temporary download link
		const link = document.createElement('a');
		link.href = url;
		link.download = result.filename;
		link.style.display = 'none';
		
		// Trigger download
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		
		// Clean up the URL object
		URL.revokeObjectURL(url);
	};

	// Handle downloading all result files
	const handleDownloadAll = async () => {
		const results = filteredResults;
		if (results.length === 0) {
			console.warn('No results available for download');
			return;
		}

		// Download each file individually
		for (const result of results) {
			if (result.content) {
				try {
					handleSingleDownload(result.id);
					// Small delay between downloads to avoid overwhelming the browser
					await new Promise(resolve => setTimeout(resolve, 100));
				} catch (error) {
					console.error(`Failed to download ${result.filename}:`, error);
				}
			} else {
				console.warn(`No content available for ${result.filename}`);
			}
		}
	};
</script>

<Sidebar.Root
	bind:ref
	collapsible="icon"
	class="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
	{...restProps}
>
	<!-- This is the first sidebar -->
	<!-- We disable collapsible and adjust width to icon. -->
	<!-- This will make the sidebar appear as icons. -->
	<Sidebar.Root collapsible="none" class="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r">
		<Sidebar.Content>
			<Sidebar.Group>
				<Sidebar.GroupContent class="px-1.5 md:px-0">
					<Sidebar.Menu>
						{#each data.navMain as item (item.title)}
							<Sidebar.MenuItem>
								<Sidebar.MenuButton
									tooltipContentProps={{
										hidden: false,
									}}
									onclick={() => {
										activeItem = item;
										sidebar.setOpen(true);
									}}
									isActive={activeItem.title === item.title}
									class="px-2.5 md:px-2"
								>
									{#snippet tooltipContent()}
										{item.title}
									{/snippet}
									<item.icon />
									<span>{item.title}</span>
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						{/each}
					</Sidebar.Menu>
				</Sidebar.GroupContent>
			</Sidebar.Group>
		</Sidebar.Content>
	</Sidebar.Root>

	<!-- This is the second sidebar -->
	<!-- We disable collapsible and let it fill remaining space -->
	<Sidebar.Root collapsible="none" class="hidden flex-1 md:flex min-w-0 max-w-full overflow-hidden">
		<Sidebar.Header class="gap-3.5 border-b p-4 min-w-0">
			<div class="flex w-full items-center justify-between min-w-0">
				<div class="text-foreground text-base font-medium truncate">
					{activeItem.title}
				</div>
				{#if activeItem.title === "Required Files"}
					<Button
						size="sm"
						variant="outline"
						class="text-xs h-7"
						onclick={handleUploadAll}
						disabled={filteredFiles.length === 0}
					>
						<FolderUpIcon class="size-3 mr-1" />
						Upload All
					</Button>
				{:else if activeItem.title === "Schema Validation"}
					<Button
						size="sm"
						variant="outline"
						class="text-xs h-7"
						onclick={handleValidateAll}
						disabled={filteredSchemas.length === 0 || filteredSchemas.some(schema => schemaSelectors.getExecutionStatus(schema.id) === "running")}
					>
						<ShieldCheckIcon class="size-3 mr-1" />
						Validate All
					</Button>
				{:else if activeItem.title === "Scripts"}
					<Button
						size="sm"
						variant="outline"
						class="text-xs h-7"
						onclick={handleRunAll}
						disabled={filteredScripts.length === 0 || filteredScripts.some(script => scriptSelectors.getExecutionStatus(script.id) === "running")}
					>
						<PlayIcon class="size-3 mr-1" />
						Run All
					</Button>
				{:else if activeItem.title === "Results"}
					<Button
						size="sm"
						variant="outline"
						class="text-xs h-7"
						onclick={handleDownloadAll}
						disabled={filteredResults.length === 0}
					>
						<DownloadIcon class="size-3 mr-1" />
						Download All
					</Button>
				{/if}
			</div>
			<div class="relative min-w-0">
				<Sidebar.Input 
					bind:value={searchQuery} 
					placeholder={
						activeItem.title === "Schema Validation" ? "Search schemas..." :
						activeItem.title === "Scripts" ? "Search scripts..." :
						activeItem.title === "Results" ? "Search results..." :
						"Search files..."
					} 
					class="pr-8 w-full"
				/>
				{#if searchQuery.trim()}
					<button
						onclick={() => searchQuery = ""}
						class="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-sm hover:bg-sidebar-accent transition-colors"
						title="Clear search"
					>
						<XIcon class="size-3 text-muted-foreground" />
					</button>
				{/if}
			</div>
		</Sidebar.Header>
		<Sidebar.Content class="min-w-0 overflow-y-auto">
			<Sidebar.Group class="px-2 min-w-0">
				{#if activeItem.title === "Schema Validation"}
					<!-- Schema Validation Content -->
					{#if searchQuery.trim()}
						<div class="text-xs text-muted-foreground mb-3 px-1">
							Found {filteredSchemas.length} schema{filteredSchemas.length === 1 ? '' : 's'} matching "{searchQuery}"
						</div>
					{/if}
					<Sidebar.GroupContent class="space-y-4 px-2 py-2">
						{#if filteredSchemas.length === 0}
							<div class="text-center py-8 text-muted-foreground">
								<ShieldCheckIcon class="size-8 mx-auto mb-2 opacity-50" />
								<p class="text-sm">
									{#if searchQuery.trim()}
										No schemas match your search
									{:else}
										No schema validations available
									{/if}
								</p>
								{#if searchQuery.trim()}
									<button 
										onclick={() => searchQuery = ""} 
										class="text-xs text-primary hover:underline mt-2"
									>
										Clear search
									</button>
								{/if}
							</div>
						{:else}
							{#each filteredSchemas as schema (schema.id)}
								<SchemaCard
									id={schema.id}
									title={schema.title}
									description={schema.description}
									filename={schema.filename}
									status={schemaSelectors.getExecutionStatus(schema.id)}
									executionTime={schemaSelectors.getExecution(schema.id)?.executionTime}
									lastRun={schemaSelectors.getExecution(schema.id)?.lastRun}
									validationSummary={schemaSelectors.getValidationResults(schema.id)?.summary}
									isSelected={schemaSelectors.isSchemaSelected(schema.id)}
									onValidate={() => handleSchemaValidate(schema.id)}
									onPreview={() => handleSchemaPreview(schema.id)}
								/>
							{/each}
						{/if}
					</Sidebar.GroupContent>
				{:else if activeItem.title === "Scripts"}
					<!-- Scripts Content -->
					{#if searchQuery.trim()}
						<div class="text-xs text-muted-foreground mb-3 px-1">
							Found {filteredScripts.length} script{filteredScripts.length === 1 ? '' : 's'} matching "{searchQuery}"
						</div>
					{/if}
					<Sidebar.GroupContent class="space-y-4 px-2 py-2">
						{#if filteredScripts.length === 0}
							<div class="text-center py-8 text-muted-foreground">
								<FileIcon class="size-8 mx-auto mb-2 opacity-50" />
								<p class="text-sm">
									{#if searchQuery.trim()}
										No scripts match your search
									{:else}
										No scripts available
									{/if}
								</p>
								{#if searchQuery.trim()}
									<button 
										onclick={() => searchQuery = ""} 
										class="text-xs text-primary hover:underline mt-2"
									>
										Clear search
									</button>
								{/if}
							</div>
						{:else}
							{#each filteredScripts as script (script.id)}
								<ScriptCard
									id={script.id}
									title={script.title}
									description={script.description}
									filename={script.filename}
									status={scriptSelectors.getExecutionStatus(script.id)}
									executionTime={scriptSelectors.getExecution(script.id)?.executionTime}
									lastRun={scriptSelectors.getExecution(script.id)?.lastRun}
									isSelected={scriptSelectors.isScriptSelected(script.id)}
									onRun={() => handleScriptRun(script.id)}
									onPreview={() => handleScriptPreview(script.id)}
								/>
							{/each}
						{/if}
					</Sidebar.GroupContent>
				{:else if activeItem.title === "Results"}
					<!-- Results Content -->
					{#if searchQuery.trim()}
						<div class="text-xs text-muted-foreground mb-3 px-1">
							Found {filteredResults.length} result{filteredResults.length === 1 ? '' : 's'} matching "{searchQuery}"
						</div>
					{/if}
					<Sidebar.GroupContent class="space-y-4 px-2 py-2">
						{#if filteredResults.length === 0}
							<div class="text-center py-8 text-muted-foreground">
								<FileIcon class="size-8 mx-auto mb-2 opacity-50" />
								<p class="text-sm">
									{#if searchQuery.trim()}
										No results match your search
									{:else}
										No results available
									{/if}
								</p>
								{#if searchQuery.trim()}
									<button 
										onclick={() => searchQuery = ""} 
										class="text-xs text-primary hover:underline mt-2"
									>
										Clear search
									</button>
								{:else}
									<p class="text-xs text-muted-foreground mt-1">
										Run a script to generate results
									</p>
								{/if}
							</div>
						{:else}
							{#each filteredResults as result (result.id)}
								<ResultCard
									id={result.id}
									filename={result.filename}
									fileType={result.fileType}
									fileSize={result.fileSize}
									createdAt={result.createdAt}
									description={result.description}
									isSelected={resultsSelectors.isResultSelected(result.id)}
									onPreview={() => handleResultPreview(result.id)}
									onDownload={() => handleResultDownload(result.id)}
								/>
							{/each}
						{/if}
					</Sidebar.GroupContent>
				{:else}
					<!-- Files Content -->
					{#if searchQuery.trim()}
						<div class="text-xs text-muted-foreground mb-3 px-1">
							Found {filteredFiles.length} file{filteredFiles.length === 1 ? '' : 's'} matching "{searchQuery}"
						</div>
					{/if}
					<Sidebar.GroupContent class="space-y-4 px-2 py-2">
						{#if filteredFiles.length === 0}
							<div class="text-center py-8 text-muted-foreground">
								<FileIcon class="size-8 mx-auto mb-2 opacity-50" />
								<p class="text-sm">
									{#if searchQuery.trim()}
										No files match your search
									{:else}
										No files available
									{/if}
								</p>
								{#if searchQuery.trim()}
									<button 
										onclick={() => searchQuery = ""} 
										class="text-xs text-primary hover:underline mt-2"
									>
										Clear search
									</button>
								{/if}
							</div>
						{:else}
							{#each filteredFiles as fileReq (fileReq.id)}
								<FileCard
									id={fileReq.id}
									title={fileReq.title}
									description={fileReq.description}
									defaultFilename={fileReq.defaultFilename}
									status={fileManagerState.uploadStates[fileReq.id] ?? "waiting"}
									uploadedFilename={fileManagerState.files[fileReq.id]?.filename}
									fileSize={fileManagerState.files[fileReq.id]?.size}
									uploadedAt={fileManagerState.files[fileReq.id]?.uploadedAt}
									wasRenamed={fileManagerState.files[fileReq.id]?.wasRenamed}
									onUpload={() => handleUpload(fileReq.id)}
									onRemove={() => handleRemove(fileReq.id)}
									onPreview={() => handlePreview(fileReq.id)}
								/>
							{/each}
						{/if}
					</Sidebar.GroupContent>
				{/if}
			</Sidebar.Group>
		</Sidebar.Content>
	</Sidebar.Root>
</Sidebar.Root>
