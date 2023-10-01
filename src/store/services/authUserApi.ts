import Cookies from 'js-cookie';
import { api } from './api';
import { setUser } from '../reducers/AuthUserSlice';

export const AUTH_URL =
  'https://auth.europe-west1.gcp.commercetools.com/oauth/jhfdkajs-fdjskfhkjsdf-hdsfsd/customers/token?grant_type=password&';
// username=johndoe@example.com&password=secret123
export const authUserApi = api.injectEndpoints({
  endpoints: (build) => ({
    authenticationUser: build.mutation({
      query: ({ email, password }) => ({
        url: `login`,
        method: 'POST',
        body: {
          email,
          password,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const user = result.data.customer;
          dispatch(setUser(user));

          Cookies.set('user', JSON.stringify(user), { expires: 2 });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('erro authentication', error);
        }
      },
    }),
  }),
});

export const { useAuthenticationUserMutation } = authUserApi;
