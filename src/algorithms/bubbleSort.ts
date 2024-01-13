import { arrayUpdate } from "../reducers/array";
import { bubbleSortCompare } from "../reducers/bubbleSort";
import { runningUpdate } from "../reducers/running";
import { sorted } from "../reducers/sorted";
import { swap } from "../reducers/swap";

export const bubbleSort = (
    heights: number[],
    dispatch: () => any,
    speed: number
  ): any => {
    //  need to recreate array to edit it, stateArray is read-only
    const array = heights.slice(0)
    let isSorted = false; 
    let counter = 0; 
    const toDispatch = []
    while(!isSorted){
      isSorted = true;
      for (let i = 0; i < array.length - counter - 1; i++){
        //  Comparison push
        toDispatch.push([i, i+1]);
        if (array[i] > array[i + 1]){
          let temp = array[i + 1];
          array[i + 1] = array[i];
          array[i] = temp;
          isSorted = false
          //  Swap push
          toDispatch.push([i, i+1, true]);
          /*  
          Rearranged Array Push - slice(0) takes a snapshot of the array at that point in time
          cos the array variable has final order
          */
          toDispatch.push(array.slice(0))
          //  Clear Swap push
          toDispatch.push([]);
        }
      }
      counter++
      //  Store
      toDispatch.push([true, array.length - counter])
    }
    handleDispatch(toDispatch, dispatch, array, speed)
};

const handleDispatch = (toDispatch, dispatch, array, speed) => {
/* 
Send a dispatch containing the 2 indexes we are comparing to reducer
in the visualiser, when mapping heights, we check if the index matches the index in the bubbleSortCompare
otherwise we colour it green
*/
  for(let i = 0; i < toDispatch.length; i++){
    if (toDispatch[i].length === 2 && typeof toDispatch[i][0] !== 'boolean'){
      setTimeout(() => {
        dispatch(bubbleSortCompare(toDispatch[i]))
      }, i * speed)
    } else if (toDispatch[i].length > 3){
      setTimeout(() => {
        // Changing the array forces a re-render
        dispatch(arrayUpdate(toDispatch[i]))
      }, i * speed)
    } else if (toDispatch[i].length === 3 || toDispatch[i].length === 0 ){
      setTimeout(() => {
        dispatch(swap(toDispatch[i]))
      }, i * speed)
    } else if (toDispatch[i][0] === true){
      setTimeout(() => {
        dispatch(bubbleSortCompare([]))
        dispatch(sorted(toDispatch[i]))
      }, i * speed)
    }
    if (i === toDispatch.length - 1){
      setTimeout(() => {
        dispatch(sorted(array.map((el, idx) => idx)))
        dispatch(runningUpdate(false));
      }, i * speed)
    }
  }
}