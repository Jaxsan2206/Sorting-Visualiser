export const getBubbleSortAnimations = (
    heights: number[],
  ): any => {
    let isSorted = false; 
    let counter = 0; 
    const animations = []
    while(!isSorted){
      isSorted = true;
      for (let i = 0; i < heights.length - counter - 1; i++){
        animations.push({
          firstIdx: i,
          secondIdx: i + 1,
          firstValue: heights[i],
          secondValue: heights[i+1],
          type:'compare'
        })
        if (heights[i] > heights[i + 1]){
          animations.push({
            firstIdx: i,
            secondIdx: i + 1,
            firstValue: heights[i],
            secondValue: heights[i + 1],
            type: "swap",
          });
          let temp = heights[i + 1];
          heights[i + 1] = heights[i];
          heights[i] = temp;
          isSorted = false
        }
      }
      animations.push({
        idx: heights.length - counter - 1,
        type: "finished",
      });
      counter++
    }
    return animations;
  };