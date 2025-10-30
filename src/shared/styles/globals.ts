import { SxProps, Theme } from "@mui/material";
import { colors } from "./colors";

export const globalStyles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: { xs: 2, sm: 3, md: 4 },
  } as SxProps<Theme>,

  pageWrapper: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  } as SxProps<Theme>,

  centeredContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    textAlign: "center",
  } as SxProps<Theme>,

  gradientPrimary: {
    background: colors.gradient.primary,
  } as SxProps<Theme>,

  gradientSecondary: {
    background: colors.gradient.secondary,
  } as SxProps<Theme>,

  gradientSidebar: {
    background: colors.gradient.sidebar,
  } as SxProps<Theme>,

  card: {
    borderRadius: 3,
    boxShadow:
      "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transform: "translateY(-2px)",
    },
  } as SxProps<Theme>,

  buttonPrimary: {
    borderRadius: 3,
    fontWeight: 600,
    textTransform: "none",
    px: 4,
    py: 1.5,
    background: colors.gradient.primary,
    color: "white",
    border: "none",
    boxShadow: "0 4px 6px -1px rgba(106, 17, 203, 0.25)",
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      transform: "translateY(-1px)",
      boxShadow: "0 6px 8px -1px rgba(106, 17, 203, 0.35)",
    },
  } as SxProps<Theme>,

  sidebarNav: {
    width: 280,
    background: colors.gradient.sidebar,
    color: "white",
    height: "100vh",
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 1200,
  } as SxProps<Theme>,

  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    px: 3,
    py: 2,
    color: "rgba(255, 255, 255, 0.9)",
    textDecoration: "none",
    borderRadius: 2,
    mx: 2,
    my: 0.5,
    transition: "all 0.2s ease-in-out",
    "&:hover": {
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      color: "white",
    },
    "&.active": {
      backgroundColor: "rgba(255, 255, 255, 0.15)",
      color: "white",
      fontWeight: 600,
    },
  } as SxProps<Theme>,

  spacing: {
    xs: 1,
    sm: 2,
    md: 3,
    lg: 4,
    xl: 6,
  },

  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
  },
} as const;

export type GlobalStyles = typeof globalStyles;
