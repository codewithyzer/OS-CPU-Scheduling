// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   return (
//     <>
      // <main>
      //   <div className='welcome'>
      //     <div className="welcome--message">
      //       <h4 className='welcome--message--title'>Os CPU Scheduling</h4>
      //       <p className='welcome--messsage--paragraph'>Explore and understand CPU scheduling algorithms for efficient process management!</p>
      //     </div>
      //     <div className="welcome--graphic">WELCOME</div>
      //   </div>

      //   <div className='algorithms'>
      //     <div className='algorithms--fcfs'>
      //       <p className='algorithms--fcfs--title'>FCFS</p>
      //       <div className='algorithms--fcfs--description-button'>
      //         <p className='fcfs--description'>Proceess are excuted in the order they arrive. Simple but can lead to long waiting times.</p>
      //         <button className="fcfs--choose">choose</button>
      //       </div>
      //     </div>

      //     <div className='algorithms--sjf'>
      //       <p className='algorithms--sjf--title'>SJF</p>
      //       <div className='algorithms--sjf--description-button'>
      //         <p className="sjf--description">
      //           Executes the process with the shortest burst time first. Efficient but may cause longer jobs to wait.
      //         </p>
      //         <button className="sjf--choose">choose</button>
      //       </div>
      //     </div>

      //     <div className='algorithms--priority'>
      //       <p className='algorithms--priority--title'>Priority</p>
      //       <div className='algorithms--priority--description-button'>
      //         <p className="priority--description">Runs the process with the highest priority first. Lower priority processes may wait longer.</p>
      //         <button className="priority--choose">choose</button>
      //       </div>
      //     </div>
      //   </div>
      // </main>
//     </>
//   )
// }

// export default App

import React, { useState } from 'react';
import InputTable from './components/InputTable';
import OutputTable from './components/OutputTable';
import GanttChart from './components/GanttChart';
import './App.css';

function App() {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [algorithm, setAlgorithm] = useState('FCFS');

  const handleCalculate = () => {
    let result = [];
    let gantt = [];
    let sorted = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

    let time = 0;

    if (algorithm === 'FCFS') {
      sorted.forEach(p => {
        if (time < p.arrivalTime) time = p.arrivalTime;
        const start = time;
        const end = start + p.burstTime;
        time = end;
        const tat = end - p.arrivalTime;
        const wt = tat - p.burstTime;

        result.push({ ...p, start, end, wt, tat });
        gantt.push({ pid: p.pid, start, end });
      });
    }
    setResults(result);
    setChartData(gantt);
  };

  return (
    <>
      <main>
        <div className='welcome'>
          <div className="welcome--message">
            <h4 className='welcome--message--title'>Os CPU Scheduling</h4>
            <p className='welcome--messsage--paragraph'>Explore and understand CPU scheduling algorithms for efficient process management!</p>
          </div>
          <div className="welcome--graphic">WELCOME</div>
        </div>
{/* 
        <div className='algorithms'>
          <div className='algorithms--fcfs'>
            <p className='algorithms--fcfs--title'>FCFS</p>
            <div className='algorithms--fcfs--description-button'>
              <p className='fcfs--description'>Proceess are excuted in the order they arrive. Simple but can lead to long waiting times.</p>
              <button className="fcfs--choose">choose</button>
            </div>
          </div>

          <div className='algorithms--sjf'>
            <p className='algorithms--sjf--title'>SJF</p>
            <div className='algorithms--sjf--description-button'>
              <p className="sjf--description">
                Executes the process with the shortest burst time first. Efficient but may cause longer jobs to wait.
              </p>
              <button className="sjf--choose">choose</button>
            </div>
          </div>

          <div className='algorithms--priority'>
            <p className='algorithms--priority--title'>Priority</p>
            <div className='algorithms--priority--description-button'>
              <p className="priority--description">Runs the process with the highest priority first. Lower priority processes may wait longer.</p>
              <button className="priority--choose">choose</button>
            </div>
          </div>
        </div> */}
      </main>
      <div className="App">
        <h2 className='os--title'>OS 3301 CPU Scheduling</h2>
          <div className='operations'>
            <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
            <option value="FCFS">First Come First Serve</option>
          </select>
          <button onClick={handleCalculate} className='calculate'>Calculate</button>
        </div>
        <InputTable processes={processes} setProcesses={setProcesses} algorithm={algorithm} />
        {results.length > 0 && (
          <>
            <OutputTable results={results} />
            <GanttChart chartData={chartData} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
