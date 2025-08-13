<script lang="ts">
	import { Badge } from "./ui/badge/index.js";
	import { Button } from "./ui/button/index.js";
	import { Card, CardContent, CardHeader, CardTitle } from "./ui/card/index.js";
	import { Separator } from "./ui/separator/index.js";
	import { CopyButton } from "./ui/copy-button/index.js";
	import PlayIcon from "@lucide/svelte/icons/play";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
	import { PyodideManager, type PyodideInitializationStatus } from "../pyodide/pyodide-manager.js";
	import { onMount } from 'svelte';
	import { scripts } from "../config/script-config.js";
	import { fileRequirements } from "../config/file-config.js";
	import { fileManagerState, fileSelectors } from "../stores/file-store.svelte.js";
	import { resultsManagerState, resultsSelectors } from "../stores/results-store.svelte.js";
	import { checkScriptDependencies, previewStatusConfig, formatFileSize, getPyodideInitializationMessage } from "../utils.js";

	interface Props {
		/** Script ID for looking up dependencies */
		scriptId?: string;
		/** Script content as string */
		scriptContent: string;
		/** Script filename */
		filename: string;
		/** Current execution status */
		status?: "ready" | "running" | "completed" | "error";
		/** Script execution metrics */
		metrics?: {
			executionTime?: string;
			lastRun?: string;
			outputLines?: number;
			errorCount?: number;
			[key: string]: any;
		};
		/** Script output/results */
		output?: string;
		/** Error message if status is error */
		error?: string;
		/** Click handler for run action */
		onRun?: () => void;
	}

	let { 
		scriptId,
		scriptContent, 
		filename, 
		status = "ready",
		metrics = {},
		output = "",
		error = "",
		onRun
	}: Props = $props();

	// Pyodide initialization state
	let pyodideStatus: PyodideInitializationStatus = $state('not-initialized');
	let initializationMessage = $state('');
	
	const pyodideManager = PyodideManager.getInstance();

	onMount(() => {
		// Monitor Pyodide initialization status only when it's actually initializing
		const outputHandler = {
			onStatusChange: (newStatus: PyodideInitializationStatus) => {
				pyodideStatus = newStatus;
				updateInitializationMessage(newStatus);
			}
		};
		
		pyodideManager.addOutputHandler(outputHandler);
		
		// Only update status if Pyodide is already initializing/ready
		// Don't show "not-initialized" as a loading state
		const currentStatus = pyodideManager.getStatus();
		if (currentStatus !== 'not-initialized') {
			pyodideStatus = currentStatus;
			updateInitializationMessage(currentStatus);
		}
		
		return () => {
			pyodideManager.removeOutputHandler(outputHandler);
		};
	});

	function updateInitializationMessage(status: PyodideInitializationStatus) {
		initializationMessage = getPyodideInitializationMessage(status);
	}

	// Calculate script stats
	const scriptStats = $derived.by(() => {
		const lines = scriptContent.split('\n').length;
		const characters = scriptContent.length;
		const nonEmptyLines = scriptContent.split('\n').filter(line => line.trim()).length;
		
		return {
			lines,
			characters,
			nonEmptyLines
		};
	});

	// Find required files for this script using shared utility
	const requiredFiles = $derived.by(() => {
		if (!scriptId) return [];
		const dependencyStatus = checkScriptDependencies(scriptId);
		// Map to the expected format for the template (maintaining backward compatibility)
		return dependencyStatus.dependencies.map(dep => ({
			...dep,
			isUploaded: dep.isAvailable // Alias for template compatibility
		}));
	});

	// Content for Live Output copy button
	const liveOutputCopyContent = $derived(() => {
		return status === "error" 
			? (output && output.trim() ? `Output:\n${output}\n\nError:\n${error}` : error || "")
			: output || "";
	});
</script>

