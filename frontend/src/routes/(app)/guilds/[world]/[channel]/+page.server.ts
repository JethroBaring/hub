import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params, locals }) => {
	const response = await fetch(
		`http://localhost:3000/messages/${params.world}/${params.channel}/`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		}
	);
	const access = cookies.get('Access');
	const data = await response.json();
	if (response.ok) {
		const permission = await fetch(
			`http://localhost:3000/channel/permission/${locals.user.id}/${params.channel}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ${cookies.get('Access')}`
				}
			}
		);

		const perm = await permission.json();
		if (permission.ok) {
			return {
				messages: data,
				access,
				guildId: params.world,
				id: params.channel,
				permission: perm
			};
		}
	}
};
