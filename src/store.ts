import { configureStore } from '@reduxjs/toolkit'
import arrayReducer from './reducers/array';
import algorithmReducer  from './reducers/algorithm';
import bubbleSortReducer  from './reducers/bubbleSort';
import swapReducer  from './reducers/swap';
import sortedReducer  from './reducers/sorted';
import insertionReducer  from './reducers/insertion';
import selectionReducer  from './reducers/selection';
import quickSortReducer  from './reducers/quickSort';

export default configureStore({
  reducer: {
    array: arrayReducer,
    algorithm: algorithmReducer,
    bubbleSort: bubbleSortReducer,
    swap: swapReducer,
    sorted: sortedReducer,
    insertion: insertionReducer,
    selection: selectionReducer,
    quickSort: quickSortReducer
  },
})