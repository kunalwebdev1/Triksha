import React from "react";
import { Button as MUIButton } from "@mui/material";

export default function Button({ children, onClick, type = "button", variant = "contained", color = "primary", disabled = false }) {
  return (
    <MUIButton
      type={type}
      onClick={onClick}
      variant={variant}
      color={color}
      disabled={disabled}
    >
      {children}
    </MUIButton>
  );
}
