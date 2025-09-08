import React from "react";
import LoginForm from "../../components/auth/LoginForm";
import { Box, Typography } from "@mui/material";

const Login = () => (
  <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
    <Typography variant="h4" gutterBottom>
      Login
    </Typography>
    <LoginForm />
  </Box>
);

export default Login;
