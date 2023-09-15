import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
  },
  reducers: {
    reducerProducts: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { reducerProducts } = productsSlice.actions;
export default productsSlice.reducer;
