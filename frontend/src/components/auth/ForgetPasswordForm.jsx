import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const ForgotPasswordForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    onSubmit(email);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Forgot Password
      </Typography>
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button variant="contained" color="primary" fullWidth onClick={handleSubmit} sx={{ mt: 2 }}>
        Send Reset Link
      </Button>
    </Box>
  );
};

export default ForgotPasswordForm;
