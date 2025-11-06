import React, { useEffect, useState } from "react";
import { Box, Typography, Grid, Card, CardContent, Avatar } from "@mui/material";
import {
  UserSidebar,
  DoctorSidebar,
  CaregiverSidebar,
  HospitalSidebar,
  PharmacySidebar,
  LabSidebar,
  InsuranceSidebar,
} from "../../components/layout/Navbar";
import HeaderBar from "../../components/layout/Header";

const UserProfileCard = ({ user }) => (
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
        {user?.name?.charAt(0) || "G"}
      </Avatar>
      <Typography variant="h6" fontWeight={700}>
        {user?.name || "Guest"}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {user?.email || "guest@example.com"}
      </Typography>
      <Typography
        variant="caption"
        sx={{ mt: 1, display: "block", color: "primary.main" }}
      >
        {user?.role || "User"}
      </Typography>
      <Box sx={{ mt: 2, textAlign: "left" }}>
        <Typography variant="body2"><b>Phone:</b> {user?.phone || "-"}</Typography>
        <Typography variant="body2"><b>Gender:</b> {user?.gender || "-"}</Typography>
        <Typography variant="body2"><b>Speciality:</b> {user?.speciality || "-"}</Typography>
        <Typography variant="body2"><b>Hospital Name:</b> {user?.hospital_name || "-"}</Typography>
        <Typography variant="body2"><b>Lab Name:</b> {user?.lab_name || "-"}</Typography>
        <Typography variant="body2"><b>Experience:</b> {user?.experience || "-"}</Typography>
        <Typography variant="body2"><b>City:</b> {user?.city || "-"}</Typography>
        <Typography variant="body2"><b>District:</b> {user?.district || "-"}</Typography>
        <Typography variant="body2"><b>State:</b> {user?.state || "-"}</Typography>
        <Typography variant="body2"><b>PIN:</b> {user?.pin || "-"}</Typography>
      </Box>
    </CardContent>
  </Card>
);

const RoleBasedSidebar = ({ role }) => {
  switch (role) {
    case "Doctor":
      return <DoctorSidebar />;
    case "Hospital":
    case "Clinic":
    case "Hospital/Clinic Admin":
      return <HospitalSidebar />;
    case "Laboratory Admin":
      return <LabSidebar />;
    case "Pharmacy Admin":
      return <PharmacySidebar />;
    case "Caregiver":
      return <CaregiverSidebar />;
    case "Insurance TPA":
      return <InsuranceSidebar />;
    default:
      return <UserSidebar />; // fallback = patient/user
  }
};

const UserProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load full user object from localStorage
    const storedUser = JSON.parse(localStorage.getItem("triksha_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderBar userName={user?.name || user?.email || "Guest"} />

      <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
        <RoleBasedSidebar role={user?.role} />

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
            mb={3}
            sx={{ color: "#222", fontSize: { xs: 22, sm: 26 } }}
          >
            Greetings <br />
            <span style={{ color: "#444", fontWeight: 600 }}>
              {user?.name || "Guest"}
            </span>
          </Typography>

          <Grid container spacing={3} mb={4}>
            <Grid item xs={12} md={4}>
              <UserProfileCard user={user} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Card sx={{ p: 3, borderRadius: 1 }}>
                <Typography variant="h6" mb={2}>
                  Recent Activity
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  • Logged in today <br />
                  • Updated profile recently <br />
                  • Booked appointments
                </Typography>
              </Card>
            </Grid>
          </Grid>

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
