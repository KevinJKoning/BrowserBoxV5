<script lang="ts">
	import AppSidebar from "./lib/components/app-sidebar.svelte";
	import ParquetPreview from "./lib/components/parquet-preview.svelte";
	import SchemaPreview from "./lib/components/schema-preview.svelte";
	import ScriptPreview from "./lib/components/script-preview.svelte";
	import HtmlPreview from "./lib/components/html-preview.svelte";
	import * as Breadcrumb from "./lib/components/ui/breadcrumb/index.js";
	import { Separator } from "./lib/components/ui/separator/index.js";
	import * as Sidebar from "./lib/components/ui/sidebar/index.js";
	import { fileManagerState } from "./lib/stores/file-store.svelte.js";
	import { schemaManagerState, schemaSelectors, schemaActions } from "./lib/stores/schema-store.svelte.js";
	import { scriptManagerState, scriptSelectors, scriptActions } from "./lib/stores/script-store.svelte.js";
	import { resultsManagerState, resultsSelectors } from "./lib/stores/results-store.svelte.js";
	
	// Create reactive selectors directly in the component
	const selectedFile = $derived.by(() => {
		const selectedId = fileManagerState.selectedFileId;
		return selectedId ? fileManagerState.files[selectedId] ?? null : null;
	});

	const selectedSchema = $derived.by(() => {
		const selectedId = schemaManagerState.selectedSchemaId;
		return selectedId ? schemaSelectors.getSchema(selectedId) ?? null : null;
	});

	const selectedSchemaExecution = $derived.by(() => {
		const selectedId = schemaManagerState.selectedSchemaId;
		return selectedId ? schemaSelectors.getExecution(selectedId) ?? null : null;
	});

	const selectedScript = $derived.by(() => {
		const selectedId = scriptManagerState.selectedScriptId;
		return selectedId ? scriptSelectors.getScript(selectedId) ?? null : null;
	});

	const selectedScriptExecution = $derived.by(() => {
		const selectedId = scriptManagerState.selectedScriptId;
		return selectedId ? scriptSelectors.getExecution(selectedId) ?? null : null;
	});

	const selectedResult = $derived.by(() => {
		const selectedId = resultsManagerState.selectedResultId;
		return selectedId ? resultsSelectors.getResultFile(selectedId) ?? null : null;
	});
</script>

