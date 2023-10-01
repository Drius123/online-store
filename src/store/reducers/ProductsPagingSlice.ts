import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productsPaging: [],
};

export const productsPagingSlice = createSlice({
  name: 'productsPaging',
  initialState,
  reducers: {
    setProductsPaging(state, action) {
      const productPagingState = state;
      productPagingState.productsPaging = action.payload;
    },
  },
});

export const { setProductsPaging } = productsPagingSlice.actions;
