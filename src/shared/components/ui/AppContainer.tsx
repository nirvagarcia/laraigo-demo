import { forwardRef, ReactNode } from "react";
import {
  Container as MuiContainer,
  ContainerProps as MuiContainerProps,
  useTheme,
} from "@mui/material";

export interface AppContainerProps extends MuiContainerProps {
  children: ReactNode;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | false;
  padding?: "none" | "small" | "medium" | "large";
  centered?: boolean;
  fullHeight?: boolean;
}

export const AppContainer = forwardRef<HTMLDivElement, AppContainerProps>(
  (
    {
      children,
      size = "lg",
      padding = "medium",
      centered = false,
      fullHeight = false,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const getPaddingValue = () => {
      switch (padding) {
        case "none":
          return 0;
        case "small":
          return theme.spacing(2);
        case "medium":
          return theme.spacing(3);
        case "large":
          return theme.spacing(4);
        default:
          return theme.spacing(3);
      }
    };

    return (
      <MuiContainer
        ref={ref}
        maxWidth={size}
        sx={{
          paddingX: getPaddingValue(),
          paddingY: padding !== "none" ? theme.spacing(2) : 0,
          minHeight: fullHeight ? "100vh" : "auto",
          display: centered ? "flex" : "block",
          flexDirection: centered ? "column" : undefined,
          alignItems: centered ? "center" : undefined,
          justifyContent: centered ? "center" : undefined,
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiContainer>
    );
  }
);

AppContainer.displayName = "AppContainer";

export default AppContainer;
