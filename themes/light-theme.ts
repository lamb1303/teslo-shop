import { createTheme, ThemeOptions } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const lightTheme:ThemeOptions = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#f5f5f566"
    },
    primary: {
      main: "#1E1E1E",
    },
    secondary: {
      main: "#3A64D8",
    },
    info:{
      main: '#fff'
    }
  },
  components: {
    MuiLink: {
      defaultProps: {
        underline: "none",
      },
      styleOverrides: {
        root: {
          margin: 3,
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
        position: "fixed",
      },
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          backdropFilter: 'blur(6px)',
          height: 60,
        },
      },
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: 30,
          fontWeight: 600,
        },
        h2: {
          fontSize: 20,
          fontWeight: 400,
        },
        subtitle1: {
          fontSize: 18,
          fontWeight: 600,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        variant: "contained",
        size: "small",
        disableElevation: true,
        color: "info",
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          boxShadow: "none",
          borderRadius: 10,
          ":hover": {
            backgroundColor: "rgba(0,0,0,0.05)",
            transition: "all 0.3s ease-in-out",
          },
        },
      },
    },

    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 5px rgba(0,0,0,0.05)",
          borderRadius: "10px",
        },
      },
    },
  },
});
