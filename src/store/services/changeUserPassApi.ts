import { api } from './api';
import { setUser } from '../reducers/AuthUserSlice';

export const registrationApi = api.injectEndpoints({
  endpoints: (build) => ({
    setUserPassword: build.mutation({
      query: ({ customerId, version, currentPassword, newPassword }) => ({
        url: `customers/password`,
        method: 'POST',
        body: {
          id: customerId,
          version,
          currentPassword,
          newPassword,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setUser(result.data));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('erro registration', error);
        }
      },
    }),
  }),
});

export const { useSetUserPasswordMutation } = registrationApi;
