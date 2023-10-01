import { createSlice } from '@reduxjs/toolkit';
import { FullCustomer } from '../../types/customer';

const initialState = {
  user: {} as FullCustomer,
};

export const authUserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      // return { ...action.payload };
      const userState = state;
      userState.user = action.payload;
    },
  },
});

export const { setUser } = authUserSlice.actions;
