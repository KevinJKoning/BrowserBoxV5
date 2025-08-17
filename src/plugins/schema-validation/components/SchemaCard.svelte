<script lang="ts">
	import { Badge } from "../../../lib/components/ui/badge/index.js";
	import { Button } from "../../../lib/components/ui/button/index.js";
	import { cn } from "../../../lib/utils/generic.ts";
	import { getSchemaCardStatus, schemaStatusConfig } from "../../../lib/utils/status.js";
	import { checkSchemaDependencies } from "../../../lib/utils/dependencies.js";
	import CheckCircleIcon from "@lucide/svelte/icons/check-circle";
	import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";
	import XCircleIcon from "@lucide/svelte/icons/x-circle";
	import AlertTriangleIcon from "@lucide/svelte/icons/alert-triangle";
	// Use dynamic plugin stores instead of static config exports so that
	// runtime-loaded configuration packages update the dependency display.
	import { activeFileRequirements } from "../../required-files/store.svelte";
	import { availableSchemas } from "../store.svelte";

	interface Props {
		/** Unique identifier for the schema validation */
		id: string;
		/** Display name for the schema validation */
		title: string;
		/** Description of what this schema validates */
		description: string;
		/** Schema validation filename (only for Python validations) */
		filename?: string;
		/** Current validation status */
		status: "ready" | "running" | "completed" | "error";
		/** Execution time (if completed) */
		executionTime?: string;
		/** Last run date (if completed) */
		lastRun?: string;
		/** Validation results summary (from JavaScript validation) */
		validationSummary?: {
			totalRows: number;
			totalColumns: number;
			validRows: number;
			errorCount: number;
			warningCount: number;
		};
		/** Whether schema is selected for preview */
		isSelected?: boolean;
		/** Click handler for validate action */
		onValidate?: () => void;
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
		validationSummary,
		isSelected = false,
		onValidate,
		onPreview,
		...restProps
	}: Props = $props();

	// Use shared config but override completed status based on validation results
	const statusConfig = $derived.by(() => {
		const baseConfig = { ...schemaStatusConfig };
		
		// Override completed status based on validation results
		if (effectiveStatus === "completed" && validationSummary) {
			const hasErrors = validationSummary.errorCount > 0;
			const hasWarnings = validationSummary.warningCount > 0;
			const status = hasErrors ? "fail" : hasWarnings ? "warning" : "pass";
			
			baseConfig.completed = {
				badge: { variant: "default" as const, text: "Completed" },
				icon: status === "pass" ? CheckCircleIcon : 
					  status === "warning" ? AlertTriangleIcon : XCircleIcon,
				iconClass: status === "pass" ? "text-green-500" :
						   status === "warning" ? "text-yellow-500" : "text-red-500",
				cardClass: status === "pass" ? "border-green-200 bg-green-50/50" :
						   status === "warning" ? "border-yellow-200 bg-yellow-50/50" : "border-red-200 bg-red-50/50",
			};
		}
		
		return baseConfig;
	});

	// Check dependencies and calculate effective status
	const dependencyStatus = $derived(checkSchemaDependencies(id));
	const effectiveStatus = $derived(getSchemaCardStatus(id, status, dependencyStatus.allMet));
	
	// Make config reactive using $derived
	const config = $derived(statusConfig[effectiveStatus]);
	const IconComponent = $derived(config.icon);

	// Find the target file for this schema validation
	const targetFile = $derived.by(() => {
		const schemaValidation = availableSchemas.find(s => s.id === id);
		if (!schemaValidation?.targetFileId) return filename;
		const fileReq = activeFileRequirements.find(req => req.id === schemaValidation.targetFileId);
		return fileReq?.defaultFilename || filename;
	});
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

		<!-- Schema validation details -->
		<div class="space-y-1">
			<div class="text-xs">
				<span class="font-medium">Target File:</span>
				{targetFile}
			</div>
			{#if status === "completed" && validationSummary}
				<div class="text-xs">
					<span class="font-medium">Results:</span>
					<span class={validationSummary.overall_status === "pass" ? "text-green-600" :
								validationSummary.overall_status === "warning" ? "text-yellow-600" : "text-red-600"}>
						{validationSummary.passed}/{validationSummary.total_checks} checks passed
					</span>
					{#if validationSummary.failed > 0}
						<span class="text-red-600">• {validationSummary.failed} failed</span>
					{/if}
					{#if validationSummary.warnings > 0}
						<span class="text-yellow-600">• {validationSummary.warnings} warnings</span>
					{/if}
				</div>
			{/if}
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
				onclick={(e) => { e.stopPropagation(); onValidate?.(); }}
				disabled={effectiveStatus === "running" || effectiveStatus === "waiting"}
			>
				<ShieldCheckIcon class="size-3 mr-1" />
				{effectiveStatus === "running" ? "Validating..." : effectiveStatus === "waiting" ? "Waiting..." : "Validate"}
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

		<!-- Schema validation details -->
		<div class="space-y-1">
			<div class="text-xs">
				<span class="font-medium">Target File:</span>
				{targetFile}
			</div>
			{#if status === "completed" && validationSummary}
				<div class="text-xs">
					<span class="font-medium">Results:</span>
					<span class={validationSummary.overall_status === "pass" ? "text-green-600" :
								validationSummary.overall_status === "warning" ? "text-yellow-600" : "text-red-600"}>
						{validationSummary.passed}/{validationSummary.total_checks} checks passed
					</span>
					{#if validationSummary.failed > 0}
						<span class="text-red-600">• {validationSummary.failed} failed</span>
					{/if}
					{#if validationSummary.warnings > 0}
						<span class="text-yellow-600">• {validationSummary.warnings} warnings</span>
					{/if}
				</div>
			{/if}
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
				onclick={onValidate}
				disabled={effectiveStatus === "running" || effectiveStatus === "waiting"}
			>
				<ShieldCheckIcon class="size-3 mr-1" />
				{effectiveStatus === "running" ? "Validating..." : effectiveStatus === "waiting" ? "Waiting..." : "Validate"}
			</Button>
		</div>
	</div>
{/if}