import React from "react";
import { Card, CardContent, Typography, LinearProgress } from "@mui/material";

const StatsWidget = ({ label, value, max }) => {
  return (
    <Card sx={{ m: 1, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="body1">{label}</Typography>
        <LinearProgress variant="determinate" value={(value / max) * 100} sx={{ my: 1 }} />
        <Typography variant="body2">
          {value} / {max}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsWidget;
