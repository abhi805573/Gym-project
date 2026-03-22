import React from "react";
import "./bmichart.css";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  ResponsiveContainer,
  Label,
} from "recharts";

const COLORS = ["#ff6f00", "#00724a", "#ff0000", "#FF8042"];

// Always show all three categories, with active category highlighted in legend
const getDynamicData = (ybmi) => {
  return [
    { name: "Underweight (<18.5)", value: 33.33, active: ybmi !== null && !isNaN(ybmi) && ybmi < 18.5 },
    { name: "Normal (18.5-24.9)", value: 33.33, active: ybmi !== null && !isNaN(ybmi) && ybmi >= 18.5 && ybmi < 25 },
    { name: "Overweight (25+)", value: 33.33, active: ybmi !== null && !isNaN(ybmi) && ybmi >= 25 },
  ];
};

const Bullet = ({ backgroundColor, size }) => (
  <div
    className="CirecleBullet"
    style={{ backgroundColor, width: size, height: size }}
  ></div>
);

const CustomLabel = ({ viewBox, labelText, value }) => {
  const { cx, cy } = viewBox;
  const displayValue = typeof value === "number" && !isNaN(value) ? value.toFixed(2) : "N/A";
  return (
    <g>
      <text
        x={cx}
        y={cy}
        className="recharts-text recharts-label"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
        fontSize="15"
      >
        {labelText}
      </text>
      <text
        x={cx}
        y={cy + 30} // Increased from 20px to 30px for a slightly larger gap
        className="recharts-text recharts-label CenteredLabelValue"
        textAnchor="middle"
        dominantBaseline="central"
        alignmentBaseline="middle"
      >
        {displayValue}
      </text>
    </g>
  );
};

const CustomizedLegend = (props) => {
  const { payload } = props;
  return (
    <ul className="LegendList">
      {payload.map((entry, index) => (
        <li key={`item-${index}`}>
          <div className="BulletLabel">
            <Bullet backgroundColor={entry.payload.fill} size="10px" />
            <div
              className="BulletLabelText"
              style={{ fontWeight: entry.payload.active ? "bold" : "normal" }}
            >
              {entry.value}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default function BmiChart({ ybmi }) {
  const data01 = getDynamicData(ybmi); // Use data with all categories
  const activeCategory = data01.find(entry => entry.active);
  const colorIndex = activeCategory ? ["Underweight (<18.5)", "Normal (18.5-24.9)", "Overweight (25+)"].indexOf(activeCategory.name) : -1;
  const strokeColor = colorIndex >= 0 ? COLORS[colorIndex] : "#000000"; // Default to black if no active category

  return (
    <div style={{ width: "100%", height: 420, position: "relative" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <circle
            cx="50%"
            cy="50%"
            r="80"
            fill="transparent" // Inner circle remains transparent
          />
          <Pie
            data={data01}
            dataKey="value"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={100}
            stroke={strokeColor}
            strokeWidth={2}
          >
            {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
                opacity={1} // No fading
              />
            ))}
            <Label
              content={<CustomLabel labelText="BMI" value={ybmi} />}
              position="center"
            />
          </Pie>
          <Legend content={<CustomizedLegend />} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}