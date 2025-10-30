import { createTheme, ThemeOptions } from "@mui/material/styles";
import { colors } from "@shared/styles/colors";
import { typographyVariants } from "@shared/styles/typography";

const themeOptions: ThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: colors.primary[500],
      light: colors.primary[400],
      dark: colors.primary[600],
      contrastText: "#ffffff",
    },
    secondary: {
      main: colors.secondary[400],
      light: colors.secondary[300],
      dark: colors.secondary[500],
      contrastText: "#ffffff",
    },
    error: {
      main: colors.semantic.error,
    },
    warning: {
      main: colors.semantic.warning,
    },
    info: {
      main: colors.semantic.info,
    },
    success: {
      main: colors.semantic.success,
    },
    background: {
      default: colors.neutral[50],
      paper: "#ffffff",
    },
    text: {
      primary: colors.neutral[800],
      secondary: colors.neutral[600],
    },
    grey: colors.neutral,
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif',
    ...typographyVariants,
  },
  shape: {
    borderRadius: 12,
  },
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          textTransform: "none",
          fontWeight: 600,
          padding: "12px 24px",
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.12)",
            transform: "translateY(-1px)",
          },
        },
        containedPrimary: {
          background: colors.gradient.primary,
          "&:hover": {
            background: colors.gradient.primary,
            opacity: 0.9,
          },
        },
        containedSecondary: {
          background: colors.gradient.secondary,
          "&:hover": {
            background: colors.gradient.secondary,
            opacity: 0.9,
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            transform: "translateY(-2px)",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          fontWeight: 500,
          "&.MuiChip-colorPrimary": {
            background: colors.gradient.primary,
            color: "white",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 12,
            transition: "all 0.2s ease-in-out",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary[400],
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: colors.primary[500],
              borderWidth: 2,
            },
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
        elevation1: {
          boxShadow:
            "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: colors.gradient.primary,
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: colors.gradient.sidebar,
          color: "white",
          borderRight: "none",
        },
      },
    },
  },
};

export const theme = createTheme(themeOptions);

export default theme;
