import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      isFetching: false,
      err: false,
    },
    user: {
      data: null,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.user.data = action.payload;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.err = action.payload;
    },
  },
});

export const { loginStart, loginSuccess, loginFailed } = authSlice.actions;

export default authSlice.reducer;
