import { setCookie } from '../../helpers/cookie-typescript-utils';

export const AUTH_URL =
  'https://auth.europe-west1.gcp.commercetools.com/oauth/jhfdkajs-fdjskfhkjsdf-hdsfsd/anonymous/token?grant_type=client_credentials';

export async function refreshToken() {
  const headers = new Headers();
  headers.set('Authorization', `Basic ${btoa(`iAJ7rLUBnk9EgCxsd-4xObYf:WDsgsiExXlIL5H2zSfGHSNlkeZ44xDKb`)}`);
  try {
    const response = await fetch(AUTH_URL, {
      method: 'POST',
      headers,
    });
    const data = await response.json();
    const token = data.access_token;
    localStorage.setItem('token', token);
    setCookie('mainToken', token);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
