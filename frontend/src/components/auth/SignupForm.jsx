import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Link } from "@mui/material";
import tlogo from "../../assets/logos/Triksha-text.png";
import { signup } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";

const roles = [
  "Patient",
  "Doctor",
  "Hospital/Clinic Admin",
  // "Pharmacy Admin",
  // "Caregiver",
  "Laboratory Admin",
  "Insurance TPA",
];

const SignupForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    password: "",
  });
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };
   const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full name is required.";
    if (!form.email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!form.phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(form.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number.";
    }
    if (!form.role) newErrors.role = "Please select a role.";
    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
if (!validateForm()) return;

    try {
      await signup(form);
      setSuccess("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 200);
    } catch (err) {
      setErrors(err.response?.data?.detail || "Signup failed. Please try again.");
      setErrors({ general: backendError });
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#FFF6FA",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: "center",
        justifyContent: "center",
        p: { xs: 1, sm: 2 },
      }}
    >
      {/* Left branding section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          mb: { xs: 4, md: 0 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 1,
          }}
        >
          <img
            src={tlogo}
            alt="Triksha"
            style={{
              width: "100%",
              maxWidth: 500,
              minWidth: 180,
              marginBottom: 8,
            }}
          />
        </Box>
        <Typography
          sx={{
            fontSize: { xs: 18, sm: 20, md: 22 },
            color: "#222",
            textAlign: "center",
            fontFamily: "Poppins, Arial, sans-serif",
            mt: { xs: 0, md: -5 },
          }}
        >
          Synced. <b>Simplified.</b> Secured
        </Typography>
      </Box>

      {/* Right signup form section */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          flex: 1,
          maxWidth: 420,
          width: "100%",
          mx: { xs: "auto", md: 4 },
          p: { xs: 2, sm: 3, md: 4 },
          background: "#fff",
          borderRadius: 1,
          boxShadow: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
        }}
      >
        <Typography variant="h5" align="center" fontWeight={700} mb={3}>
          Sign Up
        </Typography>
        {errors.general && (
          <Typography color="error" mb={1}>
            {errors.general}
          </Typography>
        )}
        {success && (
          <Typography color="success.main" mb={1}>
            {success}
          </Typography>
        )}
        <Typography fontWeight={500} mb={0.5}>
          Full Name
        </Typography>
        <TextField
          fullWidth
          response
          margin="none"
          placeholder="Enter Your Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          size="small"
          error={!!errors.name}
          helperText={errors.name}
        />
        <Typography fontWeight={500} mt={2} mb={0.5}>
          Email
        </Typography>
        <TextField
          fullWidth
          margin="none"
          placeholder="Enter Email Id"
          name="email"
          value={form.email}
          onChange={handleChange}
          size="small"
          error={!!errors.email}
          helperText={errors.email || "Use a valid email address."}
        />
        <Typography fontWeight={500} mt={2} mb={0.5}>
          Phone Number
        </Typography>
        <TextField
          fullWidth
          margin="none"
          placeholder="Enter Your Mobile Number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          size="small"
          error={!!errors.phone}
          helperText={errors.phone}
        />
        <Typography fontWeight={500} mt={2} mb={0.5}>
          Role 
        </Typography>
        <TextField
          select
          fullWidth
          margin="none"
          placeholder="Select Usecase"
          name="role"
          value={form.role}
          onChange={handleChange}
          size="small"
          error={!!errors.role}
          helperText={errors.role || "Please select your primary role."}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>
              {role}
            </MenuItem>
          ))}
        </TextField>
        <Typography fontWeight={500} mt={2} mb={0.5}>
          Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          margin="none"
          placeholder="Create Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          size="small"
          error={!!errors.password}
          helperText={errors.password || "Password must be at least 6 characters."}
        />
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            background: "#F7CFE1",
            color: "#222",
            fontWeight: 700,
            borderRadius: 3,
            fontSize: "1.1rem",
            boxShadow: "0 4px 8px #f7cfe1a0",
            py: 1.5,
            "&:hover": { background: "#FFD8E4" },
          }}
        >
          Create Account
        </Button>
        <Typography align="center" mt={3} fontSize={14}>
          Already User?{" "}
          <Link href="/login" underline="hover" color="#B2005E" fontWeight={600}>
            Login Here
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupForm;