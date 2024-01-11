import { createSlice } from '@reduxjs/toolkit'

export const bubbleSortSlice = createSlice({
  name: 'bubbleSort',
  initialState: {
    value: [],
  },
  reducers: {
    bubbleSortCompare: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { bubbleSortCompare } = bubbleSortSlice.actions

export default bubbleSortSlice.reducer