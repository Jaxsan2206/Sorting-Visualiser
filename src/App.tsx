import "./App.css";
import { getBubbleSortAnimations } from "./algorithms/getBubbleSortAnimations";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { selectionSort } from "./algorithms/selectionSort";
import Line from "./components/Line/Line";
import { useEffect, useState } from "react";
// 0 1 2 3 4 5 6 7


// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 1;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'green';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'orange';

function App() {

  const [algorithm, setAlgorithm] = useState("bubble_sort");
  const [heights, setHeights] = useState<number[]>([]);
  console.log('heights' + ' length', heights.length)

  useEffect(() => {
    setHeights(generateRandomNumberArray(5, 200, 300))
  }, [])
  
  const handleClick = () => {
    switch (algorithm) {
      case "bubble_sort":
        const animations = getBubbleSortAnimations(heights);
        const lines = document.getElementsByClassName('line') as HTMLCollectionOf<HTMLElement>
        
        for(let i = 0; i < animations.length ; i++){
          if (animations[i].type === "compare") {
            const barOneStyle = lines[animations[i].firstIdx].style;
            const barTwoStyle = lines[animations[i].secondIdx].style;

            setTimeout(() => {
              barOneStyle.backgroundColor = "black";
              barTwoStyle.backgroundColor = "black";
            }, i * ANIMATION_SPEED_MS);

            // Reset the color of the bars back to green after a delay
            setTimeout(() => {
              barOneStyle.backgroundColor = "green"; 
              barTwoStyle.backgroundColor = "green"; 
            }, (i + 1) * ANIMATION_SPEED_MS); 

          } else if (animations[i].type === 'swap') {
            const barOneStyle = lines[animations[i].firstIdx].style;
            const barTwoStyle = lines[animations[i].secondIdx].style;

            setTimeout(() => {
              barOneStyle.height = `${animations[i].secondValue}px`;
              barOneStyle.backgroundColor = `red`;
              barTwoStyle.height = `${animations[i].firstValue}px`;
              barTwoStyle.backgroundColor = `red`;
            }, i * ANIMATION_SPEED_MS)

            setTimeout(() => {
              barOneStyle.backgroundColor = `green`;
              barTwoStyle.backgroundColor = `green`;
            },  (i + 1) * ANIMATION_SPEED_MS)
          } else if (animations[i].type === 'finished') {
            const barOneStyle = lines[animations[i].idx].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = 'purple';
            }, i * ANIMATION_SPEED_MS)
          }
        }
        setTimeout(() => {
          const allLines = document.getElementsByClassName('line') as HTMLCollectionOf<HTMLElement>;
        
          for (let i = 0; i < allLines.length; i++) {
            const lineStyle = allLines[i].style;
            lineStyle.backgroundColor = 'blue';
          }
        }, animations.length + 1000 * ANIMATION_SPEED_MS);

    }
  };

  const handleChange = (e: any) => {
    setAlgorithm(e.target.value);
  };

  return (
    <div className="App">
      <select onChange={(e) => handleChange(e)}>
        <option value={"bubble_sort"}>Bubble Sort</option>
        <option value={"selection_sort"}>Selection Sort</option>
        <option value={"insertion_sort"}>Insertion Sort</option>
        <option value={"merge_sort"}>Merge Sort</option>
      </select>

      <div className="line-container">
        {heights.map((height, i) => (
          <Line height={height} key={i}/>
        ))}
      </div>

      <button onClick={handleClick}>Sort</button>
      <button onClick={() => setHeights(generateRandomNumberArray(100, 200, 300))}>Reset</button>
    </div>
  );
}


export const generateRandomNumberArray = (nums: number, min: number, max: number) => {
  const numbers = []; 
  for (let i = 0; i < nums; i++){
     numbers.push(Math.round(Math.random() * (max - min) + min)); 
  }
  return numbers; 
}

export default App;
