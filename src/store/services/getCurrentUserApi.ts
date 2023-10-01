import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';
import { setUser } from '../reducers/AuthUserSlice';

export const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com/oauth/jhfdkajs-fdjskfhkjsdf-hdsfsd/customers/';
export const BASE_URL = 'https://api.europe-west1.gcp.commercetools.com/jhfdkajs-fdjskfhkjsdf-hdsfsd/';
export const currentUserApi = createApi({
  reducerPath: 'currentUserApi',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const userToken = Cookies.get('authToken');
      headers.set('Authorization', `Bearer ${userToken}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getUser: build.query({
      query: () => `me`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const user = result.data;
          dispatch(setUser(user));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('erro authentication', error);
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = currentUserApi;
