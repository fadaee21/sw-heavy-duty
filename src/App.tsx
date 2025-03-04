import './App.css'

import HeavyTask from './HeavyTask';
import WorkerHeavyTask from './WorkerHeavyTask';

function App() {
  return (
    <div>
      <h1>Web Worker Demo</h1>
      <HeavyTask />
      <WorkerHeavyTask />
    </div>
  );
}

export default App;
