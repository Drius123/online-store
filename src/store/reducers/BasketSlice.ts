import { createSlice } from '@reduxjs/toolkit';
import { Cart } from '../../types/cart';

const initialState = {
  cart: {} as Cart,
};

export const basketSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setBasket(state, action) {
      // return { ...action.payload };
      const storeToken = state;
      storeToken.cart = action.payload;
    },
  },
});

export const { setBasket } = basketSlice.actions;
