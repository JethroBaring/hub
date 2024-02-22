<script lang="ts">
	export let data
</script>

<div class="flex-1 flex h-full gap-3">
	<div class="bg-slate-100 rounded-2xl w-64 p-5">
		<h1 class="text-2xl font-bold flex justify-between items-center">{data.world.name}</h1>
			{#each data.channels as channel}
				<a href={`/guilds/${data.world.id}/${channel.id}`}><h1>{channel.name}</h1></a>
			{/each}
	</div>
	<div class="bg-slate-100 rounded-2xl flex-1 flex flex-col">
		<slot />
	</div>
</div>