<div class="flex gap-6 h-full">
	<!-- Script Content View (1/2 width) -->
	<div class="flex-1 min-w-0 max-w-[50%]">
		<Card class="h-full">
			<CardHeader>
				<CardTitle class="flex items-center justify-between gap-2 min-w-0">
					<div class="flex items-center gap-2 min-w-0">
						<FileTextIcon class="size-4 flex-shrink-0" />
						<span class="truncate">{filename}</span>
					</div>
					<CopyButton content={scriptContent} class="flex-shrink-0" />
				</CardTitle>
			</CardHeader>
			<CardContent class="p-0 h-[calc(100%-4rem)] overflow-hidden">
				<div class="overflow-auto h-full">
					<pre class="p-4 text-xs font-mono whitespace-pre-wrap bg-muted/20 h-full w-full overflow-auto">{scriptContent}</pre>
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Metrics & Output View (1/2 width) -->
	<div class="flex-1 min-w-0 max-w-[50%] flex flex-col space-y-4">
		<!-- Script Metrics -->
		<Card class="h-80 flex-shrink-0 overflow-hidden">
			<CardHeader>
				<CardTitle class="text-base">Script Info</CardTitle>
			</CardHeader>
			<CardContent class="h-[calc(100%-4rem)] overflow-y-auto space-y-4">
				{#if requiredFiles.length > 0}
					<!-- Required Files -->
					<div>
						<h4 class="font-medium mb-2 text-sm">Required Files</h4>
						<div class="space-y-2">
							{#each requiredFiles as file}
								<div class="border rounded-md p-2 {file.isUploaded ? 'bg-green-50/50 border-green-200' : 'bg-muted/20'}">
									<div class="flex items-start gap-2 min-w-0">
										<div class="min-w-0 flex-1">
											<div class="font-medium text-xs truncate">{file.title}</div>
											<div class="text-xs text-muted-foreground truncate">{file.filename}</div>
											{#if file.description}
												<div class="text-xs text-muted-foreground mt-1 line-clamp-2">{file.description}</div>
											{/if}
										</div>
										{#if file.type === 'uploaded'}
											<Badge variant={file.isUploaded ? 'default' : 'outline'} class="text-xs flex-shrink-0 {file.isUploaded ? 'bg-green-500 hover:bg-green-600' : ''}">
												{file.isUploaded ? 'Uploaded' : 'Required'}
											</Badge>
										{:else}
											<Badge variant={file.isUploaded ? 'default' : 'secondary'} class="text-xs flex-shrink-0 {file.isUploaded ? 'bg-green-500 hover:bg-green-600' : ''}">
												{file.isUploaded ? 'Generated' : 'Missing'}
											</Badge>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>

					<Separator />
				{/if}

				<!-- Script Statistics -->
				<div>
					<h4 class="font-medium mb-2 text-sm">Statistics</h4>
					<div class="space-y-1 text-sm min-w-0">
						<div class="flex justify-between min-w-0">
							<span class="text-muted-foreground flex-shrink-0">Lines:</span>
							<span class="truncate text-right">{scriptStats.lines.toLocaleString()}</span>
						</div>
						<div class="flex justify-between min-w-0">
							<span class="text-muted-foreground flex-shrink-0">Non-empty:</span>
							<span class="truncate text-right">{scriptStats.nonEmptyLines.toLocaleString()}</span>
						</div>
						<div class="flex justify-between min-w-0">
							<span class="text-muted-foreground flex-shrink-0">Characters:</span>
							<span class="truncate text-right">{scriptStats.characters.toLocaleString()}</span>
						</div>
						<div class="flex justify-between min-w-0">
							<span class="text-muted-foreground flex-shrink-0">Size:</span>
							<span class="truncate text-right">{formatFileSize(new TextEncoder().encode(scriptContent).length)}</span>
						</div>
					</div>
				</div>

				{#if Object.keys(metrics).length > 0}
					<Separator />
					
					<!-- Execution Metrics -->
					<div>
						<h4 class="font-medium mb-2 text-sm">Execution</h4>
						<div class="space-y-1 text-sm min-w-0">
							{#if metrics.executionTime}
								<div class="flex justify-between min-w-0">
									<span class="text-muted-foreground flex-shrink-0">Runtime:</span>
									<span class="truncate text-right">{metrics.executionTime}</span>
								</div>
							{/if}
							{#if metrics.lastRun}
								<div class="flex justify-between min-w-0">
									<span class="text-muted-foreground flex-shrink-0">Last run:</span>
									<span class="truncate text-right">{metrics.lastRun}</span>
								</div>
							{/if}
							{#if metrics.outputLines !== undefined}
								<div class="flex justify-between min-w-0">
									<span class="text-muted-foreground flex-shrink-0">Output lines:</span>
									<span class="truncate text-right">{metrics.outputLines.toLocaleString()}</span>
								</div>
							{/if}
							{#if metrics.errorCount !== undefined}
								<div class="flex justify-between min-w-0">
									<span class="text-muted-foreground flex-shrink-0">Errors:</span>
									<span class={metrics.errorCount > 0 ? "text-destructive font-medium" : ""}>
										{metrics.errorCount}
									</span>
								</div>
							{/if}
							
							<!-- Additional custom metrics -->
							{#each Object.entries(metrics) as [key, value]}
								{#if !['executionTime', 'lastRun', 'outputLines', 'errorCount'].includes(key)}
									<div class="flex justify-between min-w-0">
										<span class="text-muted-foreground capitalize flex-shrink-0 truncate">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
										<span class="truncate text-right">{value}</span>
									</div>
								{/if}
							{/each}
						</div>
					</div>
				{/if}
			</CardContent>
		</Card>

		<!-- Script Output/Results -->
		<Card class="flex-1 min-h-0 overflow-hidden">
			<CardHeader>
				<CardTitle class="flex items-center justify-between gap-2 text-base">
					<span>
						{#if status === "error"}
							Error Output
						{:else if output}
							Script Output
						{:else}
							Live Output
						{/if}
					</span>
					{#if (status === "error" && error) || output}
						<CopyButton content={liveOutputCopyContent} class="flex-shrink-0" />
					{/if}
				</CardTitle>
			</CardHeader>
			<CardContent class="h-[calc(100%-4rem)] overflow-hidden">
				<div class="overflow-auto h-full">
					{#if status === "error" && error}
						<div class="space-y-3">
							{#if output && output.trim()}
								<!-- Show output that was captured before the error -->
								<div>
									<h4 class="text-xs font-medium text-muted-foreground mb-2">Output before error:</h4>
									<pre class="text-xs font-mono whitespace-pre-wrap bg-muted/20 p-3 rounded w-full overflow-auto">{output}</pre>
								</div>
							{/if}
							<!-- Show the error -->
							<div>
								<h4 class="text-xs font-medium text-destructive mb-2">Error:</h4>
								<pre class="text-xs font-mono whitespace-pre-wrap text-destructive bg-destructive/5 p-3 rounded w-full overflow-auto">{error}</pre>
							</div>
						</div>
					{:else if output}
						<pre class="text-xs font-mono whitespace-pre-wrap bg-muted/20 p-3 rounded w-full overflow-auto">{output}</pre>
					{:else if status === "running"}
						<div class="flex items-center justify-center h-full">
							<div class="text-center">
								<LoaderIcon class="animate-spin h-6 w-6 mx-auto mb-2 text-primary" />
								<p class="text-sm text-muted-foreground">Script running...</p>
								{#if pyodideStatus === 'initializing' || pyodideStatus === 'loading-packages'}
									<p class="text-xs text-muted-foreground mt-1">{initializationMessage}</p>
								{/if}
							</div>
						</div>
					{:else if pyodideStatus === 'error'}
						<div class="flex items-center justify-center h-full">
							<div class="text-center">
								<AlertCircleIcon class="h-6 w-6 mx-auto mb-2 text-destructive" />
								<p class="text-sm text-destructive">Python runtime failed to initialize</p>
								<p class="text-xs text-muted-foreground mt-1">Please refresh the page to retry</p>
							</div>
						</div>
					{:else if pyodideStatus === 'initializing' || pyodideStatus === 'loading-packages'}
						<div class="flex items-center justify-center h-full">
							<div class="text-center">
								<LoaderIcon class="animate-spin h-6 w-6 mx-auto mb-2 text-primary" />
								<p class="text-sm text-muted-foreground">{initializationMessage}</p>
								<p class="text-xs text-muted-foreground mt-1">This may take a few moments on first load</p>
							</div>
						</div>
					{:else}
						<div class="flex items-center justify-center h-full">
							<div class="text-center">
								<PlayIcon class="h-6 w-6 mx-auto mb-2 text-muted-foreground opacity-50" />
								<p class="text-sm text-muted-foreground">Ready to run Python script</p>
								<p class="text-xs text-muted-foreground mt-1">
									{pyodideStatus === 'ready' ? 'Python loaded - click "Run Script"' : 'Click "Run Script" to load Python and execute'}
								</p>
							</div>
						</div>
					{/if}
				</div>
			</CardContent>
		</Card>
	</div>
</div>