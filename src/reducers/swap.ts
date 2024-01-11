import { createSlice } from "@reduxjs/toolkit";

export const swapSlice = createSlice({
  name: "swap",
  initialState: {
    value: [],
  },
  reducers: {
    swap: (state, action) => {
      if (action.payload.length) {
        state.value = action.payload;
      } else {
        state.value = [];
      }
    },
  },
});

export const { swap } = swapSlice.actions;

export default swapSlice.reducer;