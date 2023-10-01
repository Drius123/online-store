import { api } from './api';
import { setUser } from '../reducers/AuthUserSlice';

export const registrationApi = api.injectEndpoints({
  endpoints: (build) => ({
    setUserProfile: build.mutation({
      query: ({ customerId, version, actions }) => ({
        url: `customers/${customerId}`,
        method: 'POST',
        body: {
          version,
          actions,
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

export const { useSetUserProfileMutation } = registrationApi;
