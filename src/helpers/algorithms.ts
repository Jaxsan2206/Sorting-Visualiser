export const bubbleSort = async (
  arr: number[],
  callback: (nums: number[]) => void,
  setActiveLine: (num: number) => void
) => {
  const length = arr.length;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = temp;
        // React's state comparison algorithm does not detect direct mutations to the state variable and assumes the same reference is being used. Hence why a new array is created.
        callback([...arr]);
        setActiveLine(j + 1);
        //  This stop the execution of the for loop to create a 10 millisecond delay
        await new Promise((resolve) => setTimeout(resolve, 1));
      }
    }
  }
  setActiveLine(-Infinity);
  return arr;
};

export const selectionSort = async (
  arr: number[],
  callback: (nums: number[]) => void,
  setActiveLine: (num: number) => void
) => {
  let length = arr.length;
  for (let i = 0; i < length; i++) {
    let min = i;
    let temp = arr[i];
    for (let j = i + 1; j < length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
        setActiveLine(j);
      }
    }
    arr[i] = arr[min];
    arr[min] = temp;
    callback([...arr]);
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  setActiveLine(-Infinity);
  return arr;
};

export const insertionSort = async (
  array: number[],
  callback: (nums: number[]) => void,
  setActiveLine: (num: number) => void
) => {
  // https://www.doabledanny.com/insertion-sort-in-javascript
  for (let i = 1; i < array.length; i++) {
    let currentValue = array[i]
    let j
    for (j = i - 1; j >= 0 && array[j] > currentValue; j--) {
      array[j + 1] = array[j]
    }
    array[j + 1] = currentValue
    callback([...array])
    setActiveLine(i)
    setActiveLine(j)
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  return array
};

export const mergeSort: any = async (
  array: number[],
  callback: (nums: number[]) => void,
  setActiveLine: (num: number) => void
) => { 
  // Base case 
  if (array.length <= 1) return array 
  let mid = Math.floor(array.length / 2) 
  // Recursive calls 
  let left = await mergeSort(array.slice(0, mid), callback, setActiveLine) 
  console.log(left)
  let right = await mergeSort(array.slice(mid), callback, setActiveLine) 

  return merge(left, right) 
} 

const merge = (left: number[], right: number[]) => { 
  let sortedArr = [] // the sorted items will go here 
  while (left.length && right.length) { 
    // Insert the smallest item into sortedArr 
    if (left[0] < right[0]) { 
      sortedArr.push(left.shift()) 
    } else { 
      sortedArr.push(right.shift()) 
    } 
  } 
  // Use spread operators to create a new array, combining the three arrays 
  return [...sortedArr, ...left, ...right] 
}


function swap(items, leftIndex, rightIndex){
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
}
function partition(items, left, right) {
  var pivot   = items[Math.floor((right + left) / 2)], //middle element
      i       = left, //left pointer
      j       = right; //right pointer
  while (i <= j) {
      while (items[i] < pivot) {
          i++;
      }
      while (items[j] > pivot) {
          j--;
      }
      if (i <= j) {
          swap(items, i, j); //sawpping two elements
          i++;
          j--;
      }
  }
  return i;
}

function quickSort(items, left, right) {
  var index;
  if (items.length > 1) {
      index = partition(items, left, right); //index returned from partition
      if (left < index - 1) { //more elements on the left side of the pivot
          quickSort(items, left, index - 1);
      }
      if (index < right) { //more elements on the right side of the pivot
          quickSort(items, index, right);
      }
  }
  return items;
}