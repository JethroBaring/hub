<script lang="ts">
	import Icon from './Icon.svelte';

	export let links: any;
</script>

<div class="flex-1 bg-slate-100 rounded-2xl p-2 flex flex-col gap-5">
	<div class="flex-1 overflow-scroll">
		<div class="flex flex-col h-0 gap-2">
			{#each links as link}
				<a href={link.url}>
					<div class="bg-neutral-50 p-5 rounded-2xl h-16">
						<Icon data1={link.data1} data2={link.data2} />
					</div>
				</a>
			{/each}
		</div>
	</div>
</div>
