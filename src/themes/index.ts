import { createTheme } from "@mui/material/styles";
import { componentStyleOverrides } from "./compStyleOverride";
import { themePalette } from "./palette";
import { themeTypography } from "./typography";

const fontSize = {
  xs: "0.75rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.25rem",
};

const Radius = 12;

export interface ThemeOption {
  [key: string]: any;
}

export function theme() {
  return createTheme({
    palette: themePalette(),
    typography: themeTypography(),
    components: componentStyleOverrides(),
    fontSize,
    radius: Radius,
  });
}

export default theme;
