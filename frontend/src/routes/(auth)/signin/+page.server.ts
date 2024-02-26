import { fail, redirect } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types.js';
import { dev } from '$app/environment';
import { zod } from 'sveltekit-superforms/adapters';
import { z } from 'zod';

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(loginSchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ fetch, cookies, request }) => {
		const form = await superValidate(request, zod(loginSchema));
		console.log(form)
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		const response = await fetch('http://localhost:3000/login/', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: JSON.stringify({
				email: form.data.email,
				password: form.data.password
			})
		});
		const data = await response.json();
		console.log(data);
		if (response.ok) {
			cookies.set('Refresh', data.refresh, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24,
				secure: dev
			});
			
			cookies.set('Access', data.refresh, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60,
				secure: dev
			});

			throw redirect(302, '/');
		}
		return message(form, {text: data.message})
	}
};
