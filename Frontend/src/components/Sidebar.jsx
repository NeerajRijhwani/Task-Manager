import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import {
  LayoutDashboard,
  ClipboardList,
  MessageSquareMore,
  Settings,
  ChartColumn,
  Users,
} from "lucide-react";

import { useState } from "react";
export function Sidebar() {
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <div className="w-1/4 border-r pl-5 pt-3.5 h-full border-[#1c2637]">
      <h1 className="text-amber-50 text-3xl">LOGO</h1>
      <Box
        sx={{
          width: "90%",
          maxWidth: 380,
        }}
      >
        <nav aria-label="main mailbox folders">
          <List>
            <ListItem
              disablePadding
              sx={
                selectedIndex === 0
                  ? { bgcolor: "#135bec", borderRadius: 4 }
                  : {}
              }
            >
              <ListItemButton
                selected={selectedIndex === 0}
                onClick={(event) => handleListItemClick(event, 0)}
              >
                <ListItemIcon>
                  <LayoutDashboard color="#fff" />
                </ListItemIcon>
                <ListItemText
                  primary="Dashboard"
                  primaryTypographyProps={{
                    sx: { fontSize: "1.4rem", color: "#fff" },
                  }}
                  sx={{ color: "white" }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={
                selectedIndex === 1
                  ? { bgcolor: "#135bec", borderRadius: 4 }
                  : {}
              }
            >
              <ListItemButton
                selected={selectedIndex === 1}
                onClick={(event) => handleListItemClick(event, 1)}
              >
                <ListItemIcon>
                  <ClipboardList color="#fff" />
                </ListItemIcon>
                <ListItemText
                  primary="Tasks"
                  primaryTypographyProps={{
                    sx: { fontSize: "1.4rem", color: "#fff" },
                  }}
                />
              </ListItemButton>
            </ListItem>

            <ListItem
              disablePadding
              sx={
                selectedIndex === 2
                  ? { bgcolor: "#135bec", borderRadius: 4 }
                  : {}
              }
            >
              <ListItemButton
                selected={selectedIndex === 2}
                onClick={(event) => handleListItemClick(event, 2)}
              >
                <ListItemIcon>
                  <MessageSquareMore color="#fff" />
                </ListItemIcon>
                <ListItemText
                  primary="Chat"
                  primaryTypographyProps={{
                    sx: { fontSize: "1.4rem", color: "#fff" },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={
                selectedIndex === 3
                  ? { bgcolor: "#135bec", borderRadius: 4 }
                  : {}
              }
            >
              <ListItemButton
                selected={selectedIndex === 3}
                onClick={(event) => handleListItemClick(event, 3)}
              >
                <ListItemIcon>
                  <Users color="#fff" />
                </ListItemIcon>
                <ListItemText
                  primary="Teams"
                  primaryTypographyProps={{
                    sx: { fontSize: "1.4rem", color: "#fff" },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={
                selectedIndex === 4
                  ? { bgcolor: "#135bec", borderRadius: 4 }
                  : {}
              }
            >
              <ListItemButton
                selected={selectedIndex === 4}
                onClick={(event) => handleListItemClick(event, 4)}
              >
                <ListItemIcon>
                  <ChartColumn color="#fff" />
                </ListItemIcon>
                <ListItemText
                  primary="Reports"
                  primaryTypographyProps={{
                    sx: { fontSize: "1.4rem", color: "#fff" },
                  }}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              disablePadding
              sx={
                selectedIndex === 5
                  ? { bgcolor: "#135bec", borderRadius: 4 }
                  : {}
              }
            >
              <ListItemButton
                selected={selectedIndex === 5}
                onClick={(event) => handleListItemClick(event, 5)}
              >
                <ListItemIcon>
                  <Settings color="#fff" />
                </ListItemIcon>
                <ListItemText
                  primary="Settings"
                  primaryTypographyProps={{
                    sx: { fontSize: "1.4rem", color: "#fff" },
                  }}
                />
              </ListItemButton>
            </ListItem>
          </List>
        </nav>
      </Box>
    </div>
  );
}
