import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const SignupForm = ({ onSubmit }) => {
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(form);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Signup
      </Typography>
      <TextField fullWidth margin="normal" label="Name" name="name" onChange={handleChange} />
      <TextField fullWidth margin="normal" label="Username" name="username" onChange={handleChange} />
      <TextField fullWidth margin="normal" label="Email" name="email" onChange={handleChange} />
      <TextField
        fullWidth
        type="password"
        margin="normal"
        label="Password"
        name="password"
        onChange={handleChange}
      />
      <Button variant="contained" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
        Signup
      </Button>
    </Box>
  );
};

export default SignupForm;
