<script lang="ts">
	import { Badge } from "../../../lib/components/ui/badge/index.js";
	import { Card, CardContent, CardHeader, CardTitle } from "../../../lib/components/ui/card/index.js";
	import { Separator } from "../../../lib/components/ui/separator/index.js";
	import { formatFileSize } from "../../../lib/utils.js";

	interface Props {
		file: File;
		filename: string;
	}

	let { file, filename }: Props = $props();

	let tableData: string[][] = $state([]);
	let columns: string[] = $state([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let rowCount = $state(0);
	let displayRows = $state(100); // Limit display for performance
	let delimiter = $state(','); // Detected or default delimiter
	let encoding = $state('utf-8'); // Detected encoding

	// Use $effect to react to file changes
	$effect(() => {
		// Reset state when file changes
		loading = true;
		error = null;
		tableData = [];
		columns = [];
		rowCount = 0;
		delimiter = ',';
		encoding = 'utf-8';
		
		// Load CSV file asynchronously
		loadCSVFile().catch(err => {
			error = `Failed to load CSV file: ${err instanceof Error ? err.message : 'Unknown error'}`;
			loading = false;
		});
	});

	async function loadCSVFile() {
		try {
			// Read file as text
			const text = await file.text();
			
			// Detect delimiter by checking first few lines
			delimiter = detectDelimiter(text);
			
			// Parse CSV
			const lines = text.split('\n').filter(line => line.trim() !== '');
			rowCount = lines.length;
			
			if (lines.length === 0) {
				throw new Error('CSV file is empty');
			}
			
			// Parse header (first line)
			columns = parseCSVLine(lines[0], delimiter);
			
			// Parse data rows (up to display limit)
			const dataLines = lines.slice(1, Math.min(lines.length, displayRows + 1));
			tableData = dataLines.map(line => parseCSVLine(line, delimiter));
			
			// Ensure all rows have same number of columns as header
			tableData = tableData.map(row => {
				const normalizedRow = [...row];
				while (normalizedRow.length < columns.length) {
					normalizedRow.push('');
				}
				return normalizedRow.slice(0, columns.length);
			});
			
			loading = false;
		} catch (err) {
			throw new Error(`CSV parsing failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
		}
	}

	function detectDelimiter(text: string): string {
		// Check first few lines for common delimiters
		const firstLines = text.split('\n').slice(0, 5).join('\n');
		const delimiters = [',', ';', '\t', '|'];
		const counts = delimiters.map(delim => ({
			delimiter: delim,
			count: (firstLines.match(new RegExp(`\\${delim}`, 'g')) || []).length
		}));
		
		// Return delimiter with highest count, default to comma
		const bestDelimiter = counts.sort((a, b) => b.count - a.count)[0];
		return bestDelimiter.count > 0 ? bestDelimiter.delimiter : ',';
	}

	function parseCSVLine(line: string, delimiter: string): string[] {
		const result: string[] = [];
		let current = '';
		let inQuotes = false;
		let i = 0;
		
		while (i < line.length) {
			const char = line[i];
			
			if (char === '"') {
				if (inQuotes && line[i + 1] === '"') {
					// Escaped quote
					current += '"';
					i += 2;
				} else {
					// Toggle quote state
					inQuotes = !inQuotes;
					i++;
				}
			} else if (char === delimiter && !inQuotes) {
				// Field separator
				result.push(current.trim());
				current = '';
				i++;
			} else {
				current += char;
				i++;
			}
		}
		
		// Add the last field
		result.push(current.trim());
		return result;
	}

	function formatValue(value: string): string {
		if (!value || value.trim() === '') return '';
		return value;
	}

	function getColumnType(colIndex: number): string {
		if (tableData.length === 0) return 'text';
		
		// Sample first few non-empty values to determine type
		const sampleValues = tableData
			.slice(0, 10)
			.map(row => row[colIndex])
			.filter(val => val && val.trim() !== '');
		
		if (sampleValues.length === 0) return 'text';
		
		// Check if all samples are numbers
		if (sampleValues.every(val => !isNaN(Number(val)) && val.trim() !== '')) {
			return sampleValues.some(val => val.includes('.')) ? 'float' : 'integer';
		}
		
		// Check if all samples are dates
		if (sampleValues.every(val => !isNaN(Date.parse(val)))) {
			return 'date';
		}
		
		return 'text';
	}

	function getDelimiterName(delim: string): string {
		switch (delim) {
			case ',': return 'Comma';
			case ';': return 'Semicolon';
			case '\t': return 'Tab';
			case '|': return 'Pipe';
			default: return 'Custom';
		}
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
							<p class="text-sm text-muted-foreground">Loading CSV file...</p>
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
												{column || `Column ${i + 1}`}
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
								{#if tableData.length === displayRows && rowCount > displayRows + 1}
									<tr>
										<td colspan={columns.length} class="p-3 text-center text-sm text-muted-foreground">
											Showing first {displayRows} rows of {(rowCount - 1).toLocaleString()} total data rows
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
				{:else}
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
								<span>{(rowCount - 1).toLocaleString()} data + 1 header</span>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Columns:</span>
								<span>{columns.length}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Delimiter:</span>
								<span>{getDelimiterName(delimiter)}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Encoding:</span>
								<span>{encoding.toUpperCase()}</span>
							</div>
						</div>
					</div>

					<Separator />

					<!-- Schema -->
					<div>
						<h4 class="font-medium mb-2">Column Schema</h4>
						<div class="space-y-2">
							{#each columns as column, i}
								<div class="flex justify-between items-start p-2 rounded border text-sm">
									<div class="min-w-0 flex-1">
										<div class="font-medium truncate" title={column || `Column ${i + 1}`}>
											{column || `Column ${i + 1}`}
										</div>
										<div class="text-xs text-muted-foreground">
											{getColumnType(i)}
										</div>
									</div>
								</div>
							{/each}
						</div>
					</div>

					<Separator />
					
					<!-- CSV-specific info -->
					<div>
						<h4 class="font-medium mb-2">CSV Details</h4>
						<div class="space-y-1 text-sm">
							<div class="flex justify-between">
								<span class="text-muted-foreground">Has Header:</span>
								<span>Yes</span>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Delimiter:</span>
								<span>'{delimiter}' ({getDelimiterName(delimiter)})</span>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Quote Character:</span>
								<span>'"' (Double Quote)</span>
							</div>
						</div>
					</div>
				{/if}
			</CardContent>
		</Card>
	</div>
</div>