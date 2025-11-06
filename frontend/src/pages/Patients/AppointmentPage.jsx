import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
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

const AppointmentPage = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [notes, setNotes] = useState("");

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("triksha_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Mock doctors list (replace with API later)
  useEffect(() => {
    const mockDoctors = [
      { id: 1, name: "Dr. Tanya Gupta", speciality: "Cardiologist" },
      { id: 2, name: "Dr. Rahul Sharma", speciality: "Neurologist" },
      { id: 3, name: "Dr. Neha Verma", speciality: "Dermatologist" },
    ];
    setDoctors(mockDoctors);
  }, []);

  // Book appointment
  const handleBookAppointment = () => {
    if (!selectedDoctor || !date || !time) {
      alert("Please fill all required fields!");
      return;
    }

    const appointment = {
      patient: user?.name,
      doctor: doctors.find((doc) => doc.id === selectedDoctor)?.name,
      speciality: doctors.find((doc) => doc.id === selectedDoctor)?.speciality,
      date: date.toDateString(),
      time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      notes,
    };

    console.log("Appointment Booked:", appointment);
    alert(`✅ Appointment booked with ${appointment.doctor} on ${appointment.date} at ${appointment.time}`);
  };

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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={3}>
            Book Appointment
          </Typography>

          <Card sx={{ maxWidth: 600, width: "100%", borderRadius: 3, p: 3 }}>
            <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {/* Select Doctor */}
              <TextField
                select
                label="Select Doctor"
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                fullWidth
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor.id} value={doctor.id}>
                    {doctor.name} — {doctor.speciality}
                  </MenuItem>
                ))}
              </TextField>

              {/* Date & Time Picker */}
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Select Date"
                      value={date}
                      onChange={(newDate) => setDate(newDate)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TimePicker
                      label="Select Time"
                      value={time}
                      onChange={(newTime) => setTime(newTime)}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>

              {/* Notes */}
              <TextField
                label="Reason / Notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                multiline
                rows={3}
                fullWidth
              />

              {/* Book Button */}
              <Button
                variant="contained"
                sx={{
                  background: "#B2005E",
                  color: "#fff",
                  fontWeight: 600,
                  mt: 2,
                }}
                onClick={handleBookAppointment}
              >
                Book Appointment
              </Button>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AppointmentPage;
