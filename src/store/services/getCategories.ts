import { refreshToken } from './refreshToken';

export const BASE_URL = 'https://api.europe-west1.gcp.commercetools.com/jhfdkajs-fdjskfhkjsdf-hdsfsd/categories';

export async function getCategories() {
  const headers = new Headers();
  let token = localStorage.getItem('token');
  if (!token) {
    await refreshToken();
    token = localStorage.getItem('token');
  }
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  try {
    const response = await fetch(BASE_URL, {
      method: 'GET',
      headers,
    });
    const data = await response.json();
    return data.results;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return {};
  }
}
