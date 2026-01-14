import React from "react";
import { Card, CardContent, Typography, Box, Grid } from "@mui/material";
import {
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Error as ErrorIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";

const StatCard = ({
  title,
  value,
  percentage,
  icon: Icon,
  iconColor,
  iconBgColor,
}) => {
  const isPositive = percentage >= 0;
  const TrendIcon = isPositive ? TrendingUpIcon : TrendingDownIcon;
  const trendColor = isPositive ? "#10b981" : "#ef4444";

  return (
    <Card
      sx={{
        bgcolor: "#0f172a",
        borderRadius: 2,
        border: "1px solid #2d3548",
        height: "100%",
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 48,
              height: 48,
              borderRadius: 1.5,
              bgcolor: iconBgColor,
            }}
          >
            <Icon sx={{ color: iconColor, fontSize: 24 }} />
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <TrendIcon sx={{ color: trendColor, fontSize: 16 }} />
            <Typography
              variant="body2"
              sx={{
                color: trendColor,
                fontWeight: 600,
              }}
            >
              {isPositive ? "+" : ""}
              {percentage}%
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: "#9ca3af",
            mb: 1,
            fontSize: "0.875rem",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            color: "#f9fafb",
            fontWeight: 700,
            fontSize: "2rem",
          }}
        >
          {value.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );
};

const TaskStatsDashboard = () => {
  const statsData = [
    {
      title: "Total Tasks",
      value: 1284,
      percentage: 12,
      icon: DescriptionIcon,
      iconColor: "#3b82f6",
      iconBgColor: "rgba(59, 130, 246, 0.1)",
    },
    {
      title: "Completed Tasks",
      value: 856,
      percentage: 5,
      icon: CheckCircleIcon,
      iconColor: "#10b981",
      iconBgColor: "rgba(16, 185, 129, 0.1)",
    },
    {
      title: "Pending Tasks",
      value: 342,
      percentage: -2,
      icon: ScheduleIcon,
      iconColor: "#f59e0b",
      iconBgColor: "rgba(245, 158, 11, 0.1)",
    },
    {
      title: "Overdue Tasks",
      value: 86,
      percentage: 1,
      icon: ErrorIcon,
      iconColor: "#ef4444",
      iconBgColor: "rgba(239, 68, 68, 0.1)",
    },
  ];

  return (
    <Box sx={{ bgcolor: "inherit", p: 4 }}>
      <Grid container spacing={3}>
        {statsData.map((stat, index) => (
          <Grid sx={{ width: "23%" }} key={index}>
            <StatCard {...stat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TaskStatsDashboard;
