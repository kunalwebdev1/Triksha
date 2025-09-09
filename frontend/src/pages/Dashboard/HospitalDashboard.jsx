import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { HospitalSidebar } from "../../components/layout/Navbar";

const HospitalDashboard = () => (
  <Box
    sx={{
      display: "flex",
      minHeight: "100vh",
      background: "#FFF6FA",
      flexDirection: { xs: "column", md: "row" },
    }}
  >
    <HospitalSidebar />
    <Box
      sx={{
        flex: 1,
        p: { xs: 2, md: 4 },
        width: "100%",
        minWidth: 0,
        mt: { xs: 6, md: 0 }, 
      }}
    >
      <Typography
        variant="h5"
        fontWeight={700}
        mb={2}
        sx={{ color: "#222", fontSize: { xs: 22, sm: 26 } }}
      >
        Good Morning<br />
        <span style={{ color: "#444", fontWeight: 600 }}>Hospital Admin</span>
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="New Admissions" value={12} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Discharges" value={8} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Available Beds" value={34} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Staff On Duty" value={15} />
        </Grid>
      </Grid>
      {/* Add more hospital-specific sections here */}
    </Box>
  </Box>
);

export default HospitalDashboard;