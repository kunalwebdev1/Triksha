import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F7CFE1", // Soft pink
      light: "#FFD8E4",
      dark: "#B2005E",
      contrastText: "#222222", // Dark text on pink
    },
    secondary: {
      main: "#B2005E", // Deep pink/purple
      light: "#EFB8C8",
      dark: "#8a004a",
      contrastText: "#fff",
    },
    background: {
      default: "#FFF6FA", // Very light pink/white
      paper: "#FFFFFF",   // White cards
    },
    text: {
      primary: "#222222", // Dark text
      secondary: "#8a004a", // Deep pink for secondary text
      disabled: "#BDBDBD",
    },
    divider: "#F7CFE1",
  },
  typography: {
    fontFamily: "'Poppins', 'Roboto', 'Arial', sans-serif",
    h1: { color: "#B2005E", fontWeight: 700 },
    h2: { color: "#B2005E", fontWeight: 700 },
    h3: { color: "#B2005E", fontWeight: 700 },
    h4: { color: "#B2005E", fontWeight: 700 },
    h5: { color: "#B2005E", fontWeight: 700 },
    h6: { color: "#B2005E", fontWeight: 700 },
    subtitle1: { color: "#222222" },
    subtitle2: { color: "#8a004a" },
    body1: { color: "#222222" },
    body2: { color: "#8a004a" },
    button: { fontWeight: 600, textTransform: "none" },
  },
  shape: {
    borderRadius: 18, // Rounded corners
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          boxShadow: "none",
        },
        containedPrimary: {
          backgroundColor: "#B2005E",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#8a004a",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: "#fff",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: "#fff",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: "#fff",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          backgroundColor: "#fff",
        },
      },
    },
  },
});

export default muiTheme;