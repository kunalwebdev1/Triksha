import React from "react";
import ForgotPasswordForm from "../../components/layout/auth/ForgotPasswordForm";
import { Box, Typography } from "@mui/material";

const ForgotPassword = () => (
  <Box display="flex" flexDirection="column" alignItems="center" mt={5}>
    <Typography variant="h4" gutterBottom>
      Forgot Password
    </Typography>
    <ForgotPasswordForm />
  </Box>
);

export default ForgotPassword;
