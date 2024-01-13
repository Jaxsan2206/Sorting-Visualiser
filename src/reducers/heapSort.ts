import { createSlice } from '@reduxjs/toolkit'

export const heapSortSlice = createSlice({
  name: 'heapSort',
  initialState: {
    value: [],
  },
  reducers: {
    heapSortCompare: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { heapSortCompare } = heapSortSlice.actions

export default heapSortSlice.reducer