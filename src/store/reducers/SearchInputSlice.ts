import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SearchInputState = {
  query: string;
};

const initialState: SearchInputState = {
  query: '',
};

export const searchInputSlice = createSlice({
  name: 'searchInput',
  initialState,
  reducers: {
    inputValueCHanger: (state, action: PayloadAction<{ query: string }>) => {
      const serachState = state;
      serachState.query = action.payload.query;
    },
  },
});

export const { reducer: SearchInputReducer, actions: searchInputActions } = searchInputSlice;
