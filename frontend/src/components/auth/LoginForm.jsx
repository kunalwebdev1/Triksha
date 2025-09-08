import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const LoginForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Login
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
      />
      <TextField
        fullWidth
        type="password"
        margin="normal"
        label="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;
