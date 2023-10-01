import { api } from './api';
import { setErrorMain } from '../reducers/ErrorSlice';
import { setCategories } from '../reducers/CategoriesSlice';

export const categoriesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query({
      query: () => `categories`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { data } = result;
          dispatch(setCategories(data.results));
        } catch (e) {
          /* if (e.error.status == '401') {
            await refreshToken();
          } */
          dispatch(setErrorMain(true));
          // eslint-disable-next-line no-console
          console.error('error categories', e);
        }
      },
      providesTags: () => ['categories'],
    }),
  }),
});

export const { useGetCategoriesQuery } = categoriesApi;
