import { useState } from "react";
import "./line.css";
import { bubbleSort, insertionSort, mergeSort, selectionSort } from "../../helpers/algorithms";

interface ILine {
  heights: number[];
}

const Line: React.FC<ILine> = ({ heights }) => {
  const [trackHeight, setTrackHeight] = useState(heights);
  const [activeLine, setActiveLine] = useState(-Infinity);

  const [algorithm, setAlgorithm] = useState('bubble_sort'); 

  const handleClick = () => {
    switch(algorithm) {
      case 'bubble_sort':
        bubbleSort(trackHeight, setTrackHeight, setActiveLine);
        break; 
      case 'selection_sort':
        selectionSort(trackHeight, setTrackHeight, setActiveLine);
        break; 
      case 'insertion_sort':
        insertionSort(trackHeight, setTrackHeight, setActiveLine);
        break; 
      case 'merge_sort':
        mergeSort(trackHeight, setTrackHeight, setActiveLine);
        break; 
    }
  };

  const handleChange = (e: any) => {
    setAlgorithm(e.target.value)
  };

  return (
    <div className="line-container">
      <select onChange={(e) => handleChange(e)}>
        <option value={'bubble_sort'}>Bubble Sort</option>
        <option value={'selection_sort'}>Selection Sort</option>
        <option value={'insertion_sort'}>Insertion Sort</option>
        <option value={'merge_sort'}>Merge Sort</option>
      </select>
      {heights.map((el, i) => (
        <div className={ activeLine === i ? "activeLine" : "line"} style={{ height: `${el}px` }}></div>
      ))}
      <button onClick={handleClick}>Sort</button>
    </div>
  );
};

export default Line;
