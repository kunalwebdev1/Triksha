import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
} from "@mui/material";
import {
  UserSidebar,
  DoctorSidebar,
  HospitalSidebar,
  LabSidebar,
  InsuranceSidebar,
} from "../../components/layout/Navbar";
import HeaderBar from "../../components/layout/Header";

// Sidebar based on role
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
    case "Insurance TPA":
      return <InsuranceSidebar />;
    default:
      return <UserSidebar />;
  }
};

const MedicalHistoryPage = () => {
  const [user, setUser] = useState(null);
  const [records, setRecords] = useState([]);

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("triksha_user"));
    if (storedUser) setUser(storedUser);

    // Mock medical history
    setRecords([
      {
        id: 1,
        doctor: "Dr. Tanya Gupta",
        diagnosis: "High Blood Pressure",
        prescription: "Amlodipine 5mg once daily",
        date: "2025-05-12",
      },
      {
        id: 2,
        doctor: "Dr. Rahul Sharma",
        diagnosis: "Migraine",
        prescription: "Paracetamol 500mg as needed",
        date: "2025-06-20",
      },
      {
        id: 3,
        doctor: "Dr. Neha Verma",
        diagnosis: "Skin Allergy",
        prescription: "Hydrocortisone cream twice daily",
        date: "2025-07-15",
      },
    ]);
  }, []);

  if (!user) return <Typography>Loading...</Typography>;
  if (user.role !== "Patient")
    return (
      <Typography variant="h6" color="error" sx={{ mt: 4, textAlign: "center" }}>
        Not authorized. Only patients can view medical history.
      </Typography>
    );

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderBar userName={user?.name || "Guest"} />
      <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
        <RoleBasedSidebar role={user.role} />
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, background: "#FFF6FA" }}>
          <Typography variant="h5" fontWeight={700} mb={3}>
            My Medical History
          </Typography>

          <Grid container spacing={3}>
            {records.length > 0 ? (
              records.map((record) => (
                <Grid item xs={12} sm={6} md={4} key={record.id}>
                  <Card sx={{ borderRadius: 2, p: 2, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <CardContent>
                      <Typography variant="h6" fontWeight={600}>
                        {record.doctor}
                      </Typography>
                      <Typography color="text.secondary" mb={1}>
                        {record.date}
                      </Typography>
                      <Typography variant="body2" mb={1}>
                        <strong>Diagnosis:</strong> {record.diagnosis}
                      </Typography>
                      <Typography variant="body2" mb={2}>
                        <strong>Prescription:</strong> {record.prescription}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{ color: "#B2005E", borderColor: "#B2005E" }}
                        fullWidth
                      >
                        View Details
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography color="text.secondary">No medical history found.</Typography>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default MedicalHistoryPage;
