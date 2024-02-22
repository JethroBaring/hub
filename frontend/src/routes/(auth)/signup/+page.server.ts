import { z } from 'zod';
import type { PageServerLoad } from '../signin/$types';
import { message, setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

const signupSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
	repeatPassword: z.string().min(8)
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod(signupSchema));
	return {
		form
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(signupSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}
		if (form.data.password !== form.data.repeatPassword) {
			return setError(form, 'repeatPassword', "Password doesn't match");
		}
		const body = JSON.stringify(form.data);
		const response = await fetch('http://localhost:3000/signup', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body
		});

    if(response.ok) {
      return message(form, {'text': 'Account has been created.'})
    }

		return {
			form
		};
	}
};
