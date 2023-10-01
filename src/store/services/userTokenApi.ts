import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';
import { setUserToken } from '../reducers/UserTokenSlice';

export const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com/oauth/jhfdkajs-fdjskfhkjsdf-hdsfsd/customers/';
export const userTokenApi = createApi({
  reducerPath: 'userTokenApi',
  baseQuery: fetchBaseQuery({
    baseUrl: AUTH_URL,
    prepareHeaders: async (headers) => {
      headers.set('Authorization', `Basic ${btoa(`iAJ7rLUBnk9EgCxsd-4xObYf:WDsgsiExXlIL5H2zSfGHSNlkeZ44xDKb`)}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUserToken: build.mutation({
      query: ({ email, password }) => ({
        url: `token?grant_type=password&username=${email}&password=${password}`,
        method: 'POST',
        body: {},
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const token = result.data;
          // eslint-disable-next-line no-console
          console.log(token);
          dispatch(setUserToken(token));

          Cookies.set('authToken', token.access_token, { expires: 2 });
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('erro authentication', error);
        }
      },
    }),
  }),
});

export const { useGetUserTokenMutation } = userTokenApi;
