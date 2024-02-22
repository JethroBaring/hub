import { dev } from '$app/environment';

export const POST = async (event) => {
	const { body, method, headers } = event.request;
  console.log(body, method, headers)
	const response = await fetch('http://localhost:3000/login/', {
		method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      email: 'admin@gmail.com',
      password: 'admin123'
    })
	});

	const data = await response.json();
	if (response.ok) {
		event.cookies.set('Refresh', data.refresh, {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24,
			secure: dev
		});

		return response;
	} else {
    console.log("Error in api")
  }
  // event.locals.user = {
  //   id: 5,
  //   email: 'test@gmail.com'
  // }

  // console.log(event.locals.user)
  // return new Response(JSON.stringify({"Refresh": 'test'}))
};

export const GET = async ({ locals, cookies }) => {
	if (!locals.user) return new Response(JSON.stringify({message: 'error'}));
  return new Response(JSON.stringify({"Refresh": cookies.get('Refresh')}))
};
