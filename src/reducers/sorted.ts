import { createSlice } from "@reduxjs/toolkit";

export const sortedSlice = createSlice({
  name: "sorted",
  initialState: {
    value: [],
  },
  reducers: {
    sorted: (state, action) => {
      state.value = state.value.concat(action.payload)
    },
  },
});

export const { sorted } = sortedSlice.actions;

export default sortedSlice.reducer;
