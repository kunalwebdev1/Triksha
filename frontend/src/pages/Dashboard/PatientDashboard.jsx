import React, { useContext } from "react";
import { Box, Typography, Grid, Card, CardContent } from "@mui/material";
import DashboardCard from "../../components/dashboard/DashboardCard";
import { UserSidebar } from "../../components/layout/Navbar";
import HeaderBar from "../../components/layout/Header";
import { AuthContext } from "../../context/AuthContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PatientDashboard = () => {
  const { user } = useContext(AuthContext);
  const stepsData = [
    { day: "Mon", steps: 4500 },
    { day: "Tue", steps: 7000 },
    { day: "Wed", steps: 8200 },
    { day: "Thu", steps: 6200 },
    { day: "Fri", steps: 9000 },
    { day: "Sat", steps: 10000 },
    { day: "Sun", steps: 7500 },
  ];

  const waterData = [
    { name: "Consumed", value: 6 },
    { name: "Remaining", value: 2 },
  ];
  const COLORS = ["#0088FE", "#E0E0E0"];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderBar userName={user?.name || user?.email} />
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
            Greetings <br />
            <span style={{ color: "#444", fontWeight: 600 }}>
              {user?.name || "Guest"}
            </span>
          </Typography>

          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Today's Appointments" value={0} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Upcoming Appointments" value={0} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Total Appointments" value={5} />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Nearby HealthCare Providers" value="40" />
            </Grid>
          </Grid>

          <Typography variant="h6" mt={4} mb={2} sx={{ color: "#333" }}>
            Wellness Reminder
          </Typography>
          <Grid container spacing={2} mb={3}>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Medication Reminders" value="2 due today" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Water Intake" value="5/8 glasses" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Exercise Goal" value="6,200 / 10,000 steps" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Sleep Tracker" value="7 hrs (Target: 8 hrs)" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Upcoming Checkups" value="1 due this week" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Diet Reminder" value="1 meal logged" />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <DashboardCard title="Mental Wellness" value="Meditation: 5 mins" />
            </Grid>
          </Grid>

          <Typography variant="h6" mt={4} mb={2} sx={{ color: "#333" }}>
            Wellness Tracker
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              mb: 3,
            }}
          >
            {/* Steps Line Chart */}
            <Card sx={{ flex: "1 1 300px", p: 2, height: 250 }}>
              <CardContent>
                <Typography variant="subtitle1">Steps This Week</Typography>
                <ResponsiveContainer width="100%" height={150}>
                  <LineChart data={stepsData}>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="steps" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Water Intake Pie Chart */}
            <Card sx={{ flex: "1 1 300px", p: 2, height: 250 }}>
              <CardContent>
                <Typography variant="subtitle1">Water Intake</Typography>
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie
                      data={waterData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {waterData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <Typography align="center" mt={1}>
                  6/8 Glasses
                </Typography>
              </CardContent>
            </Card>

            {/* Sleep Bar Chart */}
            <Card sx={{ flex: "1 1 300px", p: 2, height: 250 }}>
              <CardContent>
                <Typography variant="subtitle1">Sleep Tracker</Typography>
                <ResponsiveContainer width="100%" height={150}>
                  <BarChart
                    data={[
                      { day: "Mon", hrs: 6 },
                      { day: "Tue", hrs: 7 },
                      { day: "Wed", hrs: 8 },
                      { day: "Thu", hrs: 5 },
                      { day: "Fri", hrs: 7 },
                      { day: "Sat", hrs: 9 },
                      { day: "Sun", hrs: 6 },
                    ]}
                  >
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="hrs" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </Box>

          <Typography variant="h6" mt={4} mb={2} sx={{ color: "#333" }}>
            Lab Reports
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
        </Box>
      </Box>
    </Box>
  );
};

export default PatientDashboard;
