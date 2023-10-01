import { api } from './api';
import { Customer } from '../../types';
import { setUser } from '../reducers/AuthUserSlice';

export const registrationApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: (customer: Customer) => ({
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

export const { useRegisterUserMutation } = registrationApi;
