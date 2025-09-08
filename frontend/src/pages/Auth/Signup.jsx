import React from "react";
import SignupForm from "../../components/auth/SignupForm";
import { Box, Typography } from "@mui/material";

const Signup = () => (
  <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
    <Typography variant="h4" gutterBottom>
      Create Account
    </Typography>
    <SignupForm />
  </Box>
);

export default Signup;
