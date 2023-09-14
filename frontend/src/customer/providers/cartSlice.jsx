import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    visible: false,
  },
  reducers: {
    openCart: (state) => {
      state.visible = true;
    },
    closeCart: (state) => {
      state.visible = false;
    },
  },
});

export const { openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
