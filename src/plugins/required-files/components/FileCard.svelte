<script lang="ts">
	import { Badge } from "../../../lib/components/ui/badge/index.js";
	import { Button } from "../../../lib/components/ui/button/index.js";
	import { cn } from "../../../lib/utils.js";
	import CheckCircleIcon from "@lucide/svelte/icons/check-circle";
	import FileIcon from "@lucide/svelte/icons/file";
	import UploadIcon from "@lucide/svelte/icons/upload";
	import XCircleIcon from "@lucide/svelte/icons/x-circle";
	import type { Snippet } from "svelte";
	import type { ComponentType } from "svelte";

	interface Props {
		/** Unique identifier for the file requirement */
		id: string;
		/** Display name for the file */
		title: string;
		/** Description of what this file should contain */
		description: string;
		/** Default/suggested filename */
		defaultFilename: string;
		/** Current upload status */
		status: "waiting" | "uploading" | "completed" | "error";
		/** Uploaded filename (if completed) */
		uploadedFilename?: string;
		/** File size (if completed) */
		fileSize?: string;
		/** Upload date (if completed) */
		uploadedAt?: string;
		/** Whether the file was renamed to match expected name */
		wasRenamed?: boolean;
		/** Click handler for upload action */
		onUpload?: () => void;
		/** Click handler for remove/reset action */
		onRemove?: () => void;
		/** Click handler for preview action */
		onPreview?: () => void;
	}

	let {
		id,
		title,
		description,
		defaultFilename,
		status = "waiting",
		uploadedFilename,
		fileSize,
		uploadedAt,
		wasRenamed,
		onUpload,
		onRemove,
		onPreview,
		...restProps
	}: Props = $props();

	const statusConfig = {
		waiting: {
			badge: { variant: "outline" as const, text: "Required" },
			icon: FileIcon,
			iconClass: "text-muted-foreground",
			cardClass: "border-dashed border-muted-foreground/50",
		},
		uploading: {
			badge: { variant: "secondary" as const, text: "Uploading..." },
			icon: UploadIcon,
			iconClass: "text-blue-500 animate-pulse",
			cardClass: "border-blue-200 bg-blue-50/50",
		},
		completed: {
			badge: { variant: "default" as const, text: "Uploaded" },
			icon: CheckCircleIcon,
			iconClass: "text-green-500",
			cardClass: "border-green-200 bg-green-50/50",
		},
		error: {
			badge: { variant: "destructive" as const, text: "Error" },
			icon: XCircleIcon,
			iconClass: "text-red-500",
			cardClass: "border-red-200 bg-red-50/50",
		},
	};

	// Make config reactive using $derived
	const config = $derived(statusConfig[status]);
	const IconComponent = $derived(config.icon);

	// Modern runes-based reactive state - use $derived for reactivity
	const isSelected = $derived(fileSelectors.isFileSelected(id));
	
	// Debug logging to track status changes
	$effect(() => {
		console.log(`FileCard ${id}: status="${status}", isSelected=${isSelected}, onPreview=${!!onPreview}`);
		console.log(`  - config:`, config);
		console.log(`  - uploadedFilename:`, uploadedFilename);
		console.log(`  - rendering in:`, status === "completed" && onPreview ? "BUTTON (completed)" : "DIV (other)");
	});
</script>

