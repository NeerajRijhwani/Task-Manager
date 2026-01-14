import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const TaskCompletionTrends = () => {
  // Generate data for 30 days
  const data = [
    { day: "DAY 1", completed: 45, target: 50 },
    { day: "DAY 2", completed: 52, target: 50 },
    { day: "DAY 3", completed: 48, target: 50 },
    { day: "DAY 4", completed: 55, target: 50 },
    { day: "DAY 5", completed: 58, target: 50 },
    { day: "DAY 6", completed: 62, target: 50 },
    { day: "DAY 7", completed: 59, target: 50 },
    { day: "DAY 8", completed: 65, target: 50 },
    { day: "DAY 9", completed: 68, target: 50 },
    { day: "DAY 10", completed: 72, target: 50 },
    { day: "DAY 11", completed: 70, target: 50 },
    { day: "DAY 12", completed: 75, target: 50 },
    { day: "DAY 13", completed: 78, target: 50 },
    { day: "DAY 14", completed: 82, target: 50 },
    { day: "DAY 15", completed: 80, target: 50 },
    { day: "DAY 16", completed: 85, target: 50 },
    { day: "DAY 17", completed: 88, target: 50 },
    { day: "DAY 18", completed: 92, target: 50 },
    { day: "DAY 19", completed: 90, target: 50 },
    { day: "DAY 20", completed: 95, target: 50 },
    { day: "DAY 21", completed: 98, target: 50 },
    { day: "DAY 22", completed: 102, target: 50 },
    { day: "DAY 23", completed: 100, target: 50 },
    { day: "DAY 24", completed: 105, target: 50 },
    { day: "DAY 25", completed: 110, target: 50 },
    { day: "DAY 26", completed: 108, target: 50 },
    { day: "DAY 27", completed: 115, target: 50 },
    { day: "DAY 28", completed: 118, target: 50 },
    { day: "DAY 29", completed: 120, target: 50 },
    { day: "DAY 30", completed: 115, target: 50 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1a1f2e] border border-[#2d3548] rounded-lg p-3 shadow-lg">
          <p className="text-gray-400 text-sm mb-1">{payload[0].payload.day}</p>
          <p className="text-blue-500 font-semibold">
            Completed: {payload[0].value}
          </p>
          {payload[1] && (
            <p className="text-gray-500 font-semibold">
              Target: {payload[1].value}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-inherit w-1/2 ">
      <div className="bg-[#0f172a] h-full rounded-lg border border-[#2d3548] p-6">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-white text-2xl font-bold mb-1">
              Task Completion Trends
            </h2>
            <p className="text-gray-400 text-sm">
              Activity monitor for current month
            </p>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-gray-400 text-sm">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-gray-600"></div>
              <span className="text-gray-400 text-sm">Target</span>
            </div>
          </div>
        </div>

        {/* Chart */}
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2d3548"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={{ stroke: "#2d3548" }}
              tickLine={false}
              interval={6}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fill: "#9ca3af", fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="completed"
              stroke="#3b82f6"
              strokeWidth={3}
              fill="url(#colorCompleted)"
              dot={false}
              activeDot={{ r: 6, fill: "#3b82f6" }}
            />
            <Line
              type="monotone"
              dataKey="target"
              stroke="#6b7280"
              strokeWidth={2}
              dot={false}
              strokeDasharray="5 5"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TaskCompletionTrends;
