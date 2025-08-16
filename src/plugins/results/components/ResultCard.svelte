<script lang="ts">
	import { Badge } from "../../../lib/components/ui/badge/index.js";
	import { Button } from "../../../lib/components/ui/button/index.js";
	import { cn } from "@utils/generic.ts";
	import FileIcon from "@lucide/svelte/icons/file";
	import FileTextIcon from "@lucide/svelte/icons/file-text";
	import DownloadIcon from "@lucide/svelte/icons/download";
	import DatabaseIcon from "@lucide/svelte/icons/database";

	interface Props {
		/** Unique identifier for the result file */
		id: string;
		/** Filename of the result */
		filename: string;
		/** File type/extension */
		fileType: string;
		/** File size in bytes */
		fileSize: number;
		/** Creation date */
		createdAt: string;
		/** Optional description/metadata */
		description?: string;
		/** Whether this result is currently selected for preview */
		isSelected?: boolean;
		/** Click handler for preview action */
		onPreview?: () => void;
		/** Click handler for download action */
		onDownload?: () => void;
	}

	let {
		id,
		filename,
		fileType,
		fileSize,
		createdAt,
		description,
		isSelected = false,
		onPreview,
		onDownload
	}: Props = $props();

	// Get appropriate icon for file type
	const getFileIcon = (type: string) => {
		switch (type.toLowerCase()) {
			case 'html':
			case 'htm':
				return FileTextIcon;
			case 'parquet':
			case 'pq':
				return DatabaseIcon;
			default:
				return FileIcon;
		}
	};

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

	const FileIconComponent = getFileIcon(fileType);
</script>


{#if onPreview}
	<button
		data-result-id={id}
		class={cn(
			"flex flex-col gap-3 rounded-lg border p-4 transition-all w-full text-left",
			"border-border bg-background",
			"cursor-pointer hover:shadow-md hover:scale-[1.02]",
			isSelected && "ring-2 ring-blue-500/80 ring-offset-2 shadow-lg drop-shadow-sm"
		)}
		onclick={onPreview}
	>
		<!-- Header with file info -->
		<div class="flex items-center justify-between min-w-0">
			<div class="flex items-center gap-2 min-w-0 flex-1">
				<div class="flex-shrink-0 p-1 rounded bg-muted/50">
					<FileIconComponent class="size-4 text-muted-foreground" />
				</div>
				<span class="font-medium text-sm truncate">{filename}</span>
			</div>
			<Badge variant="outline" class="text-xs flex-shrink-0">
				{fileType.toUpperCase()}
			</Badge>
		</div>
		
		{#if description}
			<p class="text-xs text-muted-foreground line-clamp-2">
				{description}
			</p>
		{/if}
		
		<div class="flex items-center gap-4 text-xs text-muted-foreground">
			<span class="flex-shrink-0">{formatFileSize(fileSize)}</span>
			<span class="truncate">{formatDate(createdAt)}</span>
		</div>
		
		<!-- Actions -->
		{#if onDownload}
			<div class="flex gap-2 mt-2">
				<Button
					size="sm"
					variant="outline"
					class="flex-1 text-xs h-7"
					onclick={(e) => { e.stopPropagation(); onDownload?.(); }}
				>
					<DownloadIcon class="size-3 mr-1" />
					Download
				</Button>
			</div>
		{/if}
		
	</button>
{:else}
	<div 
		data-result-id={id}
		class={cn(
			"flex flex-col gap-3 rounded-lg border p-4 transition-all hover:shadow-sm",
			"border-border bg-background"
		)}
	>
		<!-- Header with file info -->
		<div class="flex items-center justify-between min-w-0">
			<div class="flex items-center gap-2 min-w-0 flex-1">
				<div class="flex-shrink-0 p-1 rounded bg-muted/50">
					<FileIconComponent class="size-4 text-muted-foreground" />
				</div>
				<span class="font-medium text-sm truncate">{filename}</span>
			</div>
			<Badge variant="outline" class="text-xs flex-shrink-0">
				{fileType.toUpperCase()}
			</Badge>
		</div>
		
		{#if description}
			<p class="text-xs text-muted-foreground line-clamp-2">
				{description}
			</p>
		{/if}
		
		<div class="flex items-center gap-4 text-xs text-muted-foreground">
			<span class="flex-shrink-0">{formatFileSize(fileSize)}</span>
			<span class="truncate">{formatDate(createdAt)}</span>
		</div>
		
		<!-- Actions -->
		{#if onDownload}
			<div class="flex gap-2 mt-2">
				<Button
					size="sm"
					variant="outline"
					class="flex-1 text-xs h-7"
					onclick={onDownload}
				>
					<DownloadIcon class="size-3 mr-1" />
					Download
				</Button>
			</div>
		{/if}
		
	</div>
{/if}