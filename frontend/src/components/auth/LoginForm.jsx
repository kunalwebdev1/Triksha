import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link } from "@mui/material";
import tlogo from "../../assets/logos/Triksha-text.png";
import { loginAPI } from "../../api/authAPI";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

const LoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setFieldErrors({ ...fieldErrors, [e.target.name]: "" }); // clear field error on typing
  };

  const validate = () => {
    let errors = {};
    if (!form.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Invalid email format";
    }

    if (!form.password) {
      errors.password = "Password is required";
    } else if (form.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return; // stop if validation fails

    try {
      const res = await loginAPI(form);

      const userData = {
        id : res.data.id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
        token: res.data.token,
      };

      login(userData);

      if (userData.role === "Doctor") {
        navigate("/doctor/dashboard");
      } else if (
        userData.role === "Hospital" ||
        userData.role === "Clinic" ||
        userData.role === "Hospital/Clinic Admin" ||
        userData.role === "Hospital/Clinic"
      ) {
        navigate("/hospital/dashboard");
      } else if (userData.role === "Laboratory Admin") {
        navigate("/lab/dashboard");
      } //  else if (userData.role === "Pharmacy Admin") {
      //   navigate("/pharmacy/dashboard");
      // } else if (userData.role === "Caregiver") {
      //   navigate("/caregiver/dashboard");
      // } 
      else if (userData.role === "Insurance TPA") {
        navigate("/insurance/dashboard");
      }
      else {
        navigate("/patient/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.detail || "Login failed. Please try again.");
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

      {/* Right login form section */}
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
          Login Page
        </Typography>
        {error && (
          <Typography color="error" mb={1}>
            {error}
          </Typography>
        )}
        <Typography fontWeight={500} mb={0.5}>
          Your email
        </Typography>
        <TextField
          fullWidth
          margin="dense"
          placeholder="Enter Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          size="small"
          error={!!fieldErrors.email}
          helperText={fieldErrors.email}
        />
        <Typography fontWeight={500} mt={2} mb={0.5}>
          Password
        </Typography>
        <TextField
          fullWidth
          type="password"
          margin="dense"
          placeholder="Enter Password"
          name="password"
          value={form.password}
          onChange={handleChange}
          size="small"
          error={!!fieldErrors.password}
          helperText={fieldErrors.password}
        />
        <Box display="flex" justifyContent="flex-end" mt={1}>
          <Link href="/forgetpassword" underline="hover" fontSize={13}>
            Forgot password?
          </Link>
        </Box>
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
          Sign In
        </Button>
        <Typography align="center" mt={3} fontSize={14}>
          Not joined us yet?{" "}
          <Link href="/signup" underline="hover" color="#B2005E" fontWeight={600}>
            Sign up
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginForm;