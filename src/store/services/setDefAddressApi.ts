import { api } from './api';

export const registrationApi = api.injectEndpoints({
  endpoints: (build) => ({
    setDefAddress: build.mutation({
      query: ({ customerId, addressId, action }) => ({
        url: `customers/${customerId}`,
        method: 'POST',
        body: {
          version: 1,
          actions: [
            {
              action,
              addressId,
            },
          ],
        },
      }),

      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
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

export const { useSetDefAddressMutation } = registrationApi;
