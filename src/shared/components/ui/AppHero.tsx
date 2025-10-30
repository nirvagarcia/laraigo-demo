import { forwardRef, ReactNode } from "react";
import {
  Box as MuiBox,
  BoxProps as MuiBoxProps,
  useTheme,
} from "@mui/material";

export interface AppHeroProps extends MuiBoxProps {
  children: ReactNode;
  background?: "gradient" | "primary" | "secondary" | "none";
  height?: "small" | "medium" | "large" | "fullscreen";
  alignment?: "left" | "center" | "right";
  decorated?: boolean;
}

export const AppHero = forwardRef<HTMLDivElement, AppHeroProps>(
  (
    {
      children,
      background = "gradient",
      height = "large",
      alignment = "center",
      decorated = true,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const getHeightValue = () => {
      switch (height) {
        case "small":
          return "40vh";
        case "medium":
          return "60vh";
        case "large":
          return "80vh";
        case "fullscreen":
          return "100vh";
        default:
          return "80vh";
      }
    };

    const getBackgroundValue = () => {
      switch (background) {
        case "gradient":
          return "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)";
        case "primary":
          return theme.palette.primary.main;
        case "secondary":
          return theme.palette.secondary.main;
        default:
          return "transparent";
      }
    };

    const getAlignmentValue = () => {
      switch (alignment) {
        case "left":
          return "flex-start";
        case "center":
          return "center";
        case "right":
          return "flex-end";
        default:
          return "center";
      }
    };

    const decorativeElements = decorated
      ? {
          "&::before": {
            content: '""',
            position: "absolute",
            top: "-50px",
            right: "-50px",
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            filter: "blur(40px)",
            zIndex: 0,
          },
          "&::after": {
            content: '""',
            position: "absolute",
            bottom: "-30px",
            left: "-30px",
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            filter: "blur(30px)",
            zIndex: 0,
          },
        }
      : {};

    return (
      <MuiBox
        ref={ref}
        sx={{
          minHeight: getHeightValue(),
          background: getBackgroundValue(),
          display: "flex",
          alignItems: "center",
          justifyContent: getAlignmentValue(),
          position: "relative",
          overflow: "hidden",
          padding: theme.spacing(4),
          color: background !== "none" ? "white" : "inherit",
          ...decorativeElements,
          "& > *": {
            position: "relative",
            zIndex: 1,
          },
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiBox>
    );
  }
);

AppHero.displayName = "AppHero";

export default AppHero;
