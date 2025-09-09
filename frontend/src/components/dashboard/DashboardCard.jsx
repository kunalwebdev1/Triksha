import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const DashboardCard = ({ title, value }) => {
  return (
    <Card
      sx={{
        minWidth: { xs: 150, sm: 200 },
        m: 1,
        boxShadow: 3,
        borderRadius: 1,
        background: "#fff",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 6 },
      }}
    >
      <CardContent>
        <Typography
          sx={{
            color: "#757575", // grey
            fontWeight: 500,
            fontSize: 15,
            mb: 1,
          }}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography
          variant="h4"
          sx={{
            color: "#222", // dark
            fontWeight: 700,
            fontSize: { xs: 22, sm: 28 },
          }}
        >
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;