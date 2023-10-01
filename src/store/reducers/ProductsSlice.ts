import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      const productState = state;
      productState.products = action.payload;
    },
  },
});

export const { setProducts } = productsSlice.actions;
