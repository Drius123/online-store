import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import Cookies from 'js-cookie';
import { CartsResult } from '../../types/cartsResult';
import { Cart } from '../../types/cart';
import { ProductInCartAPI } from '../../types';
import { setBasket } from '../reducers/BasketSlice';

export const AUTH_URL = 'https://auth.europe-west1.gcp.commercetools.com/oauth/jhfdkajs-fdjskfhkjsdf-hdsfsd/customers/';
export const BASE_URL = 'https://api.europe-west1.gcp.commercetools.com/jhfdkajs-fdjskfhkjsdf-hdsfsd/';

export const basketApi = createApi({
  reducerPath: 'basketApi',
  tagTypes: ['cart'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: async (headers) => {
      const userToken = Cookies.get('authToken') ? Cookies.get('authToken') : Cookies.get('mainToken');
      if (userToken) {
        headers.set('Authorization', `Bearer ${userToken}`);
      } else throw new Error('У пользователя нет токена и это странно');
      return headers;
    },
  }),
  endpoints: (build) => ({
    getBasket: build.query({
      query: () => `/me/carts/`,
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        // dispatch,
        try {
          const result = await queryFulfilled;
          if (result) {
            const cart = {
              id_cart: result.data?.id_cart,
              version: result.data?.version,
            };
            Cookies.set('cart', JSON.stringify(cart));
            dispatch(setBasket(result.data));
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('error get basket', error);
        }
      },
      providesTags: () => ['cart'],
      transformResponse: (response: CartsResult) => {
        if (response.count === 0) return null;
        const carts: Cart[] = [];
        if (response && response.results) {
          // eslint-disable-next-line no-plusplus
          for (let i = 0; i < response.results.length; i++) {
            const result = response.results[i];
            const cart: Cart = {
              id_cart: result.id,
              version: result.version,
              customerId: result.customerId,
              anonymousId: result.anonymousId,
              totalPrice: result.totalPrice,
              lineItems: [],
            };
            // eslint-disable-next-line no-plusplus
            for (let j = 0; j < result.lineItems.length; j++) {
              const productInCart: ProductInCartAPI = {
                id_api: result.lineItems[j].productId,
                quantity: result.lineItems[j].quantity,
                lineItemId: result.lineItems[j].id,
              };
              cart.lineItems.push(productInCart);
            }
            carts.push(cart);
          }
        }
        return carts.length > 0 ? carts[0] : null;
      },
    }),
    addCart: build.mutation({
      query: (currency) => ({
        url: `me/carts`,
        method: 'POST',
        body: {
          currency,
        },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result) {
            const cart = {
              id_cart: result.data?.id,
              version: result.data?.version,
            };
            Cookies.set('cart', JSON.stringify(cart));
          }
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('error creating cart', error);
        }
      },
      invalidatesTags: () => ['cart'],
    }),
    deleteCart: build.mutation({
      query: ({ cartId, version }) => ({
        url: `me/carts/${cartId}?version=${version}`,
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          // eslint-disable-next-line no-console
          console.log('Delete cart', result);
          Cookies.remove('cart');
          dispatch(setBasket(''));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('error creating cart', error);
        }
      },
      invalidatesTags: () => ['cart'],
    }),
    addItem: build.mutation({
      query: ({ productId, cartId, version }) => ({
        url: `carts/${cartId}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'addLineItem',
              productId,
              variantId: 1,
              quantity: 1,
            },
          ],
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setBasket(result.data));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('error add item to cart', error);
        }
      },
      invalidatesTags: () => ['cart'],
    }),
    deleteItem: build.mutation({
      query: ({ lineItemId, cartId, version, quantity }) => ({
        url: `carts/${cartId}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'removeLineItem',
              lineItemId,
              quantity,
            },
          ],
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setBasket(result.data));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('error add item to cart', error);
        }
      },
      invalidatesTags: () => ['cart'],
    }),
    setQuantityItem: build.mutation({
      query: ({ lineItemId, cartId, version, quantity }) => ({
        url: `carts/${cartId}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'changeLineItemQuantity',
              lineItemId,
              quantity,
            },
          ],
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setBasket(result.data));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('error add item to cart', error);
        }
      },
      invalidatesTags: () => ['cart'],
    }),
    addPromo: build.mutation({
      query: ({ promoCode, cartId, version }) => ({
        url: `carts/${cartId}`,
        method: 'POST',
        body: {
          version,
          actions: [
            {
              action: 'addDiscountCode',
              code: promoCode,
            },
          ],
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setBasket(result.data));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error('error add promo to cart', error);
        }
      },
      invalidatesTags: () => ['cart'],
    }),
  }),
});

export const {
  useGetBasketQuery,
  useAddItemMutation,
  useAddCartMutation,
  useDeleteCartMutation,
  useDeleteItemMutation,
  useSetQuantityItemMutation,
  useAddPromoMutation,
} = basketApi;
