<script lang="ts">
	import { parquetMetadata, parquetRead } from 'hyparquet';
	import { Badge } from "../../components/ui/badge/index.js";
	import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card/index.js";
	import { Separator } from "../../components/ui/separator/index.js";
	import { formatFileSize } from "../../utils.js";

	interface Props {
		file: File;
		filename: string;
	}

	let { file, filename }: Props = $props();

	let metadata: any = $state(null);
	let tableData: any[][] = $state([]);
	let columns: string[] = $state([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let rowCount = $state(0);
	let displayRows = $state(100); // Limit display for performance

	// Use $effect to react to file changes instead of onMount
	$effect(() => {
		// Reset state when file changes
		loading = true;
		error = null;
		metadata = null;
		tableData = [];
		columns = [];
		rowCount = 0;
		
		// Load parquet file asynchronously
		loadParquetFile().catch(err => {
			error = `Failed to load parquet file: ${err instanceof Error ? err.message : 'Unknown error'}`;
			loading = false;
		});
	});

	async function loadParquetFile() {
		const arrayBuffer = await file.arrayBuffer();
		
		// Get metadata
		metadata = parquetMetadata(arrayBuffer);
		rowCount = Number(metadata.num_rows);
		
		// Extract column names from schema
		const allColumns = metadata.schema
			.filter((field: any) => field.repetition_type !== 'REPEATED' || field.name !== 'list')
			.map((field: any) => field.name);
		
		// Skip the first column if it doesn't match the data structure
		columns = allColumns.slice(1);

		// Read the data
		await parquetRead({
			file: arrayBuffer,
			onComplete: (data: any[]) => {
				// Take only the rows we need for display
				tableData = data.slice(0, displayRows);
				loading = false;
			}
		});
	}

	function formatValue(value: any): string {
		if (value === null || value === undefined) return '';
		if (typeof value === 'object') return JSON.stringify(value);
		return String(value);
	}

	function getColumnType(colIndex: number): string {
		if (!metadata?.schema || colIndex >= metadata.schema.length) return 'unknown';
		const field = metadata.schema[colIndex];
		return field.type || field.converted_type || 'unknown';
	}

</script>

<div class="flex gap-6 h-full">
	<!-- Table View (2/3 width) -->
	<div class="flex-[2] min-w-0">
		<Card class="h-full">
			<CardHeader>
				<CardTitle class="flex items-center justify-between">
					<span class="truncate">{filename}</span>
					{#if !loading && !error}
						<Badge variant="secondary">
							{rowCount.toLocaleString()} rows
						</Badge>
					{/if}
				</CardTitle>
			</CardHeader>
			<CardContent class="p-0 h-[calc(100%-4rem)] overflow-hidden">
				{#if loading}
					<div class="flex items-center justify-center h-full">
						<div class="text-center">
							<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
							<p class="text-sm text-muted-foreground">Loading parquet file...</p>
						</div>
					</div>
				{:else if error}
					<div class="flex items-center justify-center h-full">
						<div class="text-center">
							<p class="text-sm text-destructive mb-2">Error</p>
							<p class="text-xs text-muted-foreground">{error}</p>
						</div>
					</div>
				{:else}
					<div class="overflow-auto h-full">
						<table class="w-full text-sm">
							<thead class="sticky top-0 bg-muted">
								<tr>
									{#each columns as column, i}
										<th class="text-left p-3 font-medium border-b min-w-[120px]">
											<div class="truncate" title={column}>
												{column}
											</div>
											<div class="text-xs text-muted-foreground font-normal">
												{getColumnType(i)}
											</div>
										</th>
									{/each}
								</tr>
							</thead>
							<tbody>
								{#each tableData as row, rowIndex}
									<tr class="border-b hover:bg-muted/50">
										{#each row as cell, cellIndex}
											<td class="p-3 max-w-[200px]">
												<div class="truncate" title={formatValue(cell)}>
													{formatValue(cell)}
												</div>
											</td>
										{/each}
									</tr>
								{/each}
								{#if tableData.length === displayRows && rowCount > displayRows}
									<tr>
										<td colspan={columns.length} class="p-3 text-center text-sm text-muted-foreground">
											Showing first {displayRows} rows of {rowCount.toLocaleString()} total
										</td>
									</tr>
								{/if}
							</tbody>
						</table>
					</div>
				{/if}
			</CardContent>
		</Card>
	</div>

	<!-- Metadata View (1/3 width) -->
	<div class="flex-1 min-w-0">
		<Card class="h-full">
			<CardHeader>
				<CardTitle>Metadata</CardTitle>
			</CardHeader>
			<CardContent class="space-y-4 h-[calc(100%-4rem)] overflow-auto">
				{#if loading}
					<div class="animate-pulse space-y-3">
						<div class="h-4 bg-muted rounded"></div>
						<div class="h-4 bg-muted rounded w-3/4"></div>
						<div class="h-4 bg-muted rounded w-1/2"></div>
					</div>
				{:else if error}
					<p class="text-sm text-muted-foreground">Metadata unavailable</p>
				{:else if metadata}
					<!-- File Info -->
					<div>
						<h4 class="font-medium mb-2">File Information</h4>
						<div class="space-y-1 text-sm">
							<div class="flex justify-between">
								<span class="text-muted-foreground">Size:</span>
								<span>{formatFileSize(file.size)}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Rows:</span>
								<span>{rowCount.toLocaleString()}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Columns:</span>
								<span>{columns.length}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Version:</span>
								<span>{metadata.version || 'Unknown'}</span>
							</div>
						</div>
					</div>

					<Separator />

					<!-- Schema -->
					<div>
						<h4 class="font-medium mb-2">Schema</h4>
						<div class="space-y-2">
							{#each columns as column, i}
								<div class="flex justify-between items-start p-2 rounded border text-sm">
									<div class="min-w-0 flex-1">
										<div class="font-medium truncate" title={column}>
											{column}
										</div>
										<div class="text-xs text-muted-foreground">
											{getColumnType(i)}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>

					{#if metadata.created_by}
						<Separator />
						<div>
							<h4 class="font-medium mb-2">Created By</h4>
							<p class="text-sm text-muted-foreground">{metadata.created_by}</p>
						</div>
					{/if}
				{/if}
			</CardContent>
		</Card>
	</div>
</div>
