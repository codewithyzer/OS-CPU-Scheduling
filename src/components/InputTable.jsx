import React from 'react';

function InputTable({ processes, setProcesses, algorithm }) {
  const handleChange = (index, field, value) => {
    const updated = [...processes];
    updated[index][field] = parseInt(value);
    setProcesses(updated);
  };

  const addProcess = () => {
    const newPID = `P${processes.length + 1}`;
    setProcesses([...processes, { pid: newPID, arrivalTime: 0, burstTime: 1, priority: 1 }]);
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
            {algorithm === 'Priority' && <th>Priority</th>}
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
                  value={p.arrivalTime}
                  onChange={(e) => handleChange(index, 'arrivalTime', e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  value={p.burstTime}
                  onChange={(e) => handleChange(index, 'burstTime', e.target.value)}
                />
              </td>
              {algorithm === 'Priority' && (
                <td>
                  <input
                    type="number"
                    value={p.priority}
                    onChange={(e) => handleChange(index, 'priority', e.target.value)}
                  />
                </td>
              )}
              <td>
                <button onClick={() => deleteProcess(index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={addProcess} className='add-process'>Add Process</button>
    </div>
  );
}

export default InputTable;
