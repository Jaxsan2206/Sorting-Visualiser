export const insertionSort =  (
    array: number[],
    callback: (nums: number[]) => void,
    // setActiveLine: (num: number) => void
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
      // setActiveLine(i)
      // setActiveLine(j)
      // await new Promise(resolve => setTimeout(resolve, 100))
    }
    return array
  };