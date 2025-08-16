<script lang="ts">
	import { Badge } from "../../../lib/components/ui/badge/index.js";
	import { Card, CardContent, CardHeader, CardTitle } from "../../../lib/components/ui/card/index.js";
	import { Separator } from "../../../lib/components/ui/separator/index.js";
	import { CopyButton } from "../../../lib/components/ui/copy-button/index.js";
	import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import LoaderIcon from "@lucide/svelte/icons/loader";
	import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
	import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
	import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
	// PyodideManager removed - using simplified system
	// import { PyodideManager, type PyodideInitializationStatus } from "../pyodide/pyodide-manager.js";
	import { onMount } from 'svelte';
	import type { SchemaExpectation, SchemaValidationResult } from "@config/schema-config.js";
	import { checkSchemaDependencies } from "../../../lib/utils/dependencies.js";
	import { getValidationStatusIcon, getValidationStatusClass } from "../../../lib/utils/status.js";

	interface Props {
		/** Schema validation ID */
		schemaId?: string;
		/** Schema expectations metadata */
		expectations: SchemaExpectation;
		/** Schema validation filename */
		filename: string;
		/** Current validation status */
		status?: "ready" | "running" | "completed" | "error";
		/** Validation execution metrics */
		metrics?: {
			executionTime?: string;
			lastRun?: string;
			outputLines?: number;
			errorCount?: number;
			[key: string]: unknown;
		};
		/** Schema validation output/results */
		output?: string;
		/** Parsed validation results */
		validationResults?: SchemaValidationResult;
		/** Error message if status is error */
		error?: string;
	}

	let { 
		schemaId,
		expectations,
		filename, 
		status = "ready",
		metrics = {},
		output = "",
		validationResults,
		error = ""
	}: Props = $props();

	// Pyodide functionality disabled in simplified system
	let pyodideStatus = $state('not-initialized');
	let initializationMessage = $state(''); // retained placeholder for UI states
	
	// const pyodideManager = PyodideManager.getInstance();

	// Expanded rows for detailed validation checks (use SvelteSet for reactivity compliance)
	import { SvelteSet } from 'svelte/reactivity';
	let expandedRows = new SvelteSet<string>();

	// Content for validation results copy button
	const validationCopyContent = $derived(() => {
		return status === "error" ? error || "" : 
			validationResults ? JSON.stringify(validationResults, null, 2) : output || "";
	});


	// Get dependency status info for target file availability display
	const targetFileInfo = $derived.by(() => {
		if (!schemaId) return null;
		const dependencyStatus = checkSchemaDependencies(schemaId);
		return dependencyStatus.dependencies[0] || null;
	});

	onMount(() => { /* Pyodide integration disabled */ });

	// updateInitializationMessage removed (Pyodide disabled)

	// Calculate expectations stats
	const expectationsStats = $derived.by(() => {
		const columns = Object.keys(expectations.columns).length;
		const requiredColumns = Object.values(expectations.columns).filter(col => col.required).length;
		const constrainedColumns = Object.values(expectations.columns).filter(col => 
			col.min_value !== undefined || col.max_value !== undefined || col.allowed_values !== undefined
		).length;
		
		return {
			columns,
			requiredColumns,
			constrainedColumns
		};
	});


	function toggleRowExpansion(columnName: string) {
		if (expandedRows.has(columnName)) {
			expandedRows.delete(columnName);
		} else {
			expandedRows.add(columnName);
		}
		// SvelteSet is reactive; no need to recreate
	}


	// Use shared preview status config but override running text for schema validation
	// statusConfig retained in earlier version; removed as unused
</script>

