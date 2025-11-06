import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  List,
  ListItem,
  ListItemText,
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

const EmergencyServicesPage = () => {
  const [user, setUser] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("triksha_user"));
    if (storedUser) setUser(storedUser);

    // Mock nearby hospitals
    setHospitals([
      { id: 1, name: "GLB Hospital", city: "Mathura", phone: "0565-123456" },
      { id: 2, name: "City Care Hospital", city: "Agra", phone: "0562-654321" },
      { id: 3, name: "Safe Life Clinic", city: "Delhi", phone: "011-987654" },
    ]);

    // Mock emergency contacts
    setContacts([
      { id: 1, name: "Police", phone: "100" },
      { id: 2, name: "Ambulance", phone: "102" },
      { id: 3, name: "Fire Brigade", phone: "101" },
    ]);
  }, []);

  if (!user) return <Typography>Loading...</Typography>;
  if (user.role !== "Patient")
    return (
      <Typography
        variant="h6"
        color="error"
        sx={{ mt: 4, textAlign: "center" }}
      >
        Not authorized. Only patients can access Emergency Services.
      </Typography>
    );

  const handleCall = (number) => {
    window.location.href = `tel:${number}`;
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderBar userName={user?.name || "Guest"} />
      <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
        <RoleBasedSidebar role={user.role} />
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, background: "#FFF6FA" }}>
          <Typography variant="h5" fontWeight={700} mb={3}>
            Emergency Services
          </Typography>

          {/* Emergency Call Button */}
          <Button
            variant="contained"
            color="error"
            sx={{ mb: 4 }}
            onClick={() => handleCall("102")}
          >
            Call Ambulance Now
          </Button>

          {/* Nearby Hospitals */}
          <Typography variant="h6" mb={2}>
            Nearby Hospitals
          </Typography>
          <Grid container spacing={3} mb={4}>
            {hospitals.map((hospital) => (
              <Grid item xs={12} sm={6} md={4} key={hospital.id}>
                <Card sx={{ borderRadius: 2, p: 2 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>
                      {hospital.name}
                    </Typography>
                    <Typography color="text.secondary">{hospital.city}</Typography>
                    <Button
                      variant="outlined"
                      sx={{ mt: 2 }}
                      onClick={() => handleCall(hospital.phone)}
                    >
                      Call {hospital.phone}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Emergency Contacts */}
          <Typography variant="h6" mb={2}>
            Emergency Contacts
          </Typography>
          <List>
            {contacts.map((contact) => (
              <ListItem
                key={contact.id}
                secondaryAction={
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleCall(contact.phone)}
                  >
                    Call
                  </Button>
                }
              >
                <ListItemText primary={contact.name} secondary={contact.phone} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default EmergencyServicesPage;
