import { connect } from "react-redux";
import Line from "../Line/Line";

const Visualiser = ({ array, bubbleSortCompare, swap, sorted, insertion, selection, quickSortCompare, qsPivotIdx }: any) => {
  // console.log('sorted', sorted)
  console.log('quickSortCompare', quickSortCompare)
  return (
    <div className="line-container">
      {array?.map((height, idx) => {
        const color = sorted.includes(idx)
          ? "purple"
          : swap.includes(idx)
          ? "red"
          : qsPivotIdx === idx
          ? "yellow"
          : bubbleSortCompare.includes(idx) ||
            insertion.includes(idx) ||
            selection.includes(idx) ||
            quickSortCompare.includes(idx)
          ? "blue"
          : "green";
        return <Line height={height} key={idx} color={color} />;
      })}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  // console.log('state', state)
  return {
    array: state.array.value,
    bubbleSortCompare: state.bubbleSort.value,
    swap: state.swap.value,
    sorted: state.sorted.value,
    insertion: state.insertion.value,
    selection: state.selection.value,
    quickSortCompare: state.quickSort.value,
    qsPivotIdx: state.quickSort.pivot,
  };
};

export default connect(mapStateToProps, null)(Visualiser);
