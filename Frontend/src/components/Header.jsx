import { useState } from "react";
import { Box, Menu, TextField, Popover, MenuList } from "@mui/material";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { ExpandMore } from "@mui/icons-material";
import { useMemo } from "react";
import { FormControl, ListSubheader } from "@mui/material";
import { Search } from "@mui/icons-material";
function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const organizations = [
  { id: 1, name: "Acme Corporation" },
  { id: 2, name: "TechStart Inc" },
  { id: 3, name: "Global Dynamics" },
  { id: 4, name: "Innovate Labs" },
  { id: 5, name: "Digital Solutions Ltd" },
  { id: 6, name: "Enterprise Systems" },
  { id: 7, name: "CloudTech Partners" },
  {
    id: 8,
    name: "DataFlow Analytics",
  },
  { id: 9, name: "NextGen Industries" },
  { id: 10, name: "Prime Ventures" },
];

function OrganizationDropdown({ organizations = [], name, onViewAll }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const open = Boolean(anchorEl);

  const filteredArray = useMemo(() => {
    return organizations.filter((org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [organizations, searchQuery]);
  const searchstring = `Search ${name}...`;
  const selectedOrgName = organizations.find((o) => o.id === selectedOrg)?.name;

  return (
    <>
      {/* Trigger */}
      <Button
        variant="outlined"
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{
          width: "40%",
          justifyContent: "space-between",
          borderColor: "white",
          color: "white",
        }}
      >
        <Typography
          sx={{
            maxWidth: 200,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {selectedOrgName || `${name}`}
        </Typography>
        <ExpandMore />
      </Button>

      {/* Dropdown */}
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
        PaperProps={{
          sx: {
            width: anchorEl?.clientWidth,
            display: "flex",
            borderColor: "white",
            border: "1px",
            bgcolor: "#101622",
            flexDirection: "column",
            maxHeight: 420,
          },
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
          <TextField
            fullWidth
            size="small"
            placeholder={searchstring}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              sx: {
                color: "white",
                border: "1px",
                borderColor: "white",
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
                "&:hover .MuiOutlinedInput-notchedOutline": {
                  borderColor: "white",
                },
              },
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: "white" }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Scrollable list */}
        <Box
          sx={{
            flex: 1,
            bgcolor: "inherit",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          <MenuList dense>
            {filteredArray.length > 0 ? (
              filteredArray.map((org) => (
                <MenuItem
                  key={org.id}
                  selected={org.id === selectedOrg}
                  onClick={() => {
                    setSelectedOrg(org.id);
                    setAnchorEl(null);
                  }}
                  sx={{
                    "&:hover": {},
                    "&.Mui-selected": {
                      backgroundColor: "#145de9",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      color: "white",
                      fontWeight: 500,
                      whiteSpace: "normal",
                      wordBreak: "break-word",
                    }}
                  >
                    {org.name}
                  </Typography>
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <Typography sx={{ color: "#999", fontStyle: "italic" }}>
                  No organizations found
                </Typography>
              </MenuItem>
            )}
          </MenuList>
        </Box>

        {/* Footer */}
        <Box sx={{ p: 2, borderTop: "1px solid #eee" }}>
          <Button
            fullWidth
            variant="contained"
            sx={{
              bgcolor: "#145de9",
              textTransform: "none",
              fontWeight: 600,
              "&:hover": { bgcolor: "#2469eb" },
            }}
            onClick={onViewAll}
          >
            View All {name}
          </Button>
        </Box>
      </Popover>
    </>
  );
}
export function Header() {
  const navigate = useNavigate();
  return (
    <header className="p-4 w-full flex justify-between items-center">
      {/* <Input
          disableUnderline
          sx={{ bgcolor: "white", padding: 1, borderRadius: 3, width: "40vw" }}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        /> */}
      <div className="flex w-xl gap-5  items-center">
        <OrganizationDropdown
          organizations={organizations}
          name="Organizations"
          onViewAll={() => navigate("/organizationoverview")}
        />
        <OrganizationDropdown
          organizations={organizations}
          name="Projects"
          onViewAll={() => navigate("/organizationoverview")}
        />
      </div>
      <div className="flex gap-2.5 items-center">
        <NotificationsIcon sx={{ color: "white" }} />
        <Avatar {...stringAvatar("Kent Dodds")} />
      </div>
    </header>
  );
}
