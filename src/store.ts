import { configureStore } from '@reduxjs/toolkit'
import arrayReducer from './reducers/array';
import algorithmReducer  from './reducers/algorithm';
import bubbleSortReducer  from './reducers/bubbleSort';
import swapReducer  from './reducers/swap';
import sortedReducer  from './reducers/sorted';

export default configureStore({
  reducer: {
    array: arrayReducer,
    algorithm: algorithmReducer,
    bubbleSort: bubbleSortReducer,
    swap: swapReducer,
    sorted: sortedReducer
  },
})