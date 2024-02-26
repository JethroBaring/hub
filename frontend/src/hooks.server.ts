import { dev } from '$app/environment';
import { redirect, type Handle } from '@sveltejs/kit';
// import { JWT_SECRET_KEY } from '@env/static/private';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	let access = event.cookies.get('Access');
	if (!access) {
		try {
			const refresh = event.cookies.get('Refresh');
			if (!refresh) {
				throw redirect(302, '/login');
			}

			const response = await fetch('http://127.0.0.1:3000/refresh/', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${refresh}`,
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					refresh: refresh
				})
			});

			if (response.ok) {
				const data = await response.json();
				event.cookies.set('Access', data.access, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: 60 * 60,
					secure: dev
				});
				access = data.access;
			} else {
				console.error('Request failed:', response.status, response.statusText);
			}
		} catch (error) {
			console.log('inside refresh');
			console.log(error);
		}
	}
	if (access) {
		try {
			const decoded = jwt.verify(access, 'jetnah') as { id?: string };
			const response = await fetch(`http://localhost:3000/user/${decoded?.id}/`, {
				method: 'GET',
				headers: {
					Authorization: `Bearer ${event.cookies.get('Access')}`
				}
			});
			if (response.ok) {
				const data = await response.json();
				event.locals.user = {
					id: data?.id,
					email: data?.email,
					access: access
				};
			} else {
				console.error('Request failed:', response.status, response.statusText);
			}
		} catch (err) {
			console.log('access token expired');
			console.log(err);
		}
	}
	return await resolve(event);
};
