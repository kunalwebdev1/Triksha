import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppRouter from "./router/AppRouter";
import muiTheme from "./theme/muiTheme";
import { AuthProvider } from "./context/AuthContext"; // <-- import

function App() {
  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <BrowserRouter>
        <AuthProvider>   {/* <-- wrap AppRouter */}
          <AppRouter />
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
