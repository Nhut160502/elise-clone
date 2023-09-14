import { createSlice } from "@reduxjs/toolkit";

const stateApiSlice = createSlice({
  name: "stateApi",
  initialState: {
    isFetching: false,
    err: false,
    message: [],
  },
  reducers: {
    apiCallStart: (state) => {
      state.isFetching = true;
    },
    apiCallSuccess: (state) => {
      state.isFetching = false;
    },
    apiCallFailed: (state) => {
      state.err = true;
      state.isFetching = false;
    },
    apiCallStored: (state, action) => {
      state.isFetching = false;
      state.message = action.payload;
    },
  },
});

export const { apiCallStart, apiCallSuccess, apiCallFailed, apiCallStored } =
  stateApiSlice.actions;
export default stateApiSlice.reducer;
