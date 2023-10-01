import { api } from './api';
import { setErrorMain } from '../reducers/ErrorSlice';
import { setDiscounts } from '../reducers/DiscountsSlice';

export const discountsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDiscounts: build.query({
      query: () => `product-discounts`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          const { data } = result;
          dispatch(setDiscounts(data.results));
        } catch (e) {
          /* if (e.error.status == '401') {
            await refreshToken();
          } */
          dispatch(setErrorMain(true));
          // eslint-disable-next-line no-console
          console.error('error discounts', e);
        }
      },
      providesTags: () => ['discounts'],
    }),
  }),
});

export const { useGetDiscountsQuery } = discountsApi;
