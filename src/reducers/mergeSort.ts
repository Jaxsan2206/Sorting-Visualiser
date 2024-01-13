import { createSlice } from '@reduxjs/toolkit'

export const mergeSortSlice = createSlice({
  name: 'mergeSort',
  initialState: {
    value: [],
  },
  reducers: {
    mergeSortX: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { mergeSortX } = mergeSortSlice.actions

export default mergeSortSlice.reducer