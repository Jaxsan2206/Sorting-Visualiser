import { arrayUpdate } from "../reducers/array";
import { insertionCompare } from "../reducers/insertion";
import { runningUpdate } from "../reducers/running";
import { sorted } from "../reducers/sorted";
import { swap } from "../reducers/swap";

export const insertionSort =  (
    heights: number[],
    dispatch: () => void,
    speed
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
    handleDispatch(toDispatch, dispatch, array, speed)
};


const handleDispatch = (toDispatch, dispatch, array, speed) => {
  for(let i=0; i < toDispatch.length; i++){
    if (toDispatch[i].length === 2 && typeof toDispatch[i][0] !== 'boolean'){
      setTimeout(() => {
        dispatch(insertionCompare(toDispatch[i]))
      }, i * speed)
    } else if (toDispatch[i].length > 3){
      setTimeout(() => {
        dispatch(arrayUpdate(toDispatch[i]))
      }, i * speed)
    } else if (toDispatch[i].length === 3 || toDispatch[i].length === 0 ){
      setTimeout(() => {
        dispatch(swap(toDispatch[i]))
        // dispatch(insertionCompare([]))
      }, i * speed)
    } 
    if (i === toDispatch.length - 1){
      setTimeout(() => {
        dispatch(insertionCompare([]))
        dispatch(sorted(array.map((el, idx) => idx)))
        dispatch(runningUpdate(false))
      }, i * speed)
    }
  }
}