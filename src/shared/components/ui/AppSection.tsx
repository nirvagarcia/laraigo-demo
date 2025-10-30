import { forwardRef, ReactNode } from "react";
import {
  Box as MuiBox,
  BoxProps as MuiBoxProps,
  useTheme,
} from "@mui/material";

export interface AppSectionProps
  extends Omit<MuiBoxProps, "padding" | "margin"> {
  children: ReactNode;
  spacing?: "none" | "small" | "medium" | "large" | "xlarge";
  background?: "none" | "paper" | "default" | "primary" | "secondary";
  fullWidth?: boolean;
  centered?: boolean;
}

export const AppSection = forwardRef<HTMLElement, AppSectionProps>(
  (
    {
      children,
      spacing = "medium",
      background = "none",
      fullWidth = true,
      centered = false,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const getSpacingValue = () => {
      switch (spacing) {
        case "none":
          return 0;
        case "small":
          return theme.spacing(2, 3);
        case "medium":
          return theme.spacing(4, 3);
        case "large":
          return theme.spacing(6, 3);
        case "xlarge":
          return theme.spacing(8, 3);
        default:
          return theme.spacing(4, 3);
      }
    };

    const getBackgroundColor = () => {
      switch (background) {
        case "paper":
          return theme.palette.background.paper;
        case "default":
          return theme.palette.background.default;
        case "primary":
          return theme.palette.primary.light + "10";
        case "secondary":
          return theme.palette.secondary.light + "10";
        default:
          return "transparent";
      }
    };

    return (
      <MuiBox
        ref={ref}
        component="section"
        sx={{
          width: fullWidth ? "100%" : "auto",
          padding: getSpacingValue(),
          backgroundColor: getBackgroundColor(),
          display: centered ? "flex" : "block",
          flexDirection: centered ? "column" : undefined,
          alignItems: centered ? "center" : undefined,
          justifyContent: centered ? "center" : undefined,
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiBox>
    );
  }
);

AppSection.displayName = "AppSection";

export default AppSection;