<Sidebar.Provider style="--sidebar-width: 400px;">
	<AppSidebar />
	<Sidebar.Inset>
		<header class="bg-background sticky top-0 flex shrink-0 items-center gap-2 border-b p-4">
			<Sidebar.Trigger class="-ml-1" />
			<Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
			<Breadcrumb.Root>
				<Breadcrumb.List>
					<Breadcrumb.Item class="hidden md:block">
						<Breadcrumb.Link href="#">YourBespokeAppName</Breadcrumb.Link>
					</Breadcrumb.Item>
					<Breadcrumb.Separator class="hidden md:block" />
					<Breadcrumb.Item class="hidden md:block">
						<Breadcrumb.Link href="#">
							{#if selectedSchema}
								Schema Validation
							{:else if selectedScript}
								Scripts
							{:else if selectedResult}
								Results
							{:else}
								Files
							{/if}
						</Breadcrumb.Link>
					</Breadcrumb.Item>
					{#if selectedFile}
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>{selectedFile.originalName}</Breadcrumb.Page>
						</Breadcrumb.Item>
					{:else if selectedSchema}
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>{selectedSchema.title}</Breadcrumb.Page>
						</Breadcrumb.Item>
					{:else if selectedScript}
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>{selectedScript.title}</Breadcrumb.Page>
						</Breadcrumb.Item>
					{:else if selectedResult}
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>{selectedResult.filename}</Breadcrumb.Page>
						</Breadcrumb.Item>
					{:else}
						<Breadcrumb.Separator class="hidden md:block" />
						<Breadcrumb.Item>
							<Breadcrumb.Page>Dashboard</Breadcrumb.Page>
						</Breadcrumb.Item>
					{/if}
				</Breadcrumb.List>
			</Breadcrumb.Root>
		</header>
		<div class="flex flex-1 flex-col gap-4 p-4 max-h-[calc(100vh-5rem)] min-h-0 overflow-hidden">
			{#if selectedSchema}
				<!-- Schema Preview Mode (Priority 1) -->
				<div class="h-full min-h-0 overflow-hidden">
					<SchemaPreview 
						schemaId={selectedSchema.id}
						expectations={selectedSchema.expectations}
						filename={selectedSchema.filename}
						status={selectedSchemaExecution?.status}
						metrics={selectedSchemaExecution?.metrics}
						output={selectedSchemaExecution?.output}
						validationResults={selectedSchemaExecution?.results}
						error={selectedSchemaExecution?.error}
						onValidate={() => {
							schemaActions.startExecution(selectedSchema.id);
						}}
					/>
				</div>
			{:else if selectedScript}
				<!-- Script Preview Mode (Priority 2) -->
				<div class="h-full min-h-0 overflow-hidden">
					<ScriptPreview 
						scriptId={selectedScript.id}
						scriptContent={selectedScript.content}
						filename={selectedScript.filename}
						status={selectedScriptExecution?.status}
						metrics={selectedScriptExecution?.metrics}
						output={selectedScriptExecution?.output}
						error={selectedScriptExecution?.error}
						onRun={() => {
							scriptActions.startExecution(selectedScript.id);
						}}
					/>
				</div>
			{:else if selectedResult}
				<!-- Results Preview Mode (Priority 3) -->
				<div class="h-full min-h-0 overflow-hidden">
					{#if selectedResult.fileType === 'html' || selectedResult.fileType === 'htm'}
						<HtmlPreview
							htmlContent={selectedResult.content ? new TextDecoder().decode(selectedResult.content) : ''}
							filename={selectedResult.filename}
							fileSize={selectedResult.fileSize}
							createdAt={selectedResult.createdAt}
							onDownload={() => {
								// TODO: Implement download functionality
								console.log('Download result:', selectedResult.filename);
							}}
						/>
					{:else if selectedResult.fileType === 'parquet' || selectedResult.fileType === 'pq'}
						<!-- Convert result to File object for parquet preview -->
						{#if selectedResult.content}
							{@const resultFile = new File([selectedResult.content], selectedResult.filename, { 
								type: 'application/octet-stream',
								lastModified: new Date(selectedResult.createdAt).getTime()
							})}
							<ParquetPreview 
								file={resultFile} 
								filename={selectedResult.filename} 
							/>
						{/if}
					{:else}
						<!-- Generic file preview for other types -->
						<div class="flex items-center justify-center h-full">
							<div class="text-center">
								<div class="text-6xl mb-4">📄</div>
								<h3 class="text-lg font-medium mb-2">{selectedResult.filename}</h3>
								<p class="text-muted-foreground mb-4">
									{selectedResult.fileType.toUpperCase()} file • {(selectedResult.fileSize / 1024).toFixed(1)} KB
								</p>
								<p class="text-sm text-muted-foreground">
									{selectedResult.description}
								</p>
							</div>
						</div>
					{/if}
				</div>
			{:else if selectedFile?.file}
				<!-- File Preview Mode (Priority 4) -->
				<div class="h-full min-h-0 overflow-hidden">
					<ParquetPreview 
						file={selectedFile.file} 
						filename={selectedFile.originalName} 
					/>
				</div>
			{:else}
				<!-- Dashboard Mode -->
				<div class="bg-muted/50 flex-1 rounded-xl overflow-auto">
					<div class="p-8">
						<h1 class="text-3xl font-bold mb-4">Super Great Description</h1>
						<p class="text-lg text-muted-foreground mb-6">
							Upload and manage your files with real-time preview capabilities, plus execute Python scripts with Pyodide. 
							The sidebar shows your file requirements, upload status, and available scripts.
						</p>
						<div class="space-y-4">
							<h2 class="text-xl font-semibold">Features:</h2>
							<ul class="list-disc list-inside space-y-2 text-muted-foreground">
								<li>Upload files with progress tracking</li>
								<li>Real-time parquet file preview with hyparquet</li>
								<li>Schema validation with comprehensive reporting</li>
								<li>Python script execution with Pyodide</li>
								<li>Script preview with metrics and output display</li>
								<li>File search and filtering capabilities</li>
								<li>Metadata and schema information display</li>
								<li>Responsive design with collapsible sidebar</li>
							</ul>
							<div class="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border">
								<h3 class="font-medium text-blue-900 dark:text-blue-100 mb-2">
									Getting Started
								</h3>
								<p class="text-sm text-blue-700 dark:text-blue-300">
									Click on "Required Files" to upload and preview data files. 
									Click on "Schema Validation" to validate your data against expected schemas.
									Click on "Scripts" to view and execute Python analysis scripts.
									Use the search functionality to find specific files, schemas, or scripts quickly.
								</p>
							</div>
						</div>
					</div>
				</div>
			{/if}
		</div>
	</Sidebar.Inset>
</Sidebar.Provider>
