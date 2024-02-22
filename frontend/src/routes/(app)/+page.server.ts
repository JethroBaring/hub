import type { PageServerLoad } from './$types';
import jwt from 'jsonwebtoken';

export const load: PageServerLoad = async ({ cookies, fetch, locals }) => {
	if (locals.user) {
		const decoded = (await jwt.verify(cookies.get('Access') as string, 'jetnah')) as {
			id?: string;
		};
		const response = await fetch(`http://localhost:3000/guilds/${decoded.id}`, {
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
