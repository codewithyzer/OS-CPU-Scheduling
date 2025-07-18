import React from "react";

function GanttChart({ chartData }) {
  const widthPerUnit = 40; // pixels per time unit

  return (
    <div>
      <h3 className="gantt">Gantt Chart</h3>

      {/* Process Blocks */}
      <div style={{ display: "flex" }}>
        {chartData.map((block, index) => {
          const duration = block.end - block.start;
          const blockWidth = duration * widthPerUnit;

          return (
            <div
              key={index}
              style={{
                width: `${blockWidth}px`,
                height: "40px",
                border: "1px solid white",
                backgroundColor: block.pid === "Idle" ? "#999" : "#10bb82",
                color: "white",
                textAlign: "center",
                lineHeight: "40px",
                fontWeight: "bold",
              }}
            >
              {block.pid}
            </div>
          );
        })}
      </div>

      {/* Time Labels */}
      <div style={{ display: "flex" }}>
        {chartData.map((block, index) => {
          const duration = block.end - block.start;
          const blockWidth = duration * widthPerUnit;

          return (
            <div
              key={index}
              style={{
                width: `${blockWidth}px`,
                textAlign: "left",
                fontSize: "14px",
                color: "#10bb82",
              }}
            >
              {block.start}
            </div>
          );
        })}

        {/* Final end time */}
        <div
          style={{
            fontSize: "14px",
            textAlign: "left",
            color: "#10bb82",
          }}
        >
          {chartData[chartData.length - 1]?.end}
        </div>
      </div>
    </div>
  );
}

export default GanttChart;
