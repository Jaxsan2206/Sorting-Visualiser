import { createSlice } from '@reduxjs/toolkit'

export const algorithmSlice = createSlice({
  name: 'algorithm',
  initialState: {
    value: 'bubble_sort',
  },
  reducers: {
    algorithmUpdate: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { algorithmUpdate } = algorithmSlice.actions

export default algorithmSlice.reducer