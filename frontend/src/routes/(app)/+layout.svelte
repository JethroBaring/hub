<script lang="ts">
	import { Landing, Profile, Sidebar } from '$lib/components';
	import { sideBarLinks } from '$lib/utils/Sidebar';
	export let data: any;
</script>

{#if data.user}
	<div class="h-screen flex p-3 gap-3 bg-grid">
		<div class="w-[80px] rounded-2xl flex flex-col gap-2 resize-x">
			<Sidebar links={sideBarLinks} />
			<Profile />
		</div>
			<div class="flex-1">
				<slot />
			</div>
	</div>
{:else}
	<Landing />
{/if}
