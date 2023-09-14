import { createSlice } from "@reduxjs/toolkit";

const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    data: [],
  },
  reducers: {
    getDataCategories: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getDataCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
