import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, fetch, locals }) => {
	if (locals.user) {
		const response = await fetch(`http://localhost:3000/guilds/${locals.user.id}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${cookies.get('Access')}`
			}
		});

		if (response.ok) {
			return {
				guilds: await response.json()
			};
		}
	}
};   

export const actions = {
	join: async ({request, fetch, locals}) => {
		const formData = await request.formData()
		const response = await fetch('http://localhost:3000/guild/join/', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${locals.user.access}`
			},
			body: JSON.stringify({
				userId: locals.user.id,
				guildId: formData.get('guildId')
			})
		});

		if(response.ok) {
			throw redirect(302, '/')
		}
	},
	create: async ({ request, fetch, locals }) => {
		const formData = await request.formData();

		const response = await fetch('http://localhost:3000/guild/create/', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${locals.user.access}`
			},
			body: JSON.stringify({
				name: formData.get('guildName'),
				creator: locals.user.id
			})
		});

		if(response.ok) {
			throw redirect(302, '/')
		}
	}
};
