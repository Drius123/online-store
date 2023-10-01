import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ViewState = {
  isShowMenuBurger: boolean;
};

const initialState: ViewState = {
  isShowMenuBurger: false,
};

export const viewSlice = createSlice({
  name: 'view',
  initialState,
  reducers: {
    viewMenuBurger: (state, action: PayloadAction<{ isShow: boolean }>) => {
      const showState = state;
      showState.isShowMenuBurger = action.payload.isShow;
    },
  },
});

export const { reducer: isShowReducer, actions: isShowActions } = viewSlice;
