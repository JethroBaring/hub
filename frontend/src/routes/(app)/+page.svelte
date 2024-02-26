<script lang="ts">
	export let data: any;
	let search: string = '';
	import { browser } from '$app/environment';
	let joinModal: HTMLDialogElement;
	let createModal: HTMLDialogElement;
</script>

<div class="w-full bg-slate-100 rounded-2xl p-5 flex flex-col gap-5 h-full">
	<div class="flex justify-between items-center">
		<h1 class="text-2xl font-bold">Guilds</h1>
		<label class="input input-bordered w-1/2 flex items-center gap-2">
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
		<div class="flex gap-5">
			<button class="btn btn-primary w-20" on:click={() => joinModal.showModal()}>Join</button>
			<button class="btn btn-primary w-20" on:click={() => createModal.showModal()}>Create</button>
		</div>
	</div>
	<div class="grid grid-cols-5 gap-5">
		{#each data.guilds.results.filter((guild) => guild.guild.name
				.toLowerCase()
				.includes(search.toLowerCase())) as guild}
			<a href={`/guilds/${guild.guild.id}/1`}>
				<div class="bg-slate-200 rounded-2xl h-48">{guild.guild.name}</div>
			</a>
		{/each}
	</div>
</div>
<dialog id="joinModal" class="modal" bind:this={joinModal}>
	<form class="modal-box flex flex-col gap-5 w-72" action="?/join" method="POST">
		<h3 class="font-bold text-lg text-center">Enter Guild ID</h3>
		<input type="number" class="input input-bordered" name="guildId"/>
		<button class="btn btn-primary">Join</button>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>

<dialog id="createModal" class="modal" bind:this={createModal}>
	<form class="modal-box flex flex-col gap-5 w-72" action="?/create" method="POST">
		<h3 class="font-bold text-lg text-center">Enter Guild Name</h3>
		<input type="text" class="input input-bordered" name="guildName" />
		<button class="btn btn-primary">Create</button>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
