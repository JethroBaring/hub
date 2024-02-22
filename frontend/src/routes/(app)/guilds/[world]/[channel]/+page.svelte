<script lang="ts">
	import { page } from '$app/stores';
	import { Socket, io } from 'socket.io-client';
	import { browser } from '$app/environment';
	import { tick, onMount } from 'svelte';
	export let data: any;
	
	let messages:any = data.messages;

	$:messages = data.messages
	let message: string;
	let bottomRef: HTMLDivElement;
	let socket: Socket = io('http://localhost:3000').on('message', (m) => {
		console.log(m);
		messages.push(m);
		messages = messages;
		console.log('i got new message');
		console.log(m);
		// scrollToBottom();
	});
	socket.emit('joinRoom', data.id);
	const sendMessage = () => {
		socket.emit('message', {
			userId: $page.data.user.id,
			content: message,
			worldId: Number.parseInt(data.id),
			token: data.access,
			room: data.id
		});
		message = '';
	};

	const onEnter = (e: any) => {
		switch (e.keyCode) {
			case 13:
				sendMessage();
				break;
		}
	};

	// const scrollToBottom = async () => {
	// 	if (browser) {
	// 		await tick();
	// 		bottomRef.scrollIntoView({ behavior: 'smooth', block: 'end' });
	// 	}
	// };
  const switchChannel =async (channelId: number) => {
    const response = await fetch(`http://localhost:3000/messages/${channelId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${data.access}`
			}
		});
		const x = await response.json();
		if(response.ok) {
      messages = x
    }
  }
	onMount(async () => {
		console.log(data.messages)
	});
</script>

<h1 class="text-2xl font-bold flex justify-between items-center p-5">Messages</h1>
<div class="flex-1 overflow-scroll p-5">
	<div class="h-0">
		{#each messages as message}
			{#if message.user.id === $page.data.user.id}
				<div class="chat chat-end">
					<div class="chat-image avatar">
						<div class="w-10 rounded-full">
							<img
								alt="Tailwind CSS chat bubble component"
								src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
							/>
						</div>
					</div>
					<div class="chat-header">
						You
						<time class="text-xs opacity-50">12:46</time>
					</div>
					<div class="chat-bubble">{message.content}</div>
				</div>
			{:else}
				<div class="chat chat-start">
					<div class="chat-image avatar">
						<div class="w-10 rounded-full">
							<img
								alt="Tailwind CSS chat bubble component"
								src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
							/>
						</div>
					</div>
					<div class="chat-header">
						{message.user.email}
						<time class="text-xs opacity-50">12:45</time>
					</div>
					<div class="chat-bubble">
						{message.content}
					</div>
				</div>
			{/if}
		{/each}
		<div bind:this={bottomRef}></div>
	</div>
</div>
<div class="flex gap-3 items-center pt-5 pl-5 pr-5 pb-5">
	<input type="text" class="input w-full" bind:value={message} />
	<button on:click={() => sendMessage()}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="w-6 h-6"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
			/>
		</svg>
	</button>
</div>
