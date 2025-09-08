import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const DashboardCard = ({ title, value }) => {
  return (
    <Card sx={{ minWidth: 200, m: 1, boxShadow: 3 }}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5">{value}</Typography>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
