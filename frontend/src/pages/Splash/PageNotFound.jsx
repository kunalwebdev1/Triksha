import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { CaregiverSidebar } from "../../components/layout/Navbar";
import HeaderBar from "../../components/layout/Header";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header */}
      <HeaderBar userName={user?.name || user?.email || "Guest"} />

      {/* Sidebar + Main */}
      <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>

        <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            width: "100%",
            minWidth: 0,
            background: "#FFF6FA",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h2"
            fontWeight={700}
            sx={{ color: "#222", fontSize: { xs: 60, sm: 100 }, mb: 2 }}
          >
            404
          </Typography>

          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ color: "#444", mb: 2 }}
          >
            Page Not Found
          </Typography>

          <Typography variant="body1" sx={{ color: "#666", mb: 4 }}>
            Sorry, the page you are looking for doesn’t exist or has been moved.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/dashboard")}
          >
            Go Back Home
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
