import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
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

const DoctorsPage = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("triksha_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Mock doctors list (replace with API later)
  useEffect(() => {
    const mockDoctors = [
      {
        id: 1,
        name: "Dr. Tanya Gupta",
        speciality: "Cardiologist",
        hospital: "GLB Hospital",
        city: "Mathura",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 2,
        name: "Dr. Rahul Sharma",
        speciality: "Neurologist",
        hospital: "City Care Hospital",
        city: "Agra",
        image: "https://via.placeholder.com/150",
      },
      {
        id: 3,
        name: "Dr. Neha Verma",
        speciality: "Dermatologist",
        hospital: "Skin & Hair Clinic",
        city: "Delhi",
        image: "https://via.placeholder.com/150",
      },
    ];
    setDoctors(mockDoctors);
    setFilteredDoctors(mockDoctors);
  }, []);

  // Search doctors by query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredDoctors(doctors);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredDoctors(
        doctors.filter(
          (doc) =>
            doc.name.toLowerCase().includes(query) ||
            doc.speciality.toLowerCase().includes(query) ||
            doc.city.toLowerCase().includes(query)
        )
      );
    }
  }, [searchQuery, doctors]);

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderBar userName={user?.name || "Guest"} />
      <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
        <RoleBasedSidebar role={user.role} />
        <Box
          sx={{
            flex: 1,
            p: { xs: 2, md: 4 },
            background: "#FFF6FA",
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={3}>
            Find Doctors
          </Typography>

          {/* Search */}
          <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
            <TextField
              placeholder="Search by name, speciality or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              fullWidth
              size="small"
            />
            <Button
              variant="contained"
              sx={{ background: "#B2005E", color: "#fff" }}
              onClick={() => setSearchQuery("")}
            >
              Clear
            </Button>
          </Box>

          {/* Doctor Cards */}
          <Grid container spacing={3}>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      transition: "0.3s",
                      "&:hover": { transform: "scale(1.03)" },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="160"
                      image={doctor.image}
                      alt={doctor.name}
                      sx={{ borderRadius: "12px 12px 0 0" }}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight={700}>
                        {doctor.name}
                      </Typography>
                      <Typography color="text.secondary">
                        {doctor.speciality}
                      </Typography>
                      <Typography variant="body2" mt={1}>
                        {doctor.hospital}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {doctor.city}
                      </Typography>
                      <Button
                        variant="outlined"
                        sx={{ mt: 2, borderColor: "#B2005E", color: "#B2005E" }}
                        fullWidth
                      >
                        View Profile
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))
            ) : (
              <Typography>No doctors found.</Typography>
            )}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorsPage;
