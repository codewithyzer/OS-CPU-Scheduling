import React from "react";

function InputTable({
  processes,
  setProcesses,
  algorithm,
  pidCounter,
  setPidCounter,
}) {
  const handleChange = (index, field, value) => {
    const updated = [...processes];
    updated[index][field] = parseInt(value);
    setProcesses(updated);
  };

  const addProcess = () => {
    const existingPIDs = processes.map((p) => parseInt(p.pid.replace("P", "")));
    let newPidNum = 1;
    while (existingPIDs.includes(newPidNum)) {
      newPidNum++;
    }

    const newPID = `P${newPidNum}`;

    setProcesses([
      ...processes,
      { pid: newPID, arrivalTime: "", burstTime: "", priority: "" },
    ]);
  };

  const deleteProcess = (index) => {
    const updated = processes.filter((_, i) => i !== index);
    setProcesses(updated);
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            {algorithm === "PRIORITY" && <th>Priority</th>}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {processes.map((p, index) => (
            <tr key={index}>
              <td>{p.pid}</td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={p.arrivalTime}
                  onChange={(e) =>
                    handleChange(index, "arrivalTime", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  min="0"
                  value={p.burstTime}
                  onChange={(e) =>
                    handleChange(index, "burstTime", e.target.value)
                  }
                />
              </td>
              {algorithm === "PRIORITY" && (
                <td>
                  <input
                    type="number"
                    min="0"
                    value={p.priority}
                    onChange={(e) =>
                      handleChange(index, "priority", e.target.value)
                    }
                  />
                </td>
              )}
              <td>
                <button onClick={() => deleteProcess(index)} className="delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addProcess}
        disabled={processes.length >= 9}
        className="add-process"
      >
        Add Process
      </button>
    </div>
  );
}

export default InputTable;
