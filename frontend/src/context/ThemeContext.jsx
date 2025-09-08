import React, { createContext, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import muiTheme from "../theme/muiTheme"; // <-- import your custom theme

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  // If you want to support dark mode, you can extend this logic
  return (
    <ThemeContext.Provider value={{}}>
      <ThemeProvider theme={muiTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};