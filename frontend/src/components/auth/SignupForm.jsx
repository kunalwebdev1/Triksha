import React, { useState } from "react";
import { Box, TextField, Button, Typography, MenuItem, Link } from "@mui/material";
import tlogo from "../../assets/logos/Triksha-text.png";
import { signup } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";

const roles = [
  "Patient",
  "Doctor",
  "Hospital/Clinic Admin",
  "Laboratory Admin",
  "Insurance TPA",
];

const SignupForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    gender: "",
    password: "",
    confirmPassword: "", // ✅ Added confirm password
    city: "",
    district: "",
    state: "",
    pin: "",
    // role-specific
    speciality: "",
    hospitalName: "",
    labName: "",
    experience: "",
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    // ✅ Remove password mismatch error while typing
    if (e.target.name === "password" || e.target.name === "confirmPassword") {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    } else {
      setErrors({ ...errors, [e.target.name]: "" });
    }
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
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    if (!form.city) newErrors.city = "City is required.";
    if (!form.district) newErrors.district = "District is required.";
    if (!form.state) newErrors.state = "State is required.";
    if (!form.pin) newErrors.pin = "PIN is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSuccess("");
  if (!validateForm()) return;

  try {
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      role: form.role,
      gender: form.gender,
      password: form.password,
      confirm_password: form.confirmPassword, // required for all
      city: form.city,
      district: form.district,
      state: form.state,
      pin: form.pin,
    };

    // Include role-specific fields only if applicable
    if (form.role === "Doctor") {
      payload.speciality = form.speciality;
      payload.hospital_name = form.hospitalName;
      payload.experience = form.experience ? parseInt(form.experience, 10) : 0;
    } else if (form.role === "Hospital/Clinic Admin") {
      payload.hospital_name = form.hospitalName;
    } else if (form.role === "Laboratory Admin") {
      payload.lab_name = form.labName;
    }

    await signup(payload);
    setSuccess("Signup successful! Redirecting to login...");
    setTimeout(() => navigate("/login"), 200);
  } catch (err) {
    const backendError = err.response?.data?.detail || "Signup failed. Please try again.";
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
      {/* Left Branding */}
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

      {/* Signup Form */}
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

        {errors.general && <Typography color="error">{errors.general}</Typography>}
        {success && <Typography color="success.main">{success}</Typography>}

        {/* Name */}
        <Typography fontWeight={500} mb={0.5}>Full Name</Typography>
        <TextField
          fullWidth
          margin="none"
          placeholder="Enter Your Full Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          size="small"
          error={!!errors.name}
          helperText={errors.name}
        />

        {/* Gender */}
        <Typography fontWeight={500} mt={2} mb={0.5}>Gender</Typography>
        <TextField
          select
          fullWidth
          margin="none"
          name="gender"
          placeholder="Select"
          value={form.gender}
          onChange={handleChange}
          size="small"
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>

        {/* Email */}
        <Typography fontWeight={500} mt={2} mb={0.5}>Email</Typography>
        <TextField
          fullWidth
          margin="none"
          placeholder="Enter Your Email Id"
          name="email"
          value={form.email}
          onChange={handleChange}
          size="small"
          error={!!errors.email}
          helperText={errors.email || "Use a valid email address."}
        />

        {/* Phone */}
        <Typography fontWeight={500} mt={2} mb={0.5}>Phone Number</Typography>
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

        {/* Role */}
        <Typography fontWeight={500} mt={2} mb={0.5}>Role</Typography>
        <TextField
          select
          fullWidth
          name="role"
          placeholder="Select Your Primary Role"
          value={form.role}
          onChange={handleChange}
          size="small"
          error={!!errors.role}
          helperText={errors.role || "Please select your primary role."}
        >
          {roles.map((role) => (
            <MenuItem key={role} value={role}>{role}</MenuItem>
          ))}
        </TextField>

        {/* Location */}
        <Typography fontWeight={600} mt={3}>Location</Typography>
        <TextField fullWidth name="city" placeholder="City" value={form.city} onChange={handleChange} size="small" error={!!errors.city} helperText={errors.city} sx={{ mt: 1 }}/>
        <TextField fullWidth name="district" placeholder="District" value={form.district} onChange={handleChange} size="small" error={!!errors.district} helperText={errors.district} sx={{ mt: 1 }}/>
        <TextField fullWidth name="state" placeholder="State" value={form.state} onChange={handleChange} size="small" error={!!errors.state} helperText={errors.state} sx={{ mt: 1 }}/>
        <TextField fullWidth name="pin" placeholder="PIN Code" value={form.pin} onChange={handleChange} size="small" error={!!errors.pin} helperText={errors.pin} sx={{ mt: 1 }}/>

        {/* Role-specific */}
        {form.role === "Doctor" && <>
          <TextField fullWidth name="speciality" placeholder="Speciality" value={form.speciality} onChange={handleChange} size="small" sx={{ mt: 2 }}/>
          <TextField fullWidth name="hospitalName" placeholder="Hospital/Clinic Name" value={form.hospitalName} onChange={handleChange} size="small" sx={{ mt: 1 }}/>
          <TextField fullWidth name="experience" placeholder="Experience (Years)" value={form.experience} onChange={handleChange} size="small" sx={{ mt: 1 }}/>
        </>}
        {form.role === "Hospital/Clinic Admin" && <TextField fullWidth name="hospitalName" placeholder="Hospital/Clinic Name" value={form.hospitalName} onChange={handleChange} size="small" sx={{ mt: 2 }}/>}
        {form.role === "Laboratory Admin" && <TextField fullWidth name="labName" placeholder="Laboratory Name" value={form.labName} onChange={handleChange} size="small" sx={{ mt: 2 }}/>}
        
        {/* Password */}
        <Typography fontWeight={500} mt={2} mb={0.5}>Password</Typography>
        <TextField fullWidth type="password" placeholder="Create Password" name="password" value={form.password} onChange={handleChange} size="small" error={!!errors.password} helperText={errors.password || "Password must be at least 6 characters."}/>

        {/* Confirm Password */}
        <Typography fontWeight={500} mt={2} mb={0.5}>Confirm Password</Typography>
        <TextField fullWidth type="password" placeholder="Confirm Password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} size="small" error={!!errors.confirmPassword} helperText={errors.confirmPassword}/>

        <Button type="submit" variant="contained" fullWidth sx={{
          mt: 3, background: "#F7CFE1", color: "#222", fontWeight: 700, borderRadius: 3, fontSize: "1.1rem", boxShadow: "0 4px 8px #f7cfe1a0", py: 1.5, "&:hover": { background: "#FFD8E4" }
        }}>
          Create Account
        </Button>

        <Typography align="center" mt={3} fontSize={14}>
          Already User? <Link href="/login" underline="hover" color="#B2005E" fontWeight={600}>Login Here</Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignupForm;
