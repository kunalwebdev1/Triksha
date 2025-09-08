import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Button } from "@mui/material";
import image from "../../assets/logos/logo-3.png";

const Splash = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F7CFE1",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
      }}
    >
      <img
        src={image}
        alt="Triksha Logo"
        style={{ width: "500px", marginBottom: -180, marginTop: -180 }}
      />
      <Typography
        variant="subtitle1"
        sx={{
          color: "#222",
          fontSize: "1.2rem",
          mb: 2,
        }}
      >
        Synced. <b>Simplified.</b> Secured
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#8a004a",
          mb: 3,
        }}
      >
        Your all-in-one healthcare platform.
      </Typography>
      <Button
        variant="contained"
        onClick={handleGetStarted}
        sx={{
          backgroundColor: "#B2005E",
          color: "#fff",
          fontWeight: "bold",
          px: 4,
          py: 1.5,
          borderRadius: 2,
          fontSize: "1rem",
          boxShadow: 2,
          "&:hover": {
            backgroundColor: "#8a004a",
          },
        }}
      >
        Get Started
      </Button>
      <Button
        variant="text"
        onClick={() => navigate("/login")}
        sx={{
          mt: 1,
          color: "#B2005E",
          fontWeight: "bold",
          textTransform: "none",
        }}
      >
        Already have an account? Log in
      </Button>
    </Box>
  );
};

export default Splash;