import { Typography } from "@mui/material";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import TaskStatsDashboard from "../components/StatsTasksCard";
import PriorityDistribution from "../components/TaskPriorityDist";
import TaskCompletionTrends from "../components/TrendChart";
import TeamWorkloadTable from "../components/TeamLeaderBoard";
export function Dashboard() {
  return (
    <div className="bg-[#101622] flex w-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <div className="flex-1 overflow-y-auto border-t-2 border-[#1c2637]">
          <div className="pt-3 pl-8">
            <Typography variant="h5" sx={{ color: "#f5f9fd", margin: 0 }}>
              High-Level Anayltics
            </Typography>
            <Typography sx={{ color: "#727e90", margin: 0 }}>
              Overview of organization-wide task performance over the last 30
              days
            </Typography>
          </div>
          <TaskStatsDashboard />
          <div className="flex justify-between p-8 border-t border-[#1c2637] h-3/4 w-full">
            <TaskCompletionTrends />
            <PriorityDistribution />
          </div>
          <div className="flex justify-between p-8 border-t border-[#1c2637] h-3/4 w-full">
            <TeamWorkloadTable />
          </div>
        </div>
      </div>
    </div>
  );
}
