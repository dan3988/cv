<script lang="ts">
	import type { Snippet } from "svelte";
	import Icon from "./Icon.svelte";

	interface Props {
		href: string;
		title?: string;
		icon?: string;
		target?: string;
		children?: Snippet<[]>;
	}

	const {
		href,
		title,
		icon,
		target,
		children,
	}: Props = $props();

	const printContent = $derived(removeProtocol(href));

	function removeProtocol(link: string) {
		let protocol: string;
		try {
			({ protocol } = new URL(link));
		} catch (_) {
			return link;
		}

		link = link.slice(protocol.length);

		while (link.startsWith('/'))
			link = link.slice(1);

		return link;
	}
</script>
<Icon {icon}>
	<a {href} {target} {title}>
		{#if children}
			<span class="d-none d-print-block">{printContent}</span>
			<span class="d-print-none">
				{@render children()}
			</span>
		{:else}
			{printContent}
		{/if}
	</a>
</Icon>
