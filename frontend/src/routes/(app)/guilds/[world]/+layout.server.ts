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
			const requests = await fetch(`http://localhost:3000/guild/requests/${params.world}`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${cookies.get('Access')}`
				}
			});

			const r = await requests.json();
			if (requests.ok) {
				return {
					id: params.world,
					channels: data,
					access: cookies.get('Access'),
					world: w,
					requests: r
				};
			}
		}
	}
};
