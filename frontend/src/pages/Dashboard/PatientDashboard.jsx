import React from "react";
import DashboardCard from "../../components/dashboard/DashboardCard";
import StatsWidget from "../../components/dashboard/StatsWidget";
import { Grid, Typography } from "@mui/material";

const PatientDashboard = () => (
  <>
    <Typography variant="h4" gutterBottom>
      Patient Dashboard
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <DashboardCard title="My Records" content="View your health records." />
      </Grid>
      <Grid item xs={12} md={6}>
        <StatsWidget title="Upcoming Appointments" value="3" />
      </Grid>
    </Grid>
  </>
);

export default PatientDashboard;
