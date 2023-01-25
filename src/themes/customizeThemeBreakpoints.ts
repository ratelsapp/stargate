import { createTheme } from "@mui/material/styles";

export const customizeTheme = createTheme({
  breakpoints: {
    values: {
      md: 960,
    },
  },
});

export const customizeBreakPoints = customizeTheme.breakpoints;
