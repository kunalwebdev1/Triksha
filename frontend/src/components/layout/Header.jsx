import React from "react";
import { Box, Typography } from "@mui/material";

const Header = ({ title }) => {
  return (
    <Box sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
      <Typography variant="h5" fontWeight="bold">
        {title}
      </Typography>
    </Box>
  );
};

export default Header;
