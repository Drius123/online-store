import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  discounts: [],
};

export const discountsSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setDiscounts(state, action) {
      const discountsState = state;
      discountsState.discounts = action.payload;
    },
  },
});

export const { setDiscounts } = discountsSlice.actions;
