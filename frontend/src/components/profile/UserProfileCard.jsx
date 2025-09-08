import React from "react";
import { Card, CardContent, Avatar, Typography, Box } from "@mui/material";

const UserProfileCard = ({ name, email, role }) => {
  return (
    <Card sx={{ maxWidth: 400, mx: "auto", p: 2, boxShadow: 3 }}>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar sx={{ width: 80, height: 80, mb: 2 }}>{name.charAt(0)}</Avatar>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {email}
          </Typography>
          <Typography variant="caption" sx={{ mt: 1, color: "primary.main" }}>
            {role}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserProfileCard;
