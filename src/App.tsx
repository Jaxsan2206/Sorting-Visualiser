import './App.css';
import Line from './components/Line/Line';
import { generateRandomNumberArray } from './helpers';

function App() {
  const numbers = generateRandomNumberArray(100, 200, 300)
  return (
    <div className="App">
      <Line heights={numbers}/>
    </div>
  );
}

export default App;
