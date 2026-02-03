import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          color: "#0f172a",
        }}
      >
        <Toolbar>
          {/* Left Icon */}
          <IconButton edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ flexGrow: 1, letterSpacing: 1 }}
          >
            Product Dashboard
          </Typography>

          {/* Avatar */}
          <IconButton onClick={handleMenuOpen}>
            <Avatar
              sx={{
                bgcolor: "rgba(56,189,248,0.8)",
                backdropFilter: "blur(10px)",
              }}
            >
              <AccountCircleIcon />
            </Avatar>
          </IconButton>

          {/* Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 180,
                background: "rgba(255,255,255,0.7)",
                backdropFilter: "blur(12px)",
                borderRadius: 3,
                boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <MenuItem onClick={() => navigate("/profile")}>
              <PersonIcon fontSize="small" sx={{ mr: 1 }} />
              Profile
            </MenuItem>

            <MenuItem onClick={() => navigate("/settings")}>
              <SettingsIcon fontSize="small" sx={{ mr: 1 }} />
              Settings
            </MenuItem>

            <Divider />

            <MenuItem onClick={handleMenuClose} sx={{ color: "error.main" }}>
              <LogoutIcon fontSize="small" sx={{ mr: 1 }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Spacer */}
      <Toolbar />
    </>
  );
};

export default Navbar;
