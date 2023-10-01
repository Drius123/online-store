import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { refreshToken } from './refreshToken';

export const BASE_URL = 'https://api.europe-west1.gcp.commercetools.com/jhfdkajs-fdjskfhkjsdf-hdsfsd/';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['products', 'categories', 'discounts'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      let token = localStorage.getItem('token');
      if (!token) {
        await refreshToken();
        token = localStorage.getItem('token');
      }
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: () => ({}),
});

// eslint-disable-next-line no-empty-pattern
export const {} = api;
