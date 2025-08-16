<script lang="ts">
	import { Badge } from "../../../lib/components/ui/badge/index.js";
	import { Button } from "../../../lib/components/ui/button/index.js";
	import { cn } from "../../../lib/utils.js";
	import { getScriptCardStatus, scriptStatusConfig } from "../../../lib/utils/status.js";
	import PlayIcon from "@lucide/svelte/icons/play";

	interface Props {
		/** Unique identifier for the script */
		id: string;
		/** Display name for the script */
		title: string;
		/** Description of what this script does */
		description: string;
		/** Script filename */
		filename: string;
		/** Current execution status */
		status: "ready" | "running" | "completed" | "error";
		/** Execution time (if completed) */
		executionTime?: string;
		/** Last run date (if completed) */
		lastRun?: string;
		/** Whether script is selected for preview */
		isSelected?: boolean;
		/** Click handler for run action */
		onRun?: () => void;
		/** Click handler for preview action */
		onPreview?: () => void;
	}

	let {
		id,
		title,
		description,
		filename,
		status = "ready",
		executionTime,
		lastRun,
		isSelected = false,
		onRun,
		onPreview,
		...restProps
	}: Props = $props();


	// Calculate effective status based on prerequisites and execution status
	const effectiveStatus = $derived(getScriptCardStatus(id, status));
	
	// Make config reactive using $derived
	const config = $derived(scriptStatusConfig[effectiveStatus]);
	const IconComponent = $derived(config.icon);
</script>

{#if onPreview}
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

		<!-- Script details -->
		<div class="space-y-1">
			<div class="text-xs">
				<span class="font-medium">Script:</span>
				{filename}
			</div>
			{#if status === "completed" && executionTime}
				<div class="text-xs text-muted-foreground">
					<span class="font-medium">Runtime:</span>
					{executionTime}
				</div>
			{/if}
			{#if status === "completed" && lastRun}
				<div class="text-xs text-muted-foreground">
					<span class="font-medium">Last run:</span>
					{lastRun}
				</div>
			{/if}
		</div>

		<!-- Actions -->
		<div class="flex gap-2 mt-2">
			<Button
				size="sm"
				variant="outline"
				class="flex-1 text-xs h-7"
				onclick={(e) => { e.stopPropagation(); onRun?.(); }}
				disabled={effectiveStatus === "running" || effectiveStatus === "waiting"}
			>
				<PlayIcon class="size-3 mr-1" />
				{effectiveStatus === "running" ? "Running..." : effectiveStatus === "waiting" ? "Waiting..." : "Run"}
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

		<!-- Script details -->
		<div class="space-y-1">
			<div class="text-xs">
				<span class="font-medium">Script:</span>
				{filename}
			</div>
			{#if status === "completed" && executionTime}
				<div class="text-xs text-muted-foreground">
					<span class="font-medium">Runtime:</span>
					{executionTime}
				</div>
			{/if}
			{#if status === "completed" && lastRun}
				<div class="text-xs text-muted-foreground">
					<span class="font-medium">Last run:</span>
					{lastRun}
				</div>
			{/if}
		</div>

		<!-- Actions -->
		<div class="flex gap-2 mt-2">
			<Button
				size="sm"
				variant="outline"
				class="flex-1 text-xs h-7"
				onclick={onRun}
				disabled={effectiveStatus === "running" || effectiveStatus === "waiting"}
			>
				<PlayIcon class="size-3 mr-1" />
				{effectiveStatus === "running" ? "Running..." : effectiveStatus === "waiting" ? "Waiting..." : "Run"}
			</Button>
		</div>
	</div>
{/if}