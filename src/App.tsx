import "./App.css";
import { useEffect } from "react";
import { generateRandomNumberArray } from "./helpers/generateNumberArray";
import Visualiser from "./components/Visualiser/Visualiser";
import { connect } from "react-redux";
import { arrayUpdate } from "./reducers/array";
import { algorithmUpdate } from "./reducers/algorithm";
import { getBubbleSortAnimations } from "./algorithms/getBubbleSortAnimations";

function App({ array, algorithm, createArray, updateAlgorithm, sort }) {

  useEffect(() => {
    createArray(5)
  }, [])

  return (
    <div className="App">
      <select onChange={(e) => {
        updateAlgorithm(e.target.value)
      }}>
        <option value={"bubble_sort"}>Bubble Sort</option>
        <option value={"selection_sort"}>Selection Sort</option>
        <option value={"insertion_sort"}>Insertion Sort</option>
        <option value={"merge_sort"}>Merge Sort</option>
      </select>
      <Visualiser/>
      <button onClick={() => sort(algorithm, array)}>Sort</button>
      <button onClick={() => createArray(5)}>Reset</button>
    </div>
  );
}

const mapStateToProps = (state: any) => ({ 
    array: state.array.value,
    algorithm: state.algorithm.value
})

const mapDispatchToProps = (dispatch) => ({
    createArray: (length) => {
      const array = generateRandomNumberArray(length)
      dispatch(arrayUpdate(array))
    },
    updateAlgorithm: (algorithm) => dispatch(algorithmUpdate(algorithm)),
    sort: (algorithm, array) => {
      const sortingAlgo = algorithm === 'bubble_sort' ? getBubbleSortAnimations : null
      sortingAlgo(array, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
