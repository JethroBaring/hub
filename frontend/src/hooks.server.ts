import { type Handle } from '@sveltejs/kit';
// import { JWT_SECRET_KEY } from '@env/static/private';
import jwt from 'jsonwebtoken';

export const handle: Handle = async ({ event, resolve }) => {
	let access = event.cookies.get('Access');
	if (!access) {
		try {
			const refresh = event.cookies.get('Refresh');
			if (!refresh) {
				return await resolve(event);
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
				event.cookies.set('Access', data?.access, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					maxAge: 5 * 60
				});
				access = event.cookies.get('Access');
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
			// console.log(decoded?.id)
			const response = await fetch(
				`http://localhost:3000/user/${decoded?.id}/`,
				{
					method: 'GET',
					headers: {
						Authorization: `Bearer ${event.cookies.get('Access')}`,
					}
				}
			);
			if (response.ok) {
				const data = await response.json();
				event.locals.user = {
					id: Number.parseInt(decoded.id!),
					email: data?.email
				};
				console.log('access token not expired');
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
