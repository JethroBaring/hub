<script lang="ts">
	import { page } from '$app/stores';
	export let data;
	let requests = data.requests;
	$: requests;
	let requestModal: HTMLDialogElement;

	const handleAccept = async (userId: number, guildId: number) => {
		const response = await fetch('http://localhost:3000/guild/accept', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${$page.data.user.access}`
			},
			body: JSON.stringify({
				userId,
				guildId
			})
		});

		if(response.ok) {
			requests = requests.filter((req) => req.userId !== userId && req.guildId !== guildId)
		}
	};
</script>

<div class="flex-1 flex h-full gap-3">
	<div class="bg-slate-100 rounded-2xl w-64 p-5">
		<h1 class="text-2xl font-bold flex justify-between items-center">{data.world.name}</h1>
		{#if data.world.creatorId === $page.data.user.id}
			<h1 class="cursor-pointer" on:click={() => requestModal.showModal()}>Request</h1>
		{/if}
		{#each data.channels as channel}
			<a href={`/guilds/${data.world.id}/${channel.id}`}><h1>{channel.name}</h1></a>
		{/each}
	</div>
	<div class="bg-slate-100 rounded-2xl flex-1 flex flex-col">
		<slot />
	</div>
</div>

<dialog id="createModal" class="modal" bind:this={requestModal}>
	<form class="modal-box flex flex-col gap-5 w-72 h-1/2">
		<h3 class="font-bold text-lg text-center">Guild Requests</h3>
		<ul>
			{#each requests as request}
				<li class="flex gap-5">
					<p>{request.user.email}</p>
					<button on:click={() => handleAccept(request.userId, request.guildId)}>Accept</button>
				</li>
			{/each}
		</ul>
	</form>
	<form method="dialog" class="modal-backdrop">
		<button>close</button>
	</form>
</dialog>
