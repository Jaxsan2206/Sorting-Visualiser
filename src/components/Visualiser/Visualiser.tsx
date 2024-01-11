import { connect } from "react-redux";
import Line from "../Line/Line";

const Visualiser = ({ array, bubbleSortCompare, swap, sorted }: any) => {
  console.log('sorted', sorted)
  return (
    <div className="line-container">
      {array?.map((height, idx) => {
        const color = sorted.includes(idx)
          ? "purple"
          : swap.includes(idx)
          ? "red"
          : bubbleSortCompare.includes(idx)
          ? "blue"
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
  };
};

export default connect(mapStateToProps, null)(Visualiser);
