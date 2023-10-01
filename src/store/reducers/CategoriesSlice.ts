import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
};

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories(state, action) {
      const categoriesState = state;
      categoriesState.categories = action.payload;
    },
  },
});

export const { setCategories } = categoriesSlice.actions;
