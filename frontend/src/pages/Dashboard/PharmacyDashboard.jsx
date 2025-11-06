import React, {useContext} from "react";
import { Box, Typography, Grid } from "@mui/material";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { PharmacySidebar } from "../../components/layout/Navbar";
import HeaderBar from "../../components/layout/Header";
import { AuthContext } from "../../context/AuthContext";

const PharmacyDashboard = () => {
  const { user } = useContext(AuthContext);
  return (
  <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
    <HeaderBar userName={user?.name || user?.email} />
    <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
        <PharmacySidebar />
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
          Greetings <br />
          <span style={{ color: "#444", fontWeight: 600 }}>
            {user?.name || "Guest"}
          </span>
        </Typography>

        <Grid container spacing={2} mb={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard title="Drugs" value={759} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard title="Patients" value={2000} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard title="Today's Stock" value={3509} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DashboardCard title="Revenue This month" value={250000} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Box>
);
};

export default PharmacyDashboard;
