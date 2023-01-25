import { createTheme, keyframes } from "@mui/material";

const MuiTheme = createTheme({});

export function componentStyleOverrides() {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "inherit",
        },
      },
    },
  };
}
