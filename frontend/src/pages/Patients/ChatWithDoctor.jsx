import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Grid,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import {
  UserSidebar,
  DoctorSidebar,
  HospitalSidebar,
  LabSidebar,
  InsuranceSidebar,
} from "../../components/layout/Navbar";
import HeaderBar from "../../components/layout/Header";

// Sidebar based on user role
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

// Simulated AI doctor response
const generateDoctorResponse = (text) => {
  return `Dr. Response: Based on your message "${text}", please follow the instructions carefully and consult if needed.`;
};

const DoctorsChatPage = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load logged-in user
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("triksha_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Mock doctors
  useEffect(() => {
    const mockDoctors = [
      { id: 1, name: "Dr. Tanya Gupta", speciality: "Cardiologist", image: "https://via.placeholder.com/150" },
      { id: 2, name: "Dr. Rahul Sharma", speciality: "Neurologist", image: "https://via.placeholder.com/150" },
      { id: 3, name: "Dr. Neha Verma", speciality: "Dermatologist", image: "https://via.placeholder.com/150" },
    ];
    setDoctors(mockDoctors);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleChatRequest = (doctor) => {
    setSelectedDoctor(doctor);
    setMessages([
      {
        type: "system",
        content: `You are now chatting with ${doctor.name} (${doctor.speciality})`,
        time: new Date(),
      },
    ]);
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { type: "user", content: inputText, time: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setLoading(true);

    setTimeout(() => {
      const aiMessage = { type: "doctor", content: generateDoctorResponse(inputText), time: new Date() };
      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 800);
  };

  const handleDownload = () => {
    const text = messages.map((msg) => `[${msg.type.toUpperCase()}] ${msg.content}`).join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `chat_with_${selectedDoctor?.name || "doctor"}_${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!user) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <HeaderBar userName={user?.name || "Guest"} />
      <Box sx={{ display: "flex", flex: 1, pt: "64px" }}>
        <RoleBasedSidebar role={user.role} />
        <Box sx={{ flex: 1, p: { xs: 2, md: 4 }, background: "#FFF6FA" }}>
          <Typography variant="h5" fontWeight={700} mb={3}>
            Doctors
          </Typography>

          {!selectedDoctor && (
            <Grid container spacing={3}>
              {doctors.map((doctor) => (
                <Grid item xs={12} sm={6} md={4} key={doctor.id}>
                  <Card sx={{ borderRadius: 1, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
                    <CardMedia component="img" height="160" image={doctor.image} alt={doctor.name} />
                    <CardContent>
                      <Typography variant="h6">{doctor.name}</Typography>
                      <Typography color="text.secondary">{doctor.speciality}</Typography>
                      <Button
                        variant="contained"
                        sx={{ mt: 2, background: "#B2005E", color: "#fff" }}
                        fullWidth
                        onClick={() => handleChatRequest(doctor)}
                      >
                        Chat Request
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}

          {selectedDoctor && (
            <>
              <Button
                variant="contained"
                sx={{ mb: 2, background: "#B2005E", color: "#fff" }}
                onClick={handleDownload}
              >
                Download Chat
              </Button>

              <Card sx={{ p: 3, borderRadius: 1, flex: 1, display: "flex", flexDirection: "column", minHeight: 500 }}>
                <Box sx={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                  {messages.map((msg, idx) => (
                    <Paper
                      key={idx}
                      sx={{
                        alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                        background:
                          msg.type === "user" ? "#F7CFE1" : msg.type === "doctor" ? "#E0F7FA" : "#FFF3E0",
                        p: 2,
                        maxWidth: "80%",
                        borderRadius: 2,
                        whiteSpace: "pre-line",
                      }}
                    >
                      <Typography fontSize={14}>{msg.content}</Typography>
                      <Typography fontSize={10} color="text.secondary" textAlign="right">
                        {msg.time?.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </Typography>
                    </Paper>
                  ))}

                  {loading && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CircularProgress size={18} />
                      <Typography fontSize={12}>Doctor is typing...</Typography>
                    </Box>
                  )}

                  <div ref={messagesEndRef}></div>
                </Box>

                <Box sx={{ mt: 2, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 1 }}>
                  <TextField
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <Button
                    variant="contained"
                    sx={{ background: "#B2005E", color: "#fff", fontWeight: 600 }}
                    onClick={handleSendMessage}
                    disabled={loading}
                  >
                    Send
                  </Button>
                </Box>
              </Card>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorsChatPage;
