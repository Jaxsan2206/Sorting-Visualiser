import { arrayUpdate } from "../reducers/array";
import { insertionCompare } from "../reducers/insertion";
import { sorted } from "../reducers/sorted";
import { swap } from "../reducers/swap";

export const insertionSort =  (
    heights: number[],
    dispatch: () => void,
  ) => {
    const array = heights.slice(0);
    const toDispatch = [];

    for(let i = 0; i < array.length; i++){
      let j = i; 
      // Comparison happens here
      while (j > 0 && array[j] < array[j-1]){
        toDispatch.push([j, j-1])
        // Swap happens
        toDispatch.push([j, j-1, true]);
        let temp = array[j];
        array[j] = array[j-1];
        array[j-1] = temp;
        //  New array
        toDispatch.push(array.slice(0))
        //  Clear swap
        toDispatch.push([]);
        j--; 
      }
    }
    handleDispatch(toDispatch, dispatch, array)
};


const handleDispatch = (toDispatch, dispatch, array) => {
  for(let i=0; i < toDispatch.length; i++){
    if (toDispatch[i].length === 2 && typeof toDispatch[i][0] !== 'boolean'){
      setTimeout(() => {
        dispatch(insertionCompare(toDispatch[i]))
      }, i * 1000)
    } else if (toDispatch[i].length > 3){
      setTimeout(() => {
        dispatch(arrayUpdate(toDispatch[i]))
      }, i * 1000)
    } else if (toDispatch[i].length === 3 || toDispatch[i].length === 0 ){
      setTimeout(() => {
        dispatch(swap(toDispatch[i]))
        // dispatch(insertionCompare([]))
      }, i * 1000)
    } 
    if (i === toDispatch.length - 1){
      setTimeout(() => {
        dispatch(sorted(array.map((el, idx) => idx)))
      }, i * 1000)
    }
  }
}