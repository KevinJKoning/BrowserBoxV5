<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from "../../../lib/components/ui/card/index.js";
	import { Button } from "../../../lib/components/ui/button/index.js";
	import { createResponsiveHelpers } from "../../../lib/utils/window.svelte.ts";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";

	interface Props {
		/** File to preview */
		file: File;
		/** Filename being previewed */
		filename: string;
		/** Container size for responsive behavior */
		containerSize?: { width: number; height: number };
	}

	let {
		file,
		filename,
		containerSize: _containerSize = { width: 0, height: 0 }
	}: Props = $props();

	// HTML content loaded from file
	let htmlContent = $state('');
	let loadingContent = $state(true);
	
	// Responsive helpers
	const responsiveHelpers = createResponsiveHelpers();
	const isMobile = $derived(responsiveHelpers.isMobile);

	let iframeElement: HTMLIFrameElement;
	let isLoading = $state(true);

	// Load HTML content from file
	const loadFileContent = async () => {
		if (!file) return;
		
		try {
			loadingContent = true;
			const content = await file.text();
			htmlContent = content;
		} catch (error) {
			console.error('Failed to load HTML file:', error);
			htmlContent = '<p>Failed to load HTML content</p>';
		} finally {
			loadingContent = false;
		}
	};

	// Load file content when file changes
	$effect(() => {
		loadFileContent();
	});

	// Format file size
	const formatFileSize = (bytes: number): string => {
		const sizes = ['Bytes', 'KB', 'MB', 'GB'];
		if (bytes === 0) return '0 Bytes';
		const i = Math.floor(Math.log(bytes) / Math.log(1024));
		return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
	};

	// Format date
	const formatDate = (dateString: string): string => {
		return new Date(dateString).toLocaleString();
	};

	// Load HTML content into iframe
	const loadHtmlContent = () => {
		if (iframeElement && htmlContent && !loadingContent) {
			isLoading = true;
			// Create a blob URL for the HTML content
			const blob = new Blob([htmlContent], { type: 'text/html' });
			const url = URL.createObjectURL(blob);
			
			iframeElement.onload = () => {
				isLoading = false;
			};
			
			iframeElement.onerror = () => {
				isLoading = false;
			};
			
			iframeElement.src = url;
			
			// Clean up blob URL after a delay
			setTimeout(() => URL.revokeObjectURL(url), 1000);
		}
	};

	// Refresh iframe content
	const refreshContent = () => {
		loadHtmlContent();
	};

	// Load content when component mounts or content changes
	$effect(() => {
		if (iframeElement && htmlContent && !loadingContent) {
			loadHtmlContent();
		}
	});
</script>

<div class="flex gap-6 h-full {isMobile ? 'flex-col' : 'flex-row'}">
	<!-- HTML Content View -->
	<div class="flex-1 min-w-0">
		<Card class="h-full">
			<CardHeader>
				<CardTitle class="flex items-center justify-between gap-4 min-w-0">
					<span class="truncate flex items-center gap-2 min-w-0 flex-shrink">
						<FileTextIcon class="size-4 flex-shrink-0" />
						<span class="truncate">{filename}</span>
					</span>
					<div class="flex items-center gap-2 flex-shrink-0">
						<Button
							size="sm"
							variant="ghost"
							onclick={refreshContent}
							disabled={isLoading || loadingContent}
							title="Refresh content"
						>
							<RefreshCwIcon class="size-3 {isLoading || loadingContent ? 'animate-spin' : ''}" />
						</Button>
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent class="p-0 h-[calc(100%-4rem)] overflow-hidden iframe-container">
				<div class="relative h-full">
					{#if isLoading || loadingContent}
						<div class="absolute inset-0 flex items-center justify-center bg-muted/20">
							<div class="text-center">
								<RefreshCwIcon class="animate-spin h-6 w-6 mx-auto mb-2 text-primary" />
								<p class="text-sm text-muted-foreground">
									{loadingContent ? 'Loading file content...' : 'Loading HTML content...'}
								</p>
							</div>
						</div>
					{/if}
					
					<iframe
						bind:this={iframeElement}
						class="w-full h-full border-0 {isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity"
						title={`Preview of ${filename}`}
						sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
					></iframe>
				</div>
			</CardContent>
		</Card>
	</div>

	<!-- File Info Panel -->
	<div class="w-80 flex-shrink-0 {isMobile ? 'w-full h-64' : ''}">
		<Card class="h-full">
			<CardHeader>
				<CardTitle class="text-base">File Information</CardTitle>
			</CardHeader>
			<CardContent class="space-y-4">
				<div>
					<h4 class="font-medium mb-2 text-sm">Details</h4>
					<div class="space-y-1 text-sm">
						<div class="flex justify-between">
							<span class="text-muted-foreground">Type:</span>
							<span>HTML Report</span>
						</div>
						<div class="flex justify-between">
							<span class="text-muted-foreground">Filename:</span>
							<span class="truncate ml-2" title={filename}>{filename}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-muted-foreground">Size:</span>
							<span>{formatFileSize(file.size)}</span>
						</div>
						<div class="flex justify-between">
							<span class="text-muted-foreground">Modified:</span>
							<span>{formatDate(new Date(file.lastModified).toISOString())}</span>
						</div>
					</div>
				</div>

				<div>
					<h4 class="font-medium mb-2 text-sm">Preview Options</h4>
					<div class="space-y-2">
						<p class="text-xs text-muted-foreground">
							This HTML report is displayed in a sandboxed iframe for security. 
							Some interactive features may be limited.
						</p>
						
						<Button
							size="sm"
							variant="outline"
							onclick={() => {
								const blob = new Blob([htmlContent], { type: 'text/html' });
								const url = URL.createObjectURL(blob);
								window.open(url, '_blank');
								setTimeout(() => URL.revokeObjectURL(url), 1000);
							}}
							class="w-full"
							disabled={!htmlContent || loadingContent}
						>
							<ExternalLinkIcon class="size-3 mr-2" />
							Open in New Tab
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	</div>
</div>

<style>
  :global(.iframe-container) {
    /* Performance optimizations for iframe containers */
    contain: layout style paint;
    will-change: auto;
  }
  
  iframe {
    /* Optimize iframe rendering */
    transform: translateZ(0);
    backface-visibility: hidden;
  }
  
  /* Smooth transitions */
  :global(.transition-opacity) {
    transition: opacity 0.2s ease-in-out;
  }
</style>