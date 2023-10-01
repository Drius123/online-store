import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  page: 1,
};

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPageNumber(state, action) {
      const pageState = state;
      pageState.page = action.payload;
    },
  },
});

export const { setPageNumber } = pageSlice.actions;
