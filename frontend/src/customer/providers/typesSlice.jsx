import { createSlice } from "@reduxjs/toolkit";

const typesSlice = createSlice({
  name: "types",
  initialState: {
    data: [],
  },
  reducers: {
    getDataTypes: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getDataTypes } = typesSlice.actions;
export default typesSlice.reducer;
