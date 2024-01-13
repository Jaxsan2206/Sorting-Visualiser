import { createSlice } from '@reduxjs/toolkit'

export const runningSlice = createSlice({
  name: 'running',
  initialState: {
    value: false,
  },
  reducers: {
    runningUpdate: (state, action) => {
      state.value = action.payload;
    },
  },
})

export const { runningUpdate } = runningSlice.actions

export default runningSlice.reducer