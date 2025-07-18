import React, { useState } from "react";
import InputTable from "./components/InputTable";
import OutputTable from "./components/OutputTable";
import GanttChart from "./components/GanttChart";
import "./App.css";

function App() {
  const [processes, setProcesses] = useState([]);
  const [results, setResults] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [pidCounter, setPidCounter] = useState(1);
  const [algorithm, setAlgorithm] = useState("FCFS");

  const handleCalculate = () => {
    let result = [];
    let gantt = [];
    let sorted = [...processes];
    let time = 0;
    let completed = [];
    let isCompleted = new Array(processes.length).fill(false);

    if (algorithm === "FCFS") {
      sorted.sort((a, b) => a.arrivalTime - b.arrivalTime);
      sorted.forEach((p) => {
        // Add idle time if there's a gap between current time and process arrival
        if (time < p.arrivalTime) {
          gantt.push({
            pid: "Idle",
            start: time,
            end: p.arrivalTime,
          });
          time = p.arrivalTime;
        }

        const start = time;
        const end = start + p.burstTime;
        time = end;

        const tat = end - p.arrivalTime;
        const wt = tat - p.burstTime;

        result.push({ ...p, start, end, wt, tat });
        gantt.push({ pid: p.pid, start, end });
      });
    } else if (algorithm === "SJF") {
      while (completed.length < processes.length) {
        let available = sorted.filter(
          (p, i) => p.arrivalTime <= time && !isCompleted[i]
        );

        if (available.length === 0) {
          time++;
          continue;
        }

        available.sort((a, b) => a.burstTime - b.burstTime);
        let current = available[0];
        let index = sorted.findIndex((p) => p.pid === current.pid);

        const start = time;
        const end = start + current.burstTime;
        time = end;

        const tat = end - current.arrivalTime;
        const wt = tat - current.burstTime;

        result.push({ ...current, start, end, wt, tat });
        gantt.push({ pid: current.pid, start, end });
        isCompleted[index] = true;
        completed.push(current);
      }
    } else if (algorithm === "PRIORITY") {
      while (completed.length < processes.length) {
        let available = sorted.filter(
          (p, i) => p.arrivalTime <= time && !isCompleted[i]
        );

        if (available.length === 0) {
          time++;
          continue;
        }

        available.sort((a, b) => a.priority - b.priority);
        let current = available[0];
        let index = sorted.findIndex((p) => p.pid === current.pid);

        const start = time;
        const end = start + current.burstTime;
        time = end;

        const tat = end - current.arrivalTime;
        const wt = tat - current.burstTime;

        result.push({ ...current, start, end, wt, tat });
        gantt.push({ pid: current.pid, start, end });
        isCompleted[index] = true;
        completed.push(current);
      }
    }

    setResults(result);
    setChartData(gantt);
  };

  return (
    <>
      <main>
        <div className="welcome">
          <div className="welcome--message">
            <h4 className="welcome--message--title">Os CPU Scheduling</h4>
            <p className="welcome--messsage--paragraph">
              Explore and understand CPU scheduling algorithms for efficient
              process management!
            </p>
            <p className="group">Group Members</p>
            <div className="members">
              <p>De Boda, Rodel Yzer C.</p>
              <p>De Castro, Eloiza F.</p>
              <p>Esguerra, John Zelwyn P.</p>
              <p>Hernandez, Adhem V.</p>
              <p>Manalon, Carl Jasper C.</p>
            </div>
          </div>
          <div className="welcome--graphic">WELCOME!</div>
        </div>
      </main>
      <section className="App">
        <h2 className="os--title">OS 3301 CPU Scheduling</h2>
        <div className="operations">
          <select
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="FCFS">First Come First Serve</option>
            <option value="SJF">Shortest Job First</option>
            <option value="PRIORITY">Priority Scheduling</option>
          </select>
          <button onClick={handleCalculate} className="calculate">
            Calculate
          </button>
        </div>
        <InputTable
          processes={processes}
          setProcesses={setProcesses}
          algorithm={algorithm}
          pidCounter={pidCounter}
          setPidCounter={setPidCounter}
        />
        {results.length > 0 && (
          <>
            <GanttChart chartData={chartData} />
            <OutputTable results={results} />
          </>
        )}
      </section>
    </>
  );
}

export default App;
