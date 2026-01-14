import React, { useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Typography,
  LinearProgress,
  Chip,
  IconButton,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const TeamWorkloadTable = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);

  const handleMenuOpen = (event, member) => {
    setAnchorEl(event.currentTarget);
    setSelectedMember(member);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedMember(null);
  };

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "UI Designer",
      activeTasks: 12,
      utilization: 80,
      status: "ACTIVE",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Frontend Developer",
      activeTasks: 15,
      utilization: 95,
      status: "ACTIVE",
      avatar: "https://i.pravatar.cc/150?img=2",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Backend Developer",
      activeTasks: 10,
      utilization: 75,
      status: "ACTIVE",
      avatar: "https://i.pravatar.cc/150?img=3",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Product Manager",
      activeTasks: 8,
      utilization: 60,
      status: "ACTIVE",
      avatar: "https://i.pravatar.cc/150?img=4",
    },
    {
      id: 5,
      name: "Jessica Williams",
      role: "UX Researcher",
      activeTasks: 6,
      utilization: 50,
      status: "INACTIVE",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
  ];

  const getUtilizationColor = (utilization) => {
    if (utilization >= 80) return "primary";
    if (utilization >= 60) return "success";
    return "warning";
  };

  return (
    <Box
      sx={{
        bgcolor: "inherit",
        width: "100%",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          bgcolor: "#0f172a",
          borderRadius: 2,
          border: "1px solid #2d3548",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            p: 3,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid #2d3548",
            background:
              "linear-gradient(90deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)",
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{
                color: "white",
                fontWeight: 700,
                mb: 0.5,
              }}
            >
              Active Team Workload
            </Typography>
            <Typography variant="body2" sx={{ color: "#9ca3af" }}>
              Monitor team capacity and task distribution
            </Typography>
          </Box>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#3b82f6",
              "&:hover": {
                bgcolor: "#2563eb",
              },
              textTransform: "none",
              fontWeight: 600,
              boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.39)",
            }}
          >
            View All Team
          </Button>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  bgcolor: "inherit",
                  "& th": {
                    color: "#9ca3af",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    borderBottom: "1px solid #2d3548",
                  },
                }}
              >
                <TableCell>Member</TableCell>
                <TableCell>Active Tasks</TableCell>
                <TableCell>Utilization</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamMembers.map((member, index) => (
                <TableRow
                  key={member.id}
                  sx={{
                    "&:hover": {
                      bgcolor: "rgba(59, 130, 246, 0.05)",
                    },
                    borderBottom:
                      index === teamMembers.length - 1
                        ? "none"
                        : "1px solid #12e034",
                    transition: "background-color 0.2s",
                  }}
                >
                  {/* Member */}
                  <TableCell sx={{ py: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Avatar
                        src={member.avatar}
                        alt={member.name}
                        sx={{
                          width: 48,
                          height: 48,
                          border: "1px solid #2d3548",
                        }}
                      />
                      <Box>
                        <Typography
                          variant="body1"
                          sx={{
                            color: "white",
                            fontWeight: 600,
                            mb: 0.25,
                          }}
                        >
                          {member.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#9ca3af" }}>
                          {member.role}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  {/* Active Tasks */}
                  <TableCell>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "white",
                        fontWeight: 600,
                      }}
                    >
                      {member.activeTasks}
                    </Typography>
                  </TableCell>

                  {/* Utilization */}
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                      <Box sx={{ flexGrow: 1, maxWidth: 150 }}>
                        <LinearProgress
                          variant="determinate"
                          value={member.utilization}
                          color={getUtilizationColor(member.utilization)}
                          sx={{
                            height: 8,
                            borderRadius: 4,
                            bgcolor: "#2d3548",
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 4,
                            },
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#e5e7eb",
                          fontWeight: 600,
                          minWidth: 45,
                        }}
                      >
                        {member.utilization}%
                      </Typography>
                    </Box>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Chip
                      label={member.status}
                      size="small"
                      sx={{
                        bgcolor:
                          member.status === "ACTIVE"
                            ? "rgba(16, 185, 129, 0.2)"
                            : "rgba(107, 114, 128, 0.2)",
                        color:
                          member.status === "ACTIVE" ? "#10b981" : "#6b7280",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        borderRadius: 1.5,
                        px: 1,
                      }}
                    />
                  </TableCell>

                  {/* Actions */}
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, member)}
                      sx={{
                        color: "#9ca3af",
                        "&:hover": {
                          color: "white",
                          bgcolor: "rgba(59, 130, 246, 0.1)",
                        },
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Action Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              bgcolor: "#1a1f2e",
              border: "1px solid #2d3548",
              "& .MuiMenuItem-root": {
                color: "white",
                "&:hover": {
                  bgcolor: "rgba(59, 130, 246, 0.1)",
                },
              },
            },
          }}
        >
          <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
          <MenuItem onClick={handleMenuClose}>Edit Member</MenuItem>
          <MenuItem onClick={handleMenuClose}>Assign Tasks</MenuItem>
          <MenuItem
            onClick={handleMenuClose}
            sx={{ color: "#ef4444 !important" }}
          >
            Remove
          </MenuItem>
        </Menu>
      </Paper>
    </Box>
  );
};

export default TeamWorkloadTable;
