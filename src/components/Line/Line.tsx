import "./line.css";

interface ILine {
  height: number;
}

const Line: React.FC<ILine> = ({ height }) => {
  return <div className={"line"} style={{ height: `${height}px` }}></div>;
};

export default Line;
