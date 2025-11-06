import React from "react";
import { TextField } from "@mui/material";

export default function Input({ label, type = "text", value, onChange, placeholder = "", required = false, fullWidth = true }) {
  return (
    <TextField
      label={label}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      fullWidth={fullWidth}
      variant="outlined"
    />
  );
}
