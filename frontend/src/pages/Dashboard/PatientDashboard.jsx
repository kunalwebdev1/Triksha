import React from "react";
import { Box, Typography, Grid } from "@mui/material";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { UserSidebar } from "../../components/layout/Navbar";
import HeaderBar from "../../components/layout/Header";

const PatientDashboard = () => (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <HeaderBar />
    <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
      <UserSidebar />
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
          Good Morning<br />
          <span style={{ color: "#444", fontWeight: 600 }}>Mitendra Singh</span>
        </Typography>
        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard title="Today's Appointments" value={1} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard title="Upcoming Appointments" value={2} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard title="Total Appointments" value={5} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard title="Nearby HealthCare Providers" value="4" />
          </Grid>
        </Grid>
        <Typography variant="h6" mt={4} mb={2} sx={{ color: "#333" }}>
          Recent Activity
        </Typography>
        {/* ...Recent activity list... */}
        <Typography variant="h6" mt={4} mb={2} sx={{ color: "#333" }}>
          Quick Actions
        </Typography>
        {/* ...Quick actions grid... */}
      </Box>
    </Box>
  </Box>
);

export default PatientDashboard;