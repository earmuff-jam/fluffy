import { createTheme, ThemeOptions } from "@mui/material";

const commonTypography = {
  fontFamily: "Nunito, sans-serif",
  h1: { fontWeight: 700, fontSize: "2.5rem", lineHeight: 1.2 },
  h2: { fontWeight: 700, fontSize: "2rem", lineHeight: 1.3 },
  h3: { fontWeight: 700, fontSize: "1.75rem", lineHeight: 1.4 },
  h4: { fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.5 },
  h5: { fontWeight: 700, fontSize: "1.25rem", lineHeight: 1.6 },
  h6: { fontWeight: 700, fontSize: "1rem", lineHeight: 1.7 },
  body1: { fontSize: "1rem", lineHeight: 1.6 },
  body2: { fontSize: "0.875rem", lineHeight: 1.6 },
};

const commonComponents = {
  MuiButton: {
    styleOverrides: {
      root: { textTransform: "capitalize" },
    },
  },
  MuiToolbar: {
    styleOverrides: {
      root: { backgroundColor: "#F9F7F7", color: "#B0B0B0" },
    },
  },
};

export const lightTheme = createTheme({
  palette: {
    primary: { main: "#3F72AF", dark: "#112D4E" },
    secondary: { main: "#DBE2EF", light: "#F9F7F7" },
    background: { default: "#FFFBFB", paper: "#F8FAFD" },
    accentColor: { default: "#EEEEF2" },
  },
  typography: commonTypography,
  components: {
    ...commonComponents,
    MuiPaper: { styleOverrides: { root: { backgroundColor: "#FDF9F9" } } },
    MuiAccordion: { styleOverrides: { root: { backgroundColor: "#F9F7F7" } } },
    MuiAccordionDetails: { styleOverrides: { root: { backgroundColor: "#F9F7F7" } } },
  },
} as ThemeOptions);

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#3F72AF", dark: "#112D4E", light: "#5A91D7" },
    secondary: { main: "#DBE2EF", light: "#F9F7F7", dark: "#A1B6D3" },
    background: { default: "#2E2E2E", paper: "#1E1E1E" },
    text: { primary: "#FFFFFF", secondary: "#B0B0B0" },
    accentColor: { default: "#232B35" },
  },
  typography: {
    ...commonTypography,
    h1: { ...commonTypography.h1, color: "#FFFFFF" },
    h2: { ...commonTypography.h2, color: "#FFFFFF" },
    h3: { ...commonTypography.h3, color: "#FFFFFF" },
    h4: { ...commonTypography.h4, color: "#FFFFFF" },
    h5: { ...commonTypography.h5, color: "#FFFFFF" },
    h6: { ...commonTypography.h6, color: "#FFFFFF" },
    body1: { ...commonTypography.body1, color: "#B0B0B0" },
    body2: { ...commonTypography.body2, color: "#B0B0B0" },
    caption: { color: "#B0B0B0" },
  },
  components: {
    ...commonComponents,
    MuiAppBar: { styleOverrides: { root: { backgroundColor: "#2E2E2E" } } },
    MuiToolbar: { styleOverrides: { root: { backgroundColor: "#2E2E2E" } } },
  },
} as ThemeOptions);
