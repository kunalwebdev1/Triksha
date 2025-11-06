import React,  { useContext } from "react";
import { Box, Typography, Grid } from "@mui/material";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { HospitalSidebar } from "../../components/layout/Navbar";
import HeaderBar from "../../components/layout/Header";
import { AuthContext } from "../../context/AuthContext";

const HospitalDashboard = () => {
  const { user } = useContext(AuthContext);
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <HeaderBar userName={user?.name || user?.email} />
      <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
        <HospitalSidebar />
            <Box
              sx={{
                flex: 1,
                p: { xs: 2, md: 4 },
                width: "100%",
                minWidth: 0,
                background: "#FFF6FA",
              }}
            >
          <Typography
            variant="h5"
            fontWeight={700}
            mb={2}
            sx={{ color: "#222", fontSize: { xs: 22, sm: 26 } }}
          >
            Greetings<br />
            <span style={{ color: "#444", fontWeight: 600 }}>
              {user?.name || "Guest"}
            </span>
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
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Dcotors On Duty" value={25} />
            </Grid>
          </Grid>
          {/* Add more hospital-specific sections here */}
        </Box>
      </Box>
    </Box>
  );
};

export default HospitalDashboard;