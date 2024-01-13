import "./App.css";
import { useEffect } from "react";
import { generateRandomNumberArray } from "./helpers/generateNumberArray";
import Visualiser from "./components/Visualiser/Visualiser";
import { connect } from "react-redux";
import { arrayUpdate } from "./reducers/array";
import { algorithmUpdate } from "./reducers/algorithm";
import { getBubbleSortAnimations } from "./algorithms/bubbleSort";
import { insertionSort } from "./algorithms/insertionSort";
import { selectionSort } from "./algorithms/selectionSort";
import { quickSort } from "./algorithms/quickSort";

function App({ array, algorithm, createArray, updateAlgorithm, sort }) {
  useEffect(() => {
    createArray(5);
  }, []);

  return (
    <div className="App">
      <select
        onChange={(e) => {
          updateAlgorithm(e.target.value);
        }}
      >
        <option value={"bubble_sort"}>Bubble Sort</option>
        <option value={"selection_sort"}>Selection Sort</option>
        <option value={"insertion_sort"}>Insertion Sort</option>
        <option value={"quick_sort"}>Quick Sort</option>
        <option value={"merge_sort"}>Merge Sort</option>
      </select>
      <Visualiser />
      <button onClick={() => sort(algorithm, array)}>Sort</button>
      <button onClick={() => createArray(5)}>Reset</button>
    </div>
  );
}

const mapStateToProps = (state: any) => ({
  array: state.array.value,
  algorithm: state.algorithm.value,
});

const mapDispatchToProps = (dispatch) => ({
  createArray: (length) => {
    // const array = generateRandomNumberArray(length);
    const array = [80, 50, 20, 90, 50, 60, 30]
    dispatch(arrayUpdate(array));
  },
  updateAlgorithm: (algorithm) => dispatch(algorithmUpdate(algorithm)),
  sort: (algorithm, array) => {
    const sortingAlgo =
      algorithm === "quick_sort"
        ? quickSort
        : algorithm === "selection_sort"
        ? selectionSort
        : algorithm === "bubble_sort"
        ? getBubbleSortAnimations
        : algorithm === "insertion_sort"
        ? insertionSort
        : null;
    sortingAlgo(array, dispatch);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
