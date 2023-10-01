import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: {},
};

export const userTokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    setUserToken(state, action) {
      // return { ...action.payload };
      const storeToken = state;
      storeToken.token = action.payload;
    },
  },
});

export const { setUserToken } = userTokenSlice.actions;
