import { createSlice } from '@reduxjs/toolkit'

export const quickSortSlice = createSlice({
  name: 'quickSort',
  initialState: {
    value: [],
    pivot: null
  },
  reducers: {
    quickSortCompare: (state, action) => {
      state.value = action.payload;
    },
    updatePivot: (state, action) => {
        state.pivot = action.payload
    }
  },
})

export const { quickSortCompare, updatePivot } = quickSortSlice.actions

export default quickSortSlice.reducer