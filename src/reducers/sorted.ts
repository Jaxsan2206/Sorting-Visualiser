import { createSlice } from "@reduxjs/toolkit";

export const sortedSlice = createSlice({
  name: "sorted",
  initialState: {
    value: [],
  },
  reducers: {
    sorted: (state, action) => {
      if (action.payload.length){
        state.value = state.value.concat(action.payload);
      } else {
        state.value = [];
      }
    },
  },
});

export const { sorted } = sortedSlice.actions;

export default sortedSlice.reducer;
