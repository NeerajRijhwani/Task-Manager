import React from "react";
import { AlertCircle } from "lucide-react";

const PriorityDistribution = () => {
  const priorities = [
    {
      label: "High Priority",
      percentage: 32,
      color: "#ef4444",
      bgColor: "rgba(239, 68, 68, 0.1)",
    },
    {
      label: "Medium Priority",
      percentage: 48,
      color: "#f59e0b",
      bgColor: "rgba(245, 158, 11, 0.1)",
    },
    {
      label: "Low Priority",
      percentage: 20,
      color: "#10b981",
      bgColor: "rgba(16, 185, 129, 0.1)",
    },
  ];

  return (
    <div className="w-1/2 flex justify-end h-full ">
      <div className="bg-[#0f172a] rounded-lg border border-[#2d3548] p-8 w-full max-w-md">
        {/* Header */}
        <h2 className="text-white text-2xl font-bold mb-8">
          Priority Distribution
        </h2>

        {/* Priority Bars */}
        <div className="space-y-6 mb-8">
          {priorities.map((priority, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300 text-sm font-medium">
                  {priority.label}
                </span>
                <span className="text-blue-500 text-sm font-bold">
                  {priority.percentage}%
                </span>
              </div>
              <div
                className="h-2 rounded-full overflow-hidden"
                style={{ backgroundColor: priority.bgColor }}
              >
                <div
                  className="h-full rounded-full transition-all duration-500 ease-out"
                  style={{
                    width: `${priority.percentage}%`,
                    backgroundColor: priority.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Note */}
        <div
          className="rounded-lg p-4"
          style={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
        >
          <div className="flex gap-3">
            <AlertCircle size={20} className="text-gray-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-white font-semibold text-sm">Note: </span>
              <span className="text-gray-400 text-sm">
                Medium priority tasks comprise the largest portion of the
                backlog this month.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityDistribution;
