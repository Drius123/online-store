import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  customers: [],
};

export const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setProducts(state, action) {
      const customersState = state;
      customersState.customers = action.payload;
    },
  },
});

export const { setProducts } = customersSlice.actions;
