export const selectionSort =  (
    arr: number[],
    callback: (nums: number[]) => void,
    // setActiveLine: (num: number) => void
  ): any => {
    let length = arr.length;
    for (let i = 0; i < length; i++) {
      let min = i;
      let temp = arr[i];
      for (let j = i + 1; j < length; j++) {
        if (arr[j] < arr[min]) {
          min = j;
          // setActiveLine(j);
        }
      }
      arr[i] = arr[min];
      arr[min] = temp;
      callback([...arr]);
      // await new Promise((resolve) => setTimeout(resolve, 100));
    }
    // setActiveLine(-Infinity);
    return arr;
  };