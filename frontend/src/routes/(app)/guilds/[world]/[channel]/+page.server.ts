import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies, params }) => {
	const response = await fetch(`http://localhost:3000/messages/${params.channel}`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${cookies.get('Access')}`
		}
	});
	const access = cookies.get('Access');
	const data = await response.json()
	console.log(data)
  if(response.ok) {
    return {
			messages: data,
			access,
			id: params.channel
		}
  }
};