import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isErrorMain: false,
  errorDeleteBooking: false,
  errorUpdateBooking: false,
  errorBooking: false,
  errorComments: false,
  errorEditComments: false,
  errorUser: false,
  errorEditUser: false,

  successDeleteBooking: false,
  successUpdateBooking: false,
  successBooking: false,
  successComments: false,
  successEditComments: false,
  successUser: false,
  successEditUser: false,
};

export const errorSlice = createSlice({
  name: 'errorMain',
  initialState,
  reducers: {
    setErrorMain(state, action) {
      const stateErrorMain = state;
      stateErrorMain.isErrorMain = action.payload;
    },
    setErrorDeleteBooking(state, action) {
      const stateDeleteBooking = state;
      stateDeleteBooking.errorDeleteBooking = action.payload;
    },
    setErrorUpdateBooking(state, action) {
      const stateUpdateBooking = state;
      stateUpdateBooking.errorUpdateBooking = action.payload;
    },
    setErrorBooking(state, action) {
      const stateBooking = state;
      stateBooking.errorBooking = action.payload;
    },
    setErrorComments(state, action) {
      const stateComments = state;
      stateComments.errorComments = action.payload;
    },
    setErrorUser(state, action) {
      const stateUser = state;
      stateUser.errorUser = action.payload;
    },
    setErrorEditUser(state, action) {
      const stateEditUser = state;
      stateEditUser.errorEditUser = action.payload;
    },
    setErrorEditComments(state, action) {
      const stateEditComments = state;
      stateEditComments.errorEditComments = action.payload;
    },

    setSuccessDeleteBooking(state, action) {
      const stateDeleteBooking = state;
      stateDeleteBooking.successDeleteBooking = action.payload;
    },
    setSuccessUpdateBooking(state, action) {
      const stateUpdateBooking = state;
      stateUpdateBooking.successUpdateBooking = action.payload;
    },
    setSuccessBooking(state, action) {
      const stateBooking = state;
      stateBooking.successBooking = action.payload;
    },
    setSuccessComments(state, action) {
      const stateComments = state;
      stateComments.successComments = action.payload;
    },
    setSuccessUser(state, action) {
      const stateUser = state;
      stateUser.successUser = action.payload;
    },
    setSuccessEditUser(state, action) {
      const stateEditUser = state;
      stateEditUser.successEditUser = action.payload;
    },
    setSuccessEditComments(state, action) {
      const stateEditComments = state;
      stateEditComments.successEditComments = action.payload;
    },
  },
});

export const {
  setErrorMain,

  setErrorBooking,
  setErrorComments,
  setErrorDeleteBooking,
  setErrorEditUser,
  setErrorUpdateBooking,
  setErrorUser,
  setErrorEditComments,

  setSuccessBooking,
  setSuccessComments,
  setSuccessDeleteBooking,
  setSuccessEditUser,
  setSuccessUpdateBooking,
  setSuccessUser,
  setSuccessEditComments,
} = errorSlice.actions;
