import { createSlice } from "@reduxjs/toolkit";

const slibarSlice = createSlice({
  name: "slibar",
  initialState: {
    open: false,
  },
  reducers: {
    openSlibar: (state) => {
      state.open = true;
    },
    closeSlibar: (state) => {
      state.open = false;
    },
  },
});

export const { openSlibar, closeSlibar } = slibarSlice.actions;
export default slibarSlice.reducer;
