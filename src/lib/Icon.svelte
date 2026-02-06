<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		icon?: string;
		children?: Snippet<[]>;
	}

	const {
		icon,
		children,
	}: Props = $props();
</script>
<span class="flex-row gap-2">
	{#if icon}
		<i class="bi bi-{icon}"></i>
	{/if}
	{@render children?.()}
</span>