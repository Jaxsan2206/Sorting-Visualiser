import { createSlice } from '@reduxjs/toolkit'

export const selectionSlice = createSlice({
  name: 'selection',
  initialState: {
    value: [],
  },
  reducers: {
    selectionCompare: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { selectionCompare } = selectionSlice.actions

export default selectionSlice.reducer