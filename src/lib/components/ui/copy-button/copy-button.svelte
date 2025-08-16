<script lang="ts">
	import { Button } from "../button/index.js";
	import CopyIcon from "@lucide/svelte/icons/copy";
	import CheckIcon from "@lucide/svelte/icons/check";
	import { copyToClipboard } from "../../../utils/formatting.ts";

	interface Props {
		/** Content to copy to clipboard */
		content: string;
		/** Button variant */
		variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
		/** Button size */
		size?: "default" | "sm" | "lg" | "icon";
		/** Additional CSS classes */
		class?: string;
		/** Feedback duration in milliseconds */
		feedbackDuration?: number;
		/** Disabled state */
		disabled?: boolean;
	}

	let {
		content,
		variant = "ghost",
		size = "sm",
		class: className = "",
		feedbackDuration = 2000,
		disabled = false,
		...restProps
	}: Props = $props();

	// Copy feedback state
	let copySuccess = $state(false);

	// Handle copy with visual feedback
	async function handleCopyClick() {
		if (disabled || !content) return;
		
		await copyToClipboard(content);
		
		// Show success feedback
		copySuccess = true;
		
		// Hide feedback after specified duration
		setTimeout(() => {
			copySuccess = false;
		}, feedbackDuration);
	}
</script>

<Button 
	{variant}
	{size}
	onclick={handleCopyClick}
	{disabled}
	class="transition-colors {copySuccess ? 'text-green-600' : ''} {className}"
	{...restProps}
>
	{#if copySuccess}
		<CheckIcon class="size-4" />
	{:else}
		<CopyIcon class="size-4" />
	{/if}
</Button>