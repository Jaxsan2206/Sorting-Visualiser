import "./App.css";
import { useEffect, useState } from "react";
import { generateRandomNumberArray } from "./helpers/generateNumberArray";
import Visualiser from "./components/Visualiser/Visualiser";
import { connect } from "react-redux";
import { arrayUpdate } from "./reducers/array";
import { algorithmUpdate } from "./reducers/algorithm";
import { bubbleSort } from "./algorithms/bubbleSort";
import { insertionSort } from "./algorithms/insertionSort";
import { selectionSort } from "./algorithms/selectionSort";
import { quickSort } from "./algorithms/quickSort";
import mergeSort from "./algorithms/mergeSort";
import heapSort from "./algorithms/heapSort";
import { sorted } from "./reducers/sorted";
import { useWindowSize } from "@uidotdev/usehooks";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form } from "react-bootstrap";
import { runningUpdate } from "./reducers/running";



function App({ array, algorithm, createArray, updateAlgorithm, sort, isRunning }) {
  const size = useWindowSize();
  const [speed, setSpeed] = useState(100)
  const [arrayLength, setArrayLength] = useState(30)

  let maximumArrayLength; 
 
  if (size.width < 576) {
    maximumArrayLength = 30
  } else if (size.width < 768) {
    maximumArrayLength = 50
  } else if (size.width <= 992) {
    maximumArrayLength = 80
  } else {
    maximumArrayLength = 100
  }

  useEffect(() => {
    createArray(arrayLength);
  }, [arrayLength]);

  const isSortButtonDisabled = !algorithm || isRunning;
  const isResetButtonDisabled = isRunning;
  const isDropdownDisabled = isRunning;
  const isSliderDisabled = isRunning;
  return (
    <div className="App">
      <nav>
        <div className="algorithm_picker_container">
          <Form.Select onChange={(e) => updateAlgorithm(e.target.value)} disabled={isDropdownDisabled}>
            <option value={''}>Pick an Algorithm</option>
            <option value={"bubble_sort"}>Bubble Sort</option>
            <option value={"selection_sort"}>Selection Sort</option>
            <option value={"insertion_sort"}>Insertion Sort</option>
            <option value={"quick_sort"}>Quick Sort</option>
            <option value={"heap_sort"}>Heap Sort</option>
            <option value={"merge_sort"}>Merge Sort</option>
          </Form.Select>
        </div>
        <div className="controls_container">
          <p>Controls</p>
          <div className="slidecontainer">
            <label htmlFor={"mySpeedRange"}>Speed</label>
            <input
              onChange={(e: any) => setSpeed(e.target.value)}
              type="range"
              min="10"
              max="1000"
              value={speed}
              className="slider"
              id="mySpeedRange"
              disabled={isSliderDisabled}
            />
            <span>{speed + " ms"}</span>
          </div>
          <div className="slidecontainer">
            <label htmlFor={"myArrayRange"}>Array Length</label>
            <input
              onChange={(e: any) => setArrayLength(e.target.value)}
              type="range"
              min="5"
              max={maximumArrayLength}
              className="slider"
              value={arrayLength}
              id="myArrayRange"
              disabled={isSliderDisabled}
            />
          </div>
        </div>
        <div className="button_container">
          <Button
            variant="secondary"
            onClick={() => sort(algorithm, array, speed)}
            disabled={isSortButtonDisabled}
          >
            Sort
          </Button>
          <Button disabled={isResetButtonDisabled} variant="danger" onClick={() => createArray(arrayLength)}>
            Reset
          </Button>
        </div>
      </nav>
      <Visualiser />
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return ({
  array: state.array.value,
  algorithm: state.algorithm.value,
  isRunning: state.running.value
})};

const mapDispatchToProps = (dispatch) => ({
  createArray: (length) => {
    const array = generateRandomNumberArray(length);
    dispatch(sorted([]));
    dispatch(arrayUpdate(array));
  },
  updateAlgorithm: (algorithm) => {
    dispatch(sorted([]));
    dispatch(algorithmUpdate(algorithm))
  },
  sort: (algorithm, array, speed) => {
    dispatch(runningUpdate(true));
    const sortingAlgo =
      algorithm === "heap_sort"
        ? heapSort
        : algorithm === "merge_sort"
        ? mergeSort
        : algorithm === "quick_sort"
        ? quickSort
        : algorithm === "selection_sort"
        ? selectionSort
        : algorithm === "bubble_sort"
        ? bubbleSort
        : algorithm === "insertion_sort"
        ? insertionSort
        : null;
    sortingAlgo(array, dispatch, speed);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
