import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  InputBase,
  Box,
  Badge,
  Avatar,
  useMediaQuery,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import TipsAndUpdatesIcon from "@mui/icons-material/TipsAndUpdates";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import logo from "../../assets/logos/Triksha-text.png";
import { useNavigate } from "react-router-dom";

export default function HeaderBar({ userName = "Kunal" }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const userInitial = userName.charAt(0).toUpperCase();

  const navigate = useNavigate();

  // State for menu
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
        sx={{
          background: "#fff",
          color: "#000",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderRadius: 0,
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            py: 1,
            minHeight: 50,
          }}
        >
          {/* Left side (Search for desktop) */}
          <Box sx={{ flex: 1, display: "flex", alignItems: "center" }}>
            {!isMobile && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  position: "relative",
                  borderRadius: "50px",
                  backgroundColor: "rgba(0,0,0,0.05)",
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.1)" },
                  width: "50%",
                  ml: 2,
                  mr: 2,
                }}
              >
                <Box
                  sx={{
                    p: "0 8px",
                    height: "100%",
                    position: "absolute",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <SearchIcon />
                </Box>
                <InputBase
                  placeholder="Search…"
                  sx={{
                    color: "primary",
                    width: "100%",
                    pl: 4,
                    pr: 1,
                    py: 1,
                  }}
                />
              </Box>
            )}
          </Box>

          {/* Centered Logo */}
          <Box sx={{ flexShrink: 0, display: "flex", justifyContent: "center" }}>
            <img src={logo} alt="Triksha Logo" style={{ width: 125 }} />
          </Box>

          {/* Right side (Icons, AI Button, Avatar) */}
          <Box
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 2,
            }}
          >
            {isMobile && (
              <IconButton color="primary:main">
                <SearchIcon />
              </IconButton>
            )}

            {/* Notifications */}
            <IconButton
              color="primary:main"
              onClick={() => navigate("/notifications")}
            >
              <Badge badgeContent={0} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>

            {/* AI Page */}
            <IconButton
              variant="text"
              type="button"
              onClick={() => navigate("/ai")}
              color="primary"
            >
              <TipsAndUpdatesIcon />
            </IconButton>

            {/* Avatar with Menu */}
            <IconButton onClick={handleMenuOpen}>
              <Avatar sx={{ bgcolor: "primary:main" }}>{userInitial}</Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { mt: 1.5, borderRadius: 0.5 },
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
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/profile");
                }}
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  navigate("/settings");
                }}
              >
                Settings
              </MenuItem>
              <Divider />
              <MenuItem
                onClick={() => {
                  handleMenuClose();
                  // Replace this with your logout logic
                  navigate("/logout");
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </AppBar>
    </>
  );
}
