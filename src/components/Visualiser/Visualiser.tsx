import { connect } from "react-redux";
import Line from "../Line/Line";

const Visualiser = ({ array, bubbleSortCompare, swap, sorted, insertion, selection, quickSortCompare, qsPivotIdx, mergeSortX, heapSort }: any) => {
  return (
    <div className="line-container">
      {array?.map((height, idx) => {
        const color = swap.includes(idx)
          ? "red"
          : bubbleSortCompare.includes(idx) ||
            insertion.includes(idx) ||
            selection.includes(idx) ||
            quickSortCompare.includes(idx) ||
            mergeSortX.includes(idx) || heapSort.includes(idx)
          ? "blue"
          : qsPivotIdx === idx
          ? "yellow"
          : sorted.includes(idx)
          ? "purple"
          : "green";
        return <Line height={height} key={idx} color={color} />;
      })}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    array: state.array.value,
    bubbleSortCompare: state.bubbleSort.value,
    swap: state.swap.value,
    sorted: state.sorted.value,
    insertion: state.insertion.value,
    selection: state.selection.value,
    quickSortCompare: state.quickSort.value,
    qsPivotIdx: state.quickSort.pivot,
    mergeSortX: state.mergeSort.value,
    heapSort: state.heapSort.value
  };
};

export default connect(mapStateToProps, null)(Visualiser);
