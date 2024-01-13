import { createSlice } from '@reduxjs/toolkit'

export const insertionSlice = createSlice({
  name: 'insertion',
  initialState: {
    value: [],
  },
  reducers: {
    insertionCompare: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { insertionCompare } = insertionSlice.actions

export default insertionSlice.reducer