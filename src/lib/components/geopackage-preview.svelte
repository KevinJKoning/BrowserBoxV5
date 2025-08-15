<script lang="ts">
	import { Badge } from "./ui/badge/index.js";
	import { Card, CardContent, CardHeader, CardTitle } from "./ui/card/index.js";
	import { Separator } from "./ui/separator/index.js";
	import { formatFileSize } from "../utils.js";
	// Old worker system removed - using simplified Pyodide
	// import { createPyodideWorker, type WorkerMessage, type ScriptExecutionResult } from "../pyodide/pyodide-worker.js";

	interface Props {
		file: File;
		filename: string;
	}

	let { file, filename }: Props = $props();

	interface LayerInfo {
		name: string;
		geometryType: string;
		featureCount: number;
		crs: string;
		bbox: [number, number, number, number] | null;
	}

	interface AttributeInfo {
		name: string;
		type: string;
		nullable: boolean;
	}

	let layers: LayerInfo[] = $state([]);
	let selectedLayer: LayerInfo | null = $state(null);
	let attributes: AttributeInfo[] = $state([]);
	let sampleData: any[][] = $state([]);
	let loading = $state(true);
	let error = $state<string | null>(null);
	let processingStep = $state("Initializing...");

	// Use $effect to react to file changes
	$effect(() => {
		// Reset state when file changes
		loading = true;
		error = null;
		layers = [];
		selectedLayer = null;
		attributes = [];
		sampleData = [];
		processingStep = "Initializing...";
		
		// Load GeoPackage asynchronously
		loadGeoPackageInfo().catch(err => {
			error = `Failed to load GeoPackage: ${err instanceof Error ? err.message : 'Unknown error'}`;
			loading = false;
		});
	});

	async function loadGeoPackageInfo() {
		// GeoPackage functionality disabled - old worker system removed
		console.warn('GeoPackage preview not available in simplified system');
		return;
		// const worker = createPyodideWorker();
		let executionId = `geopackage-preview-${Date.now()}`;

		try {
			processingStep = "Starting Pyodide worker...";

			// Prepare the file for the worker
			const fileData = {
				name: filename,
				originalName: filename,
				requirementId: 'temp',
				data: await file.arrayBuffer()
			};

			// Python script to analyze GeoPackage
			const analysisScript = `
import os
import geopandas as gpd
import json
import traceback

try:
    print("🔍 Starting GeoPackage analysis...")
    file_path = "/data/${filename}"
    
    if not os.path.exists(file_path):
        raise FileNotFoundError(f"File not found: {file_path}")
    
    print(f"📁 File found: {file_path}")
    print(f"📏 File size: {os.path.getsize(file_path)} bytes")
    
    # Get list of layers
    print("📋 Reading layer information...")
    layers = gpd.list_layers(file_path)
    print(f"✅ Found {len(layers)} layer(s)")
    
    layer_info = []
    
    for idx, (layer_name, layer_type) in enumerate(layers.iterrows()):
        try:
            print(f"\\n🗂️  Analyzing layer {idx + 1}/{len(layers)}: '{layer_name}'")
            
            # Read layer metadata without loading all data
            gdf = gpd.read_file(file_path, layer=layer_name, rows=1)
            
            # Get basic info
            info = {
                'name': layer_name,
                'geometryType': str(gdf.geometry.dtype) if not gdf.empty else 'Unknown',
                'crs': str(gdf.crs) if gdf.crs else 'Unknown'
            }
            
            # Get feature count (more efficient way)
            try:
                full_gdf = gpd.read_file(file_path, layer=layer_name)
                info['featureCount'] = len(full_gdf)
                
                # Get bounds if geometry exists
                if not full_gdf.empty and full_gdf.geometry.notna().any():
                    bounds = full_gdf.total_bounds
                    info['bbox'] = [float(bounds[0]), float(bounds[1]), float(bounds[2]), float(bounds[3])]
                    
                    # Get actual geometry type from first valid geometry
                    first_geom = full_gdf.geometry.dropna().iloc[0] if len(full_gdf.geometry.dropna()) > 0 else None
                    if first_geom:
                        info['geometryType'] = first_geom.geom_type
                else:
                    info['bbox'] = None
                    
            except Exception as e:
                print(f"⚠️  Warning getting feature count for {layer_name}: {e}")
                info['featureCount'] = 0
                info['bbox'] = None
            
            layer_info.append(info)
            print(f"✅ Layer '{layer_name}': {info['featureCount']} features, {info['geometryType']}, CRS: {info['crs']}")
            
        except Exception as e:
            print(f"❌ Error analyzing layer '{layer_name}': {e}")
            layer_info.append({
                'name': layer_name,
                'geometryType': 'Error',
                'featureCount': 0,
                'crs': 'Unknown',
                'bbox': None
            })
    
    # Output results as JSON for JavaScript to parse
    result = {
        'layers': layer_info,
        'success': True
    }
    
    print(f"\\n🎉 Analysis complete!")
    print("📊 RESULT_JSON_START")
    print(json.dumps(result))
    print("📊 RESULT_JSON_END")
    
except Exception as e:
    print(f"❌ Error during GeoPackage analysis: {str(e)}")
    print("🔍 Full traceback:")
    traceback.print_exc()
    
    error_result = {
        'layers': [],
        'success': False,
        'error': str(e)
    }
    print("📊 RESULT_JSON_START")
    print(json.dumps(error_result))
    print("📊 RESULT_JSON_END")
`;

			return new Promise<void>((resolve, reject) => {
				const messageHandler = (event: MessageEvent<any>) => {
					const { type, id, data } = event.data;
					
					if (id !== executionId) return;

					switch (type) {
						case 'status':
							processingStep = data;
							break;
							
						case 'stdout':
							console.log('GeoPackage Worker stdout:', data);
							// Parse results from stdout
							if (data.includes('RESULT_JSON_START')) {
								const lines = data.split('\n');
								let jsonStartIdx = -1;
								let jsonEndIdx = -1;
								
								for (let i = 0; i < lines.length; i++) {
									if (lines[i].includes('RESULT_JSON_START')) {
										jsonStartIdx = i + 1;
									} else if (lines[i].includes('RESULT_JSON_END')) {
										jsonEndIdx = i;
										break;
									}
								}
								
								if (jsonStartIdx >= 0 && jsonEndIdx >= 0) {
									try {
										const jsonStr = lines.slice(jsonStartIdx, jsonEndIdx).join('\n');
										const result = JSON.parse(jsonStr);
										
										if (result.success) {
											layers = result.layers;
											if (layers.length > 0) {
												selectLayer(layers[0]);
											}
										} else {
											throw new Error(result.error || 'Failed to analyze GeoPackage');
										}
									} catch (parseError) {
										console.error('Failed to parse GeoPackage analysis result:', parseError);
										throw new Error('Failed to parse analysis results');
									}
								}
							}
							break;
							
						case 'stderr':
							console.error('GeoPackage Worker stderr:', data);
							break;
							
						case 'complete':
							worker.removeEventListener('message', messageHandler);
							worker.terminate();
							loading = false;
							resolve();
							break;
							
						case 'error':
							worker.removeEventListener('message', messageHandler);
							worker.terminate();
							reject(new Error(data.error || 'Worker execution failed'));
							break;
					}
				};

				worker.addEventListener('message', messageHandler);

				// Send the execution request
				worker.postMessage({
					id: executionId,
					python: analysisScript,
					files: [fileData]
				});
			});

		} catch (err) {
			error = `GeoPackage analysis failed: ${err instanceof Error ? err.message : 'Unknown error'}`;
			loading = false;
			throw err;
		}
	}

	async function selectLayer(layer: LayerInfo) {
		selectedLayer = layer;
		
		// Load attributes and sample data for selected layer
		try {
			await loadLayerDetails(layer.name);
		} catch (err) {
			console.error('Failed to load layer details:', err);
		}
	}

	async function loadLayerDetails(layerName: string) {
		// Layer details disabled - old worker system removed
		console.warn('Layer details not available in simplified system');
		return;
		// const worker = createPyodideWorker();
		let executionId = `layer-details-${Date.now()}`;

		const detailScript = `
import geopandas as gpd
import json
import pandas as pd

try:
    file_path = "/data/${filename}"
    layer_name = "${layerName}"
    
    print(f"🔍 Loading details for layer: {layer_name}")
    
    # Read a sample of the layer (first 10 rows)
    gdf = gpd.read_file(file_path, layer=layer_name, rows=10)
    
    # Get attribute information
    attributes = []
    for col_name, dtype in gdf.dtypes.items():
        if col_name != 'geometry':  # Skip geometry column
            attributes.append({
                'name': col_name,
                'type': str(dtype),
                'nullable': gdf[col_name].isnull().any()
            })
    
    # Get sample data (convert to regular Python types)
    sample_data = []
    for _, row in gdf.iterrows():
        row_data = []
        for col_name in gdf.columns:
            if col_name != 'geometry':
                value = row[col_name]
                # Convert pandas/numpy types to Python native types
                if pd.isna(value):
                    row_data.append(None)
                elif isinstance(value, (pd.Timestamp, pd.datetime)):
                    row_data.append(str(value))
                else:
                    row_data.append(str(value))
        sample_data.append(row_data)
    
    result = {
        'attributes': attributes,
        'sampleData': sample_data,
        'success': True
    }
    
    print("📊 DETAILS_JSON_START")
    print(json.dumps(result))
    print("📊 DETAILS_JSON_END")
    
except Exception as e:
    print(f"❌ Error loading layer details: {str(e)}")
    error_result = {
        'attributes': [],
        'sampleData': [],
        'success': False,
        'error': str(e)
    }
    print("📊 DETAILS_JSON_START")
    print(json.dumps(error_result))
    print("📊 DETAILS_JSON_END")
`;

		return new Promise<void>((resolve, reject) => {
			const messageHandler = (event: MessageEvent<any>) => {
				const { type, id, data } = event.data;
				
				if (id !== executionId) return;

				switch (type) {
					case 'stdout':
						if (data.includes('DETAILS_JSON_START')) {
							const lines = data.split('\n');
							let jsonStartIdx = -1;
							let jsonEndIdx = -1;
							
							for (let i = 0; i < lines.length; i++) {
								if (lines[i].includes('DETAILS_JSON_START')) {
									jsonStartIdx = i + 1;
								} else if (lines[i].includes('DETAILS_JSON_END')) {
									jsonEndIdx = i;
									break;
								}
							}
							
							if (jsonStartIdx >= 0 && jsonEndIdx >= 0) {
								try {
									const jsonStr = lines.slice(jsonStartIdx, jsonEndIdx).join('\n');
									const result = JSON.parse(jsonStr);
									
									if (result.success) {
										attributes = result.attributes;
										sampleData = result.sampleData;
									}
								} catch (parseError) {
									console.error('Failed to parse layer details:', parseError);
								}
							}
						}
						break;
						
					case 'complete':
						worker.removeEventListener('message', messageHandler);
						worker.terminate();
						resolve();
						break;
						
					case 'error':
						worker.removeEventListener('message', messageHandler);
						worker.terminate();
						reject(new Error(data.error || 'Worker execution failed'));
						break;
				}
			};

			worker.addEventListener('message', messageHandler);

			// Prepare the file for the worker
			const fileData = {
				name: filename,
				originalName: filename,
				requirementId: 'temp',
				data: file.arrayBuffer()
			};

			// Send the execution request
			worker.postMessage({
				id: executionId,
				python: detailScript,
				files: [fileData]
			});
		});
	}

	function formatBounds(bbox: [number, number, number, number] | null): string {
		if (!bbox) return 'Unknown';
		return `[${bbox[0].toFixed(6)}, ${bbox[1].toFixed(6)}, ${bbox[2].toFixed(6)}, ${bbox[3].toFixed(6)}]`;
	}
