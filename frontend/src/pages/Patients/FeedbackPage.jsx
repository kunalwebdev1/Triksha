import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Rating,
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

const FeedbackPage = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);

  // Load user and mocked doctors
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("triksha_user"));
    if (storedUser) setUser(storedUser);

    // Mock doctors list
    setDoctors([
      { id: 1, name: "Dr. Tanya Gupta" },
      { id: 2, name: "Dr. Rahul Sharma" },
      { id: 3, name: "Dr. Neha Verma" },
    ]);

    // Mock feedback history
    setFeedbacks([
      {
        id: 1,
        doctor: "Dr. Tanya Gupta",
        rating: 5,
        comment: "Very professional and attentive.",
      },
      {
        id: 2,
        doctor: "Dr. Rahul Sharma",
        rating: 4,
        comment: "Good doctor, explained everything clearly.",
      },
    ]);
  }, []);

  if (!user) return <Typography>Loading...</Typography>;
  if (user.role !== "Patient")
    return (
      <Typography variant="h6" color="error" sx={{ mt: 4, textAlign: "center" }}>
        Not authorized. Only patients can give feedback.
      </Typography>
    );

  const handleSubmitFeedback = () => {
    if (!selectedDoctor || rating === 0 || !comment.trim()) return;

    const newFeedback = {
      id: feedbacks.length + 1,
      doctor: selectedDoctor,
      rating,
      comment,
    };
    setFeedbacks([newFeedback, ...feedbacks]);
    setSelectedDoctor("");
    setRating(0);
    setComment("");
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderBar userName={user?.name || "Guest"} />
      <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
        <RoleBasedSidebar role={user.role} />
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, background: "#FFF6FA" }}>
          <Typography variant="h5" fontWeight={700} mb={3}>
            Give Feedback to Doctors
          </Typography>

          <Card sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  select
                  fullWidth
                  label="Select Doctor"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                  size="Large"
                >
                  {doctors.map((doc) => (
                    <MenuItem key={doc.id} value={doc.name}>
                      {doc.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={4}>
                <Typography component="legend">Rating</Typography>
                <Rating
                  name="doctor-rating"
                  value={rating}
                  onChange={(event, newValue) => setRating(newValue)}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  size="small"
                />
              </Grid>

              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ background: "#B2005E", color: "#fff" }}
                  onClick={handleSubmitFeedback}
                >
                  Submit Feedback
                </Button>
              </Grid>
            </Grid>
          </Card>

          <Typography variant="h6" mb={2}>
            Feedback History
          </Typography>
          <List>
            {feedbacks.length > 0 ? (
              feedbacks.map((fb) => (
                <ListItem key={fb.id} sx={{ mb: 1, bgcolor: "#fff", borderRadius: 2 }}>
                  <ListItemText
                    primary={`${fb.doctor} - ${fb.rating} ⭐`}
                    secondary={fb.comment}
                  />
                </ListItem>
              ))
            ) : (
              <Typography>No feedback yet.</Typography>
            )}
          </List>
        </Box>
      </Box>
    </Box>
  );
};

export default FeedbackPage;
