import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { DoctorSidebar} from "../../components/layout/Navbar";

const DoctorDashboard = () => (
  <Box
    sx={{
      display: "flex",
      minHeight: "100vh",
      background: "#FFF6FA",
      flexDirection: { xs: "column", md: "row" },
    }}
  >
    <DoctorSidebar />
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
        <span style={{ color: "#444", fontWeight: 600 }}>Dr. Anupam Kumar</span>
      </Typography>
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="New Patients" value={125} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="OPD Patients" value={218} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Today's Operations" value={25} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DashboardCard title="Visitors" value={2479} />
        </Grid>
      </Grid>
      {/* Add more doctor-specific sections here */}
    </Box>
  </Box>
);

export default DoctorDashboard;