</script>

<div class="flex gap-6 h-full">
	<!-- Main View (2/3 width) -->
	<div class="flex-[2] min-w-0">
		<Card class="h-full">
			<CardHeader>
				<CardTitle class="flex items-center justify-between">
					<span class="truncate">{filename}</span>
					{#if !loading && !error && layers.length > 0}
						<Badge variant="secondary">
							{layers.length} layer{layers.length !== 1 ? 's' : ''}
						</Badge>
					{/if}
				</CardTitle>
			</CardHeader>
			<CardContent class="p-0 h-[calc(100%-4rem)] overflow-hidden">
				{#if loading}
					<div class="flex items-center justify-center h-full">
						<div class="text-center">
							<div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
							<p class="text-sm text-muted-foreground">Loading GeoPackage...</p>
							<p class="text-xs text-muted-foreground mt-2">{processingStep}</p>
						</div>
					</div>
				{:else if error}
					<div class="flex items-center justify-center h-full">
						<div class="text-center">
							<p class="text-sm text-destructive mb-2">Error</p>
							<p class="text-xs text-muted-foreground">{error}</p>
						</div>
					</div>
				{:else if layers.length === 0}
					<div class="flex items-center justify-center h-full">
						<div class="text-center">
							<div class="text-6xl mb-4">📄</div>
							<h3 class="text-lg font-medium mb-2">No Layers Found</h3>
							<p class="text-muted-foreground">
								This GeoPackage appears to be empty or contains no spatial layers.
							</p>
						</div>
					</div>
				{:else}
					<div class="flex flex-col h-full">
						<!-- Layer Selector -->
						<div class="p-4 border-b">
							<h4 class="font-medium mb-2">Layers</h4>
							<div class="flex flex-wrap gap-2">
								{#each layers as layer}
									<button
										class="px-3 py-1 text-sm border rounded-md transition-colors {selectedLayer?.name === layer.name ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'}"
										onclick={() => selectLayer(layer)}
									>
										{layer.name} ({layer.featureCount})
									</button>
								{/each}
							</div>
						</div>

						<!-- Selected Layer Content -->
						{#if selectedLayer}
							<div class="flex-1 overflow-auto p-4">
								<h4 class="font-medium mb-3">Layer: {selectedLayer.name}</h4>
								
								{#if attributes.length > 0 && sampleData.length > 0}
									<div class="overflow-auto">
										<table class="w-full text-sm">
											<thead class="sticky top-0 bg-muted">
												<tr>
													{#each attributes as attr}
														<th class="text-left p-3 font-medium border-b min-w-[120px]">
															<div class="truncate" title={attr.name}>
																{attr.name}
															</div>
															<div class="text-xs text-muted-foreground font-normal">
																{attr.type}
															</div>
														</th>
													{/each}
												</tr>
											</thead>
											<tbody>
												{#each sampleData as row, rowIndex}
													<tr class="border-b hover:bg-muted/50">
														{#each row as cell, cellIndex}
															<td class="p-3 max-w-[200px]">
																<div class="truncate" title={cell || ''}>
																	{cell || ''}
																</div>
															</td>
														{/each}
													</tr>
												{/each}
												{#if sampleData.length === 10}
													<tr>
														<td colspan={attributes.length} class="p-3 text-center text-sm text-muted-foreground">
															Showing first 10 rows of {selectedLayer.featureCount.toLocaleString()} total features
														</td>
													</tr>
												{/if}
											</tbody>
										</table>
									</div>
								{:else}
									<div class="flex items-center justify-center h-32">
										<p class="text-muted-foreground">Loading layer details...</p>
									</div>
								{/if}
							</div>
						{/if}
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
								<span class="text-muted-foreground">Layers:</span>
								<span>{layers.length}</span>
							</div>
							<div class="flex justify-between">
								<span class="text-muted-foreground">Format:</span>
								<span>GeoPackage (SQLite)</span>
							</div>
						</div>
					</div>

					{#if selectedLayer}
						<Separator />

						<!-- Selected Layer Info -->
						<div>
							<h4 class="font-medium mb-2">Selected Layer</h4>
							<div class="space-y-1 text-sm">
								<div class="flex justify-between">
									<span class="text-muted-foreground">Name:</span>
									<span class="truncate ml-2" title={selectedLayer.name}>{selectedLayer.name}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-muted-foreground">Geometry:</span>
									<span>{selectedLayer.geometryType}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-muted-foreground">Features:</span>
									<span>{selectedLayer.featureCount.toLocaleString()}</span>
								</div>
								<div class="flex justify-between">
									<span class="text-muted-foreground">CRS:</span>
									<span class="truncate ml-2" title={selectedLayer.crs}>{selectedLayer.crs}</span>
								</div>
								{#if selectedLayer.bbox}
									<div class="space-y-1">
										<span class="text-muted-foreground text-xs">Bounding Box:</span>
										<div class="text-xs font-mono bg-muted p-2 rounded">
											{formatBounds(selectedLayer.bbox)}
										</div>
									</div>
								{/if}
							</div>
						</div>

						{#if attributes.length > 0}
							<Separator />

							<!-- Attributes -->
							<div>
								<h4 class="font-medium mb-2">Attributes ({attributes.length})</h4>
								<div class="space-y-2">
									{#each attributes as attr}
										<div class="flex justify-between items-start p-2 rounded border text-sm">
											<div class="min-w-0 flex-1">
												<div class="font-medium truncate" title={attr.name}>
													{attr.name}
												</div>
												<div class="text-xs text-muted-foreground">
													{attr.type}{attr.nullable ? ' (nullable)' : ''}
												</div>
											</div>
										</div>
									{/each}
								</div>
							</div>
						{/if}
					{/if}

					{#if layers.length > 1}
						<Separator />

						<!-- All Layers Summary -->
						<div>
							<h4 class="font-medium mb-2">All Layers</h4>
							<div class="space-y-2">
								{#each layers as layer}
									<div class="p-2 rounded border text-sm">
										<div class="font-medium">{layer.name}</div>
										<div class="text-xs text-muted-foreground">
											{layer.geometryType} • {layer.featureCount.toLocaleString()} features
										</div>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				{/if}
			</CardContent>
		</Card>
	</div>
</div>