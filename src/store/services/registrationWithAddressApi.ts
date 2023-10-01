import { api } from './api';
import { CustomerWithAddress } from '../../types';
import { setUser } from '../reducers/AuthUserSlice';

export const registrationApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUserWithAddress: build.mutation({
      query: (customer: CustomerWithAddress) => ({
        url: `customers`,
        method: 'POST',
        body: customer,
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data.customer));
          // eslint-disable-next-line no-console
          console.log('api', result);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('erro registration', error);
        }
      },
    }),
  }),
});

export const { useRegisterUserWithAddressMutation } = registrationApi;
