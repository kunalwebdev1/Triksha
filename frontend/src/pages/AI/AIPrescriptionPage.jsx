import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Typography,
  Card,
  Paper,
  TextField,
  Button,
  Input,
  CircularProgress,
} from "@mui/material";
import Tesseract from "tesseract.js";

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

// Local AI simulation functions
const generateAnalyzerResponse = (text) => {
  // Simple patient-friendly analysis
  const lines = text.split("\n").filter(Boolean);
  return `Patient Summary:\n- Number of items detected: ${lines.length}\n- Key info: ${lines.slice(0, 3).join(", ")}\n- Follow instructions carefully.`;
};

const generateWriterResponse = (text) => {
  // Simple prescription writer template
  return `Prescription:\n- Patient Name: ${text.split("\n")[0] || "Unknown"}\n- Medicines: ${text.split("\n").slice(1).join(", ")}\n- Dosage: Follow instructions\n- Notes: Check allergies`;
};

const AIPrescriptionChatPage = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Load user data
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("triksha_user"));
    if (storedUser) setUser(storedUser);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedFile(file);

    const userMessage = { type: "user", content: `Uploaded file: ${file.name}`, time: new Date() };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    try {
      const { data } = await readFileAsText(file);
      handleAIResponse(data);
    } catch (err) {
      const errorMsg = { type: "ai", content: "Failed to read the file.", time: new Date() };
      setMessages((prev) => [...prev, userMessage, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const readFileAsText = (file) => {
    return new Promise((resolve, reject) => {
      if (file.type.startsWith("image/")) {
        Tesseract.recognize(file, "eng", { logger: (m) => console.log(m) })
          .then(({ data: { text } }) => resolve({ data: text }))
          .catch(reject);
      } else {
        reject("Unsupported file type");
      }
    });
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { type: "user", content: inputText, time: new Date() };
    setMessages((prev) => [...prev, userMessage]);

    handleAIResponse(inputText);
    setInputText("");
  };

  const handleAIResponse = (text) => {
    if (!user) return;
    setLoading(true);

    // Simulate different responses for roles
    setTimeout(() => {
      const aiContent =
        user.role === "Patient"
          ? generateAnalyzerResponse(text)
          : generateWriterResponse(text);

      const aiMessage = {
        type: user.role === "Patient" ? "analyzer" : "writer",
        content: aiContent,
        time: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
      setLoading(false);
    }, 800); // simulate typing delay
  };

  const handleDownload = () => {
    const text = messages
      .map((msg) => `[${msg.type.toUpperCase()}] ${msg.content}`)
      .join("\n\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `prescription_chat_${new Date().toISOString()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
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
            width: "100%",
            minWidth: 0,
            background: "#FFF6FA",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={2}>
            {user.role === "Doctor" ? "Prescription Writer" : "Prescription Analyzer"}
          </Typography>

          <Button
            variant="contained"
            sx={{ mb: 2, alignSelf: "flex-end", background: "#B2005E", color: "#fff" }}
            onClick={handleDownload}
          >
            Download Chat
          </Button>

          <Card
            sx={{
              p: 3,
              borderRadius: 1,
              flex: 1,
              display: "flex",
              flexDirection: "column",
              minHeight: 500,
            }}
          >
            <Box
              sx={{
                flex: 1,
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {messages.length === 0 && (
                <Typography color="text.secondary">
                  Upload a prescription image or type your text to start.
                </Typography>
              )}

              {messages.map((msg, idx) => (
                <Paper
                  key={idx}
                  sx={{
                    alignSelf: msg.type === "user" ? "flex-end" : "flex-start",
                    background:
                      msg.type === "user"
                        ? "#F7CFE1"
                        : msg.type === "writer"
                        ? "#E0F7FA"
                        : "#FFF3E0",
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
                  <Typography fontSize={12}>Processing...</Typography>
                </Box>
              )}

              <div ref={messagesEndRef}></div>
            </Box>

            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                gap: 1,
              }}
            >
              <TextField
                placeholder="Type your prescription..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                fullWidth
                size="small"
              />
              <Input
                type="file"
                inputProps={{ accept: "image/*" }}
                onChange={handleFileUpload}
              />
              <Button
                variant="contained"
                sx={{
                  background: user.role === "Doctor" ? "#B2005E" : "#F7CFE1",
                  color: "#222",
                  fontWeight: 600,
                }}
                onClick={handleSendMessage}
                disabled={loading}
              >
                Send
              </Button>
            </Box>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default AIPrescriptionChatPage;
