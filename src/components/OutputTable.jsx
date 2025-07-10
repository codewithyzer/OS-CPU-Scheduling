import React from 'react';

function OutputTable({ results }) {
  const avgWT = results.reduce((acc, p) => acc + p.wt, 0) / results.length;
  const avgTAT = results.reduce((acc, p) => acc + p.tat, 0) / results.length;

  return (
    <div>
      <h3 className='results'>Results</h3>
      <table>
        <thead>
          <tr>
            <th>PID</th>
            <th>Waiting Time</th>
            <th>Turnaround Time</th>
          </tr>
        </thead>
        <tbody>
          {results.map(p => (
            <tr key={p.pid}>
              <td>{p.pid}</td>
              <td>{p.wt}</td>
              <td>{p.tat}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className='awt'>Average WT: {avgWT.toFixed(2)}</p>
      <p className='atat'>Average TAT: {avgTAT.toFixed(2)}</p>
    </div>
  );
}

export default OutputTable;
