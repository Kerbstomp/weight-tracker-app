import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const WeightAreaChart = ({ chartData }) => {
  return (
    <AreaChart
      width={800}
      height={400}
      data={chartData}
      margin={{
        top: 10,
        right: 30,
        left: 250,
        bottom: 0,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="created_datetime" />
      <YAxis />
      <Tooltip />
      <Area type="monotone" dataKey="weight" stroke="#8884d8" fill="#8884d8" />
    </AreaChart>
  );
};

export default WeightAreaChart;
