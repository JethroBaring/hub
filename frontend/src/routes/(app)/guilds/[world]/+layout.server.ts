import type { LayoutServerLoad } from './$types';
export const load: LayoutServerLoad = async ({ params, cookies, fetch }) => {
	const response = await fetch(`http://localhost:3000/channels/${params.world}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});

	const data = await response.json();

	const world = await fetch(`http://localhost:3000/guild/${params.world}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});
	if (response.ok) {
		const w = await world.json();
		if (world.ok) {
			return {
				id: params.world,
				channels: data,
				access: cookies.get('Access'),
				world: w
			};
		}
	}
};
