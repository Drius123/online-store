import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: {},
};

export const currentUserSlice = createSlice({
  name: 'current',
  initialState,
  reducers: {
    setUserToken(state, action) {
      // return { ...action.payload };
      const storeToken = state;
      storeToken.current = action.payload;
    },
  },
});

export const { setUserToken } = currentUserSlice.actions;
