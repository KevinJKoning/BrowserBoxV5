<script lang="ts">
	import { Card, CardContent, CardHeader, CardTitle } from "../../../lib/components/ui/card/index.js";
	import { Button } from "../../../lib/components/ui/button/index.js";
	import { createResponsiveHelpers } from "../../../lib/utils/window.svelte.ts";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import ExternalLinkIcon from "@lucide/svelte/icons/external-link";
	import RefreshCwIcon from "@lucide/svelte/icons/refresh-cw";

	interface Props {
		/** HTML content to display */
		htmlContent: string;
		/** Filename being previewed */
		filename: string;
		/** File size */
		fileSize?: number;
		/** Creation date */
		createdAt?: string;
		/** Click handler for open in new tab action */
		onOpenNewTab?: () => void;
		/** Container size for responsive behavior */
		containerSize?: { width: number; height: number };
	}

	let {
		htmlContent,
		filename,
		fileSize,
		createdAt,
		onOpenNewTab,
		containerSize: _containerSize = { width: 0, height: 0 }
	}: Props = $props();
	
	// Responsive helpers
	const responsiveHelpers = createResponsiveHelpers();
	const isMobile = $derived(responsiveHelpers.isMobile);

	let iframeElement: HTMLIFrameElement;
	let isLoading = $state(true);

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
		if (iframeElement && htmlContent) {
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
		if (iframeElement && htmlContent) {
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
							disabled={isLoading}
							title="Refresh content"
						>
							<RefreshCwIcon class="size-3 {isLoading ? 'animate-spin' : ''}" />
						</Button>
						
						{#if onOpenNewTab}
							<Button
								size="sm"
								variant="ghost"
								onclick={onOpenNewTab}
								title="Open in new tab"
							>
								<ExternalLinkIcon class="size-3" />
							</Button>
						{/if}
					</div>
				</CardTitle>
			</CardHeader>
			<CardContent class="p-0 h-[calc(100%-4rem)] overflow-hidden iframe-container">
				<div class="relative h-full">
					{#if isLoading}
						<div class="absolute inset-0 flex items-center justify-center bg-muted/20">
							<div class="text-center">
								<RefreshCwIcon class="animate-spin h-6 w-6 mx-auto mb-2 text-primary" />
								<p class="text-sm text-muted-foreground">Loading HTML content...</p>
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
						{#if fileSize}
							<div class="flex justify-between">
								<span class="text-muted-foreground">Size:</span>
								<span>{formatFileSize(fileSize)}</span>
							</div>
						{/if}
						{#if createdAt}
							<div class="flex justify-between">
								<span class="text-muted-foreground">Created:</span>
								<span>{formatDate(createdAt)}</span>
							</div>
						{/if}
					</div>
				</div>

				<div>
					<h4 class="font-medium mb-2 text-sm">Preview Options</h4>
					<div class="space-y-2">
						<p class="text-xs text-muted-foreground">
							This HTML report is displayed in a sandboxed iframe for security. 
							Some interactive features may be limited.
						</p>
						
						{#if onOpenNewTab}
							<Button
								size="sm"
								variant="outline"
								onclick={onOpenNewTab}
								class="w-full"
							>
								<ExternalLinkIcon class="size-3 mr-2" />
								Open in New Tab
							</Button>
						{/if}
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