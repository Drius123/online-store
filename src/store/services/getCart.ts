import Cookies from 'js-cookie';

export const BASE_URL = 'https://api.europe-west1.gcp.commercetools.com/jhfdkajs-fdjskfhkjsdf-hdsfsd/';
export const AUTH_URL =
  'https://auth.europe-west1.gcp.commercetools.com/oauth/jhfdkajs-fdjskfhkjsdf-hdsfsd/anonymous/token?grant_type=client_credentials';
export async function getCart() {
  const headers = new Headers();
  let data;
  let userToken = Cookies.get('authToken') ? Cookies.get('authToken') : undefined;
  if (userToken) {
    headers.set('Authorization', `Bearer ${userToken}`);
    try {
      const response = await fetch(`${BASE_URL}me/carts/`, {
        method: 'GET',
        headers,
      });
      data = await response.json();
    } catch (errorCart) {
      // eslint-disable-next-line no-console
      console.log(errorCart);
      if (errorCart instanceof Error && errorCart && 'status' in errorCart && errorCart?.status === 401) {
        userToken = undefined;
      }
    }
  } else {
    headers.set('Authorization', `Basic ${btoa(`iAJ7rLUBnk9EgCxsd-4xObYf:WDsgsiExXlIL5H2zSfGHSNlkeZ44xDKb`)}`);
    try {
      const response = await fetch(AUTH_URL, {
        method: 'POST',
        headers,
      });
      data = await response.json();
      const anonToken = data.access_token;
      console.log(anonToken);
    } catch (errorAnonym) {
      // eslint-disable-next-line no-console
      console.log(errorAnonym);
    }
  }
  return data.results;
}
