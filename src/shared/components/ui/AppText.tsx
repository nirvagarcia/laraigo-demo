import { forwardRef, ReactNode } from "react";
import {
  Typography,
  TypographyProps as MuiTypographyProps,
  useTheme,
} from "@mui/material";

export interface AppTextProps extends Omit<MuiTypographyProps, "color"> {
  children: ReactNode;
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "neutral"
    | "inherit";
  variant?:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body1"
    | "body2"
    | "caption"
    | "subtitle1"
    | "subtitle2";
  weight?: "light" | "regular" | "medium" | "semibold" | "bold";
}

export const AppText = forwardRef<HTMLElement, AppTextProps>(
  ({ children, color = "inherit", weight, sx, ...props }, ref) => {
    const theme = useTheme();

    const getColorValue = () => {
      switch (color) {
        case "primary":
          return theme.palette.primary.main;
        case "secondary":
          return theme.palette.secondary.main;
        case "success":
          return theme.palette.success.main;
        case "warning":
          return theme.palette.warning.main;
        case "error":
          return theme.palette.error.main;
        case "info":
          return theme.palette.info.main;
        case "neutral":
          return theme.palette.text.secondary;
        default:
          return "inherit";
      }
    };

    const getFontWeight = () => {
      if (!weight) return undefined;

      switch (weight) {
        case "light":
          return theme.typography.fontWeightLight;
        case "regular":
          return theme.typography.fontWeightRegular;
        case "medium":
          return theme.typography.fontWeightMedium;
        case "semibold":
          return 600;
        case "bold":
          return theme.typography.fontWeightBold;
        default:
          return undefined;
      }
    };

    return (
      <Typography
        ref={ref}
        sx={{
          color: getColorValue(),
          fontWeight: getFontWeight(),
          ...sx,
        }}
        {...props}
      >
        {children}
      </Typography>
    );
  }
);

AppText.displayName = "AppText";

export default AppText;
