export const mergeSort: any = async (
    array: number[],
    callback: (nums: number[]) => void,
    // setActiveLine: (num: number) => void
  ) => { 
    // Base case 
    if (array.length <= 1) return array 
    let mid = Math.floor(array.length / 2) 
    // Recursive calls 
    let left = await mergeSort(array.slice(0, mid), callback) 
    console.log(left)
    let right = await mergeSort(array.slice(mid), callback) 
  
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
  