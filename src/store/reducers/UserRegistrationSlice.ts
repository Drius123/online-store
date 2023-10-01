import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
};

export const userRegistrationSlice = createSlice({
  name: 'userRegistration',
  initialState,
  reducers: {
    setUserRegistration(state, action) {
      return { ...state, ...action.payload };
    },
  },
});

export const { setUserRegistration } = userRegistrationSlice.actions;
