import { arrayUpdate } from "../reducers/array";
import { quickSortCompare, updatePivot } from "../reducers/quickSort";
import { sorted } from "../reducers/sorted";
import { swap } from "../reducers/swap";

export const quickSort = (heights, dispatch) => {
  const array = heights.slice(0);
  const toDispatch = [];
  quickSortHelper(array, 0, array.length - 1, toDispatch);
  handleDispatch(toDispatch, dispatch, array);
};

const quickSortHelper = (array, startIdx, endIdx, toDispatch) => {
  if (startIdx >= endIdx) {
    toDispatch.push([true, startIdx]);
    return;
  }

  const pivotIdx = startIdx;
  
  let leftIdx = startIdx + 1;
  let rightIdx = endIdx;
  
  // Dispatch pivot.
  toDispatch.push(pivotIdx)
  // Compare left idx and right idx
  toDispatch.push([leftIdx, rightIdx])

  while (leftIdx <= rightIdx) {
    if (array[leftIdx] > array[pivotIdx] && array[rightIdx] < array[pivotIdx]) {
        // Swap
      toDispatch.push([leftIdx, rightIdx, true])
      let temp = array[leftIdx];
      array[leftIdx] = array[rightIdx];
      array[rightIdx] = temp;
      // New array
      toDispatch.push(array.slice(0))
      // Clear Swap
      toDispatch.push([])
    }
    if (array[leftIdx] <= array[pivotIdx]) {
      leftIdx++;
      // Compare new left idx and right idx
    }
    if (array[rightIdx] >= array[pivotIdx]) {
      rightIdx--;
      // Compare left idx and new right idx
    }
    if (rightIdx >= leftIdx) toDispatch.push([leftIdx, rightIdx]);
  }

  // Swap and clear Pivot
  toDispatch.push([pivotIdx, rightIdx, true])
  let temp = array[pivotIdx];
  array[pivotIdx] = array[rightIdx];
  array[rightIdx] = temp;


  // New array
  toDispatch.push(array.slice(0))
  // Clear Swap
  toDispatch.push([])

  // Sorted
  toDispatch.push([true, rightIdx])

  // // How does this work?
  const isLeftSubarraySmaller = rightIdx - 1 - startIdx < endIdx - (rightIdx + 1);

  if (isLeftSubarraySmaller){
      quickSortHelper(array, startIdx, rightIdx - 1, toDispatch)
      quickSortHelper(array, rightIdx + 1, endIdx, toDispatch)
  } else {
      quickSortHelper(array, rightIdx + 1, endIdx, toDispatch)
      quickSortHelper(array, startIdx, rightIdx - 1, toDispatch)
  }
};

const handleDispatch = (toDispatch, dispatch, array) => {
    for (let i = 0; i < toDispatch.length; i++){
        let dispatchFunction = !(toDispatch[i] instanceof Array) ?
        updatePivot : toDispatch[i].length > 3 ?
        arrayUpdate : toDispatch[i].length !== 2 ?
        swap : toDispatch[i].length === 2 && typeof toDispatch[i][0] === "boolean" ?
        sorted : quickSortCompare;
        setTimeout(() => {
            dispatch(dispatchFunction(toDispatch[i]));
          }, i * 1000);
          if (dispatchFunction === updatePivot) dispatch(quickSortCompare(toDispatch[i + 1]));
          if (i === toDispatch.length - 1){
            setTimeout(() => {
              dispatch(updatePivot(null));
              dispatch(sorted(array.map((el, idx) => idx)))
            }, i * 1000)
          }
    }
    
};
