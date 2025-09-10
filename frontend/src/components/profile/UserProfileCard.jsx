import React, { useContext } from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import { UserSidebar } from "../../components/layout/Navbar";
import HeaderBar from "../../components/layout/Header";
import { AuthContext } from "../../context/AuthContext";

const UserProfileCard = ({ name, email, role }) => (
  <Card sx={{ p: 2, boxShadow: 3, borderRadius: 1 }}>
    <CardContent sx={{ textAlign: "center" }}>
      <Avatar
        sx={{
          width: 80,
          height: 80,
          mb: 2,
          mx: "auto",
          bgcolor: "primary.main",
          fontSize: 28,
        }}
      >
        {name?.charAt(0) || "G"}
      </Avatar>
      <Typography variant="h6" fontWeight={700}>
        {name || "Guest"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {email || "guest@example.com"}
      </Typography>
      <Typography
        variant="caption"
        sx={{ mt: 1, display: "block", color: "primary.main" }}
      >
        {role || "User"}
      </Typography>
    </CardContent>
  </Card>
);

const UserProfilePage = () => {
  const { user } = useContext(AuthContext); // Get user from context

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Header with dynamic user name */}
      <HeaderBar userName={user?.name || user?.email || "Guest"} />

      {/* Sidebar + Main Content */}
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
          {/* Greeting */}
          <Typography
            variant="h5"
            fontWeight={700}
            mb={3}
            sx={{ color: "#222", fontSize: { xs: 22, sm: 26 } }}
          >
            Greetings <br />
            <span style={{ color: "#444", fontWeight: 600 }}>
              {user?.name || "Guest"}
            </span>
          </Typography>

          {/* Profile + Activity */}
          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={4}>
              <UserProfileCard
                name={user?.name}
                email={user?.email}
                role={user?.role}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3, borderRadius: 1 }}>
                <Typography variant="h6" mb={2}>
                  Recent Activity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Logged in today at 9:00 AM <br />
                  • Updated profile yesterday <br />
                  • Booked 2 appointments last week
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Quick Actions */}
          <Typography variant="h6" mb={2}>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <Typography fontWeight={600}>New Appointment</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <Typography fontWeight={600}>View Reports</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <Typography fontWeight={600}>Update Profile</Typography>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <Typography fontWeight={600}>Settings</Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfilePage;
