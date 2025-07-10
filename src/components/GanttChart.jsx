import React from 'react';

function GanttChart({ chartData }) {
  const boxWidth = 60; // fixed width in px

  return (
    <div>
      <h3>Gantt Chart</h3>

      {/* Process Blocks */}
      <div style={{ display: 'flex' }}>
        {chartData.map((block, index) => (
          <div
            key={index}
            style={{
              minWidth: `${boxWidth}px`,
              height: '40px',
              border: '1px solid #333',
              backgroundColor: '#cce5ff',
              textAlign: 'center',
              lineHeight: '40px',
              fontWeight: 'bold',
            }}
          >
            {block.pid}
          </div>
        ))}
      </div>

      {/* Time Labels */}
      <div style={{ display: 'flex' }}>
        {chartData.map((block, index) => (
          <div
            key={index}
            style={{
              minWidth: `${boxWidth}px`,
              textAlign: 'left',
              fontSize: '14px',
              marginLeft: index === 0 ? '0' : '-5px',
            }}
          >
            {block.start}
          </div>
        ))}
        <div style={{ minWidth: `${boxWidth}px`, fontSize: '14px', textAlign: 'left', marginLeft: '-5px' }}>
          {chartData[chartData.length - 1]?.end}
        </div>
      </div>
    </div>
  );
}

export default GanttChart;
