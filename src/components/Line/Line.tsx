import "./line.css";

interface ILine {
  height: number;
  color: string;
}

const Line: React.FC<ILine> = ({ height, color }) => {
  return (
    <div
      className={"line"}
      style={{ height: `${height}px`, backgroundColor: color }}
    />
  );
};

export default Line;