<div class="flex gap-6 h-full w-full min-w-0 overflow-hidden max-w-full">
	<!-- Schema Expectations View (1/2 width) -->
	<div class="flex-1 min-w-0 max-w-[50%] w-0">
		<Card class="h-full">
			<CardHeader>
				<CardTitle class="flex items-center justify-between gap-2 min-w-0">
					<div class="flex items-center gap-2 min-w-0">
						<FileTextIcon class="size-4 flex-shrink-0" />
						<span class="truncate">Schema Expectations</span>
					</div>
					<CopyButton content={JSON.stringify(expectations, null, 2)} class="flex-shrink-0" />
				</CardTitle>
			</CardHeader>
			<CardContent class="p-0 h-[calc(100%-4rem)] overflow-hidden">
				<div class="overflow-auto h-full">
					<div class="p-4 space-y-4">
						<!-- Schema Description -->
						<div>
							<h4 class="font-medium mb-2 text-sm">Description</h4>
							<p class="text-sm text-muted-foreground">{expectations.description}</p>
						</div>

						<!-- Schema Statistics -->
						<div>
							<h4 class="font-medium mb-2 text-sm">Schema Statistics</h4>
							<div class="space-y-1 text-sm">
								<div class="flex justify-between">
									<span class="text-muted-foreground">Total columns:</span>
									<span>{expectationsStats.columns}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-muted-foreground">Required columns:</span>
									<span>{expectationsStats.requiredColumns}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-muted-foreground">Constrained columns:</span>
									<span>{expectationsStats.constrainedColumns}</span>
								</div>
								{#if expectations.expected_row_count}
									<div class="flex justify-between">
										<span class="text-muted-foreground">Expected rows:</span>
										<span>
											{expectations.expected_row_count.min ?? 0} - {expectations.expected_row_count.max ?? "∞"}
										</span>
									</div>
								{/if}
							</div>
						</div>

						<Separator />

						<!-- Column Expectations Table -->
						<div>
							<h4 class="font-medium mb-2 text-sm">Column Expectations</h4>
							<div class="border rounded-md overflow-hidden">
								<table class="w-full text-sm">
									<thead class="bg-muted/50">
										<tr>
											<th class="text-left p-2 font-medium w-[100px]">Column</th>
											<th class="text-left p-2 font-medium w-[80px]">Type</th>
											<th class="text-left p-2 font-medium w-[70px]">Required</th>
											<th class="text-left p-2 font-medium">Constraints</th>
										</tr>
									</thead>
									<tbody>
										{#each Object.entries(expectations.columns) as [columnName, columnExp] (columnName)}
											<tr class="border-t">
												<td class="p-2 font-medium text-xs">{columnName}</td>
												<td class="p-2 text-xs">
													<Badge variant="outline" class="text-xs">{columnExp.type}</Badge>
												</td>
												<td class="p-2 text-xs">
													{#if columnExp.required}
														<Badge variant="default" class="text-xs">Yes</Badge>
													{:else}
														<Badge variant="outline" class="text-xs">No</Badge>
													{/if}
												</td>
												<td class="p-2 text-xs">
													<div class="space-y-1">
														{#if columnExp.min_value !== undefined}
															<div>Min: {columnExp.min_value}</div>
														{/if}
														{#if columnExp.max_value !== undefined}
															<div>Max: {columnExp.max_value}</div>
														{/if}
														{#if columnExp.allowed_values}
															<div>Values: {columnExp.allowed_values.join(", ")}</div>
														{/if}
														{#if columnExp.max_categories !== undefined}
															<div>Max categories: {columnExp.max_categories}</div>
														{/if}
														{#if !columnExp.null_allowed}
															<div class="text-muted-foreground">No nulls</div>
														{/if}
													</div>
												</td>
											</tr>
										{/each}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- Validation Results View (1/2 width) -->
	<div class="flex-1 min-w-0 max-w-[50%] w-0 flex flex-col space-y-4">
		<!-- Schema Metrics -->
		<Card class="h-64 flex-shrink-0 overflow-hidden">
			<CardHeader>
				<CardTitle class="text-base">Validation Info</CardTitle>
			</CardHeader>
			<CardContent class="h-[calc(100%-4rem)] overflow-y-auto space-y-4">
				<!-- Schema Statistics -->
				<div>
					<h4 class="font-medium mb-2 text-sm">Schema</h4>
					<div class="space-y-1 text-sm min-w-0">
						<div class="flex justify-between min-w-0">
							<span class="text-muted-foreground flex-shrink-0">Validation Script:</span>
							<span class="truncate text-right">{filename}</span>
						</div>
						{#if targetFileInfo}
							<div class="space-y-2">
								<div class="flex justify-between items-center min-w-0">
									<span class="text-muted-foreground flex-shrink-0">Target File:</span>
									<div class="flex items-center gap-2 min-w-0">
										<span class="truncate text-right text-sm">{targetFileInfo.filename}</span>
										<Badge variant={targetFileInfo.isAvailable ? 'default' : 'outline'} 
											   class="text-xs flex-shrink-0 {targetFileInfo.isAvailable ? 'bg-green-500 hover:bg-green-600' : ''}">
											{targetFileInfo.isAvailable ? 'Available' : 'Missing'}
										</Badge>
									</div>
								</div>
								{#if targetFileInfo.description}
									<div class="text-xs text-muted-foreground pl-4">
										{targetFileInfo.description}
									</div>
								{/if}
							</div>
						{/if}
						<div class="flex justify-between min-w-0">
							<span class="text-muted-foreground flex-shrink-0">Expected columns:</span>
							<span class="truncate text-right">{expectationsStats.columns}</span>
						</div>
						<div class="flex justify-between min-w-0">
							<span class="text-muted-foreground flex-shrink-0">Required columns:</span>
							<span class="truncate text-right">{expectationsStats.requiredColumns}</span>
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
						</div>
					</div>
				{/if}

				{#if validationResults}
					<Separator />
					
					<!-- Validation Summary -->
					<div>
						<h4 class="font-medium mb-2 text-sm">Validation Summary</h4>
						<div class="space-y-1 text-sm">
							<div class="flex justify-between">
								<span class="text-muted-foreground">Overall status:</span>
								<Badge variant={validationResults.overall_status === "pass" ? "default" : 
											   validationResults.overall_status === "warning" ? "secondary" : "destructive"}>
									{validationResults.overall_status.toUpperCase()}
								</Badge>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Total checks:</span>
								<span>{validationResults.summary.total_checks}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Passed:</span>
								<span class="text-green-600">{validationResults.summary.passed}</span>
							</div>
							{#if validationResults.summary.failed > 0}
								<div class="flex justify-between">
									<span class="text-muted-foreground">Failed:</span>
									<span class="text-red-600">{validationResults.summary.failed}</span>
								</div>
							{/if}
							{#if validationResults.summary.warnings > 0}
								<div class="flex justify-between">
									<span class="text-muted-foreground">Warnings:</span>
									<span class="text-yellow-600">{validationResults.summary.warnings}</span>
								</div>
							{/if}
						</div>
					</div>
				{/if}
			</CardContent>
		</Card>

		<!-- Validation Results Table -->
		<Card class="flex-1 min-h-0 overflow-hidden">
			<CardHeader>
				<CardTitle class="flex items-center justify-between gap-2 text-base">
					<span>
						{#if status === "error"}
							Validation Error
						{:else if validationResults}
							Validation Results
						{:else if output}
							Validation Output
						{:else}
							Validation Results
						{/if}
					</span>
					{#if (status === "error" && error) || output || validationResults}
						<CopyButton content={validationCopyContent()} class="flex-shrink-0" />
					{/if}
				</CardTitle>
			</CardHeader>
			<CardContent class="h-[calc(100%-4rem)] overflow-hidden">
				<div class="overflow-auto h-full">
					{#if status === "error" && error}
						<pre class="text-xs font-mono whitespace-pre-wrap text-destructive bg-destructive/5 p-3 rounded w-full overflow-auto">{error}</pre>
					{:else if validationResults}
						<!-- Validation Results Table -->
						<div class="border rounded-md overflow-hidden">
							<table class="w-full text-sm">
								<thead class="bg-muted/50">
									<tr>
										<th class="text-left p-2 font-medium w-[30px]"></th>
										<th class="text-left p-2 font-medium w-[120px]">Column</th>
										<th class="text-left p-2 font-medium w-[80px]">Expected</th>
										<th class="text-left p-2 font-medium w-[80px]">Actual</th>
										<th class="text-left p-2 font-medium w-[70px]">Status</th>
										<th class="text-left p-2 font-medium">Issues</th>
									</tr>
								</thead>
								<tbody>
									{#each validationResults.column_validations as columnValidation (columnValidation.column_name)}
										{@const StatusIcon = getValidationStatusIcon(columnValidation.status)}
										{@const failedChecks = columnValidation.checks.filter(check => check.status === "fail")}
										{@const warningChecks = columnValidation.checks.filter(check => check.status === "warning")}
										<tr class="border-t">
											<td class="p-2">
												<button 
													onclick={() => toggleRowExpansion(columnValidation.column_name)}
													class="p-1 hover:bg-muted rounded transition-colors"
												>
													{#if expandedRows.has(columnValidation.column_name)}
														<ChevronDownIcon class="size-3" />
													{:else}
														<ChevronRightIcon class="size-3" />
													{/if}
												</button>
											</td>
											<td class="p-2 font-medium text-xs">{columnValidation.column_name}</td>
											<td class="p-2 text-xs">
												{#if columnValidation.expected_type}
													<Badge variant="outline" class="text-xs">{columnValidation.expected_type}</Badge>
												{:else}
													<span class="text-muted-foreground">-</span>
												{/if}
											</td>
											<td class="p-2 text-xs">
												{#if columnValidation.actual_type}
													<Badge variant="outline" class="text-xs">{columnValidation.actual_type}</Badge>
												{:else}
													<span class="text-muted-foreground">Missing</span>
												{/if}
											</td>
											<td class="p-2">
												<div class="flex items-center gap-1">
													<StatusIcon class={`size-3 ${getValidationStatusClass(columnValidation.status)}`} />
													<Badge variant={columnValidation.status === "pass" ? "default" : 
																  columnValidation.status === "warning" ? "secondary" : "destructive"} 
														   class="text-xs">
														{columnValidation.status}
													</Badge>
												</div>
											</td>
											<td class="p-2 text-xs">
												{#if failedChecks.length > 0}
													<span class="text-red-600">{failedChecks.length} failed</span>
												{:else if warningChecks.length > 0}
													<span class="text-yellow-600">{warningChecks.length} warnings</span>
												{:else}
													<span class="text-green-600">All passed</span>
												{/if}
											</td>
										</tr>
										{#if expandedRows.has(columnValidation.column_name)}
											<tr class="border-t">
												<td colspan="6" class="bg-muted/20 p-0">
													<div class="p-4 space-y-2">
														<h5 class="font-medium text-sm">Detailed Check Results</h5>
														<div class="space-y-1">
															{#each columnValidation.checks as check (check.check)}
																{@const CheckIcon = getValidationStatusIcon(check.status)}
																<div class="flex items-start gap-2 text-xs">
																	<CheckIcon class={`size-3 mt-0.5 flex-shrink-0 ${getValidationStatusClass(check.status)}`} />
																	<div class="flex-1">
																		<div class="font-medium capitalize">{check.check.replace('_', ' ')}</div>
																		{#if check.message}
																			<div class="text-muted-foreground">{check.message}</div>
																		{/if}
																		{#if check.expected !== undefined && check.actual !== undefined}
																			<div class="text-muted-foreground">
																				Expected: {check.expected}, Actual: {check.actual}
																			</div>
																		{/if}
																		{#if check.violations && check.violations.length > 0}
																			<div class="text-muted-foreground">
																				Violations: {check.violations.join(", ")}
																			</div>
																		{/if}
																	</div>
																</div>
															{/each}
														</div>
													</div>
												</td>
											</tr>
										{/if}
									{/each}
								</tbody>
							</table>
						</div>
					{:else if output}
						<pre class="text-xs font-mono whitespace-pre-wrap bg-muted/20 p-3 rounded w-full overflow-auto">{output}</pre>
					{:else if status === "running"}
						<div class="flex items-center justify-center h-full">
							<div class="text-center">
								<LoaderIcon class="animate-spin h-6 w-6 mx-auto mb-2 text-primary" />
								<p class="text-sm text-muted-foreground">Schema validation running...</p>
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
								<ShieldCheckIcon class="h-6 w-6 mx-auto mb-2 text-muted-foreground opacity-50" />
								<p class="text-sm text-muted-foreground">Ready to validate schema</p>
								<p class="text-xs text-muted-foreground mt-1">
									{pyodideStatus === 'ready' ? 'Python loaded - click "Validate"' : 'Click "Validate" to load Python and validate schema'}
								</p>
							</div>
						</div>
					{/if}
				</div>
			</CardContent>
		</Card>
	</div>
</div>