import { createSlice } from "@reduxjs/toolkit";

const navSlice = createSlice({
  name: "nav",
  initialState: {
    id: null,
  },
  reducers: {
    idNavOpen: (state, action) => {
      state.id = action.payload;
    },
    closeNav: (state) => {
      state.id = null;
    },
  },
});

export const { idNavOpen, closeNav } = navSlice.actions;
export default navSlice.reducer;
