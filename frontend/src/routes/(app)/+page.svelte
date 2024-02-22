<script lang="ts">
	const guilds = ['Alliance', 'Fury'];
	export let data: any;
	let search: string = '';
</script>

<div class="w-full bg-slate-100 rounded-2xl p-5 flex flex-col gap-5 h-full">
	<div class="flex justify-between items-center">
		<h1 class="text-2xl font-bold">Guilds</h1>
		<label class="input input-bordered flex items-center gap-2">
			<input type="text" class="grow" placeholder="Search" bind:value={search} />
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 16 16"
				fill="currentColor"
				class="w-4 h-4 opacity-70"
				><path
					fill-rule="evenodd"
					d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
					clip-rule="evenodd"
				/></svg
			>
		</label>
	</div>
	<div class="grid grid-cols-5 gap-5">
		{#each data.guilds.results.filter((guild) => guild.guild.name.includes(search)) as guild}
			<a href={`/guilds/${guild.guild.id}/1`}>
				<div class="bg-slate-200 rounded-2xl h-48">{guild.guild.name}</div>
			</a>
		{/each}
	</div>
</div>