{#if status === "completed" && onPreview}
	<button
		class={cn(
			"flex flex-col gap-3 rounded-lg border p-4 transition-all w-full text-left",
			config.cardClass,
			"cursor-pointer hover:shadow-md hover:scale-[1.02]",
			isSelected && "ring-2 ring-blue-500/80 ring-offset-2 shadow-lg drop-shadow-sm"
		)}
		onclick={onPreview}
		{...restProps}
	>
		<!-- Header with status -->
		<div class="flex items-center justify-between min-w-0">
			<div class="flex items-center gap-2 min-w-0 flex-1">
				<IconComponent class={cn("size-4", config.iconClass)} />
				<span class="font-medium text-sm truncate">{title}</span>
			</div>
			<Badge variant={config.badge.variant} class="flex-shrink-0">{config.badge.text}</Badge>
		</div>

		<!-- Description -->
		<p class="text-xs text-muted-foreground line-clamp-2">
			{description}
		</p>

		<!-- File details -->
		<div class="space-y-1">
			{#if status === "completed" && uploadedFilename}
				<div class="text-xs">
					<span class="font-medium">File:</span>
					{uploadedFilename}
				</div>
				{#if wasRenamed}
					<div class="flex items-center gap-1 text-xs">
						<Badge variant="secondary" class="text-xs px-1 py-0 h-4">
							Renamed
						</Badge>
						<span class="text-muted-foreground">from original file</span>
					</div>
				{/if}
				{#if fileSize}
					<div class="text-xs text-muted-foreground">
						<span class="font-medium">Size:</span>
						{fileSize}
					</div>
				{/if}
				{#if uploadedAt}
					<div class="text-xs text-muted-foreground">
						<span class="font-medium">Uploaded:</span>
						{uploadedAt}
					</div>
				{/if}
			{:else}
				<div class="text-xs text-muted-foreground">
					<span class="font-medium">Expected:</span>
					{defaultFilename}
				</div>
			{/if}
		</div>

		<!-- Actions -->
		<div class="flex gap-2 mt-2">
			<Button
				size="sm"
				variant="outline"
				class="flex-1 text-xs"
				onclick={(e) => { e.stopPropagation(); onUpload?.(); }}
			>
				<UploadIcon class="size-3 mr-1" />
				Replace
			</Button>
		</div>
	</button>
{:else}
	<div
		class={cn(
			"flex flex-col gap-3 rounded-lg border p-4 transition-all hover:shadow-sm",
			config.cardClass
		)}
		{...restProps}
	>
		<!-- Header with status -->
		<div class="flex items-center justify-between min-w-0">
			<div class="flex items-center gap-2 min-w-0 flex-1">
				<IconComponent class={cn("size-4", config.iconClass)} />
				<span class="font-medium text-sm truncate">{title}</span>
			</div>
			<Badge variant={config.badge.variant} class="flex-shrink-0">{config.badge.text}</Badge>
		</div>

		<!-- Description -->
		<p class="text-xs text-muted-foreground line-clamp-2">
			{description}
		</p>

		<!-- File details -->
		<div class="space-y-1">
			{#if status === "completed" && uploadedFilename}
				<div class="text-xs">
					<span class="font-medium">File:</span>
					{uploadedFilename}
				</div>
				{#if wasRenamed}
					<div class="flex items-center gap-1 text-xs">
						<Badge variant="secondary" class="text-xs px-1 py-0 h-4">
							Renamed
						</Badge>
						<span class="text-muted-foreground">from original file</span>
					</div>
				{/if}
				{#if fileSize}
					<div class="text-xs text-muted-foreground">
						<span class="font-medium">Size:</span>
						{fileSize}
					</div>
				{/if}
				{#if uploadedAt}
					<div class="text-xs text-muted-foreground">
						<span class="font-medium">Uploaded:</span>
						{uploadedAt}
					</div>
				{/if}
			{:else}
				<div class="text-xs text-muted-foreground">
					<span class="font-medium">Expected:</span>
					{defaultFilename}
				</div>
			{/if}
		</div>

		<!-- Actions -->
		<div class="flex gap-2 mt-2">
			{#if status === "waiting" || status === "error"}
				<Button
					size="sm"
					variant="outline"
					class="flex-1 text-xs"
					onclick={onUpload}
				>
					<UploadIcon class="size-3 mr-1" />
					Upload
				</Button>
			{:else if status === "completed"}
				<Button
					size="sm"
					variant="outline"
					class="flex-1 text-xs"
					onclick={onUpload}
				>
					<UploadIcon class="size-3 mr-1" />
					Replace
				</Button>
			{/if}
		</div>
	</div>
{/if}
