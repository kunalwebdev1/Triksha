import React from "react";
import { CircularProgress } from "@mui/material";

export default function Loader({ size = 40, color = "primary" }) {
  return <CircularProgress size={size} color={color} />;
}
