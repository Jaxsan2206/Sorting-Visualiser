import { arrayUpdate } from "../reducers/array";
import { selectionCompare } from "../reducers/selection";
import { sorted } from "../reducers/sorted";
import { swap } from "../reducers/swap";

export const selectionSort =  (
    heights: number[],
    dispatch: () => void,
  ): any => {
   const array = heights.slice(0);
   let currentIdx = 0; 
   const toDispatch = [];
   while (currentIdx < array.length - 1){
    let smallestIdx = currentIdx; 
    for (let i = currentIdx + 1; i < array.length; i++){
      //  Comparison happens here
      toDispatch.push([currentIdx, i])
      if (array[smallestIdx] > array[i]){
        smallestIdx = i;
      }
    }
    // Swap happens here
    toDispatch.push([smallestIdx, currentIdx, true])
    let temp = array[smallestIdx];
    array[smallestIdx] = array[currentIdx];
    array[currentIdx] = temp;
    // New array
    toDispatch.push(array.slice(0))
    // Clear Swap
    // toDispatch.push([])

    // Sorted happens here
    toDispatch.push([true, currentIdx])
    currentIdx++;
   }

   handleDispatch(toDispatch, dispatch, array)
};

const handleDispatch = (toDispatch, dispatch, array) => {
  for(let i=0; i < toDispatch.length; i++){
    if (toDispatch[i].length === 2 && typeof toDispatch[i][0] !== 'boolean'){
      console.log('compare')
      setTimeout(() => {
        dispatch(selectionCompare(toDispatch[i]))
      }, i * 1000)
    } 
    else if (toDispatch[i].length > 3){
      console.log('new array')
      setTimeout(() => {
        dispatch(arrayUpdate(toDispatch[i]))
      }, i * 1000)
    } 
    else if ((toDispatch[i].length === 3 && !hasDuplicates(toDispatch[i].slice(0)))){
      console.log('swap')
      setTimeout(() => {
        dispatch(selectionCompare([]))
        dispatch(swap(toDispatch[i]))
      }, i * 1000)
    } else if (toDispatch[i][0] === true){
      console.log('sorted')
      setTimeout(() => {
        dispatch(selectionCompare([]))
        dispatch(swap([]))
        dispatch(sorted(toDispatch[i][1]))
      }, i * 1000)
    }





    if (i === toDispatch.length - 1){
      setTimeout(() => {
        dispatch(sorted(array.map((el, idx) => idx)))
      }, i * 1000)
    }
  }
}

function hasDuplicates(array) {
  return (new Set(array)).size !== array.length;
}