import { forwardRef, ReactNode } from "react";
import {
  IconButton as MuiIconButton,
  IconButtonProps as MuiIconButtonProps,
  useTheme,
} from "@mui/material";

export interface AppIconButtonProps extends Omit<MuiIconButtonProps, "color"> {
  children: ReactNode;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info";
  size?: "small" | "medium" | "large";
}

export const AppIconButton = forwardRef<HTMLButtonElement, AppIconButtonProps>(
  ({ children, variant = "default", size = "medium", sx, ...props }, ref) => {
    const theme = useTheme();

    const getVariantSx = () => {
      const baseStyles = {
        borderRadius: theme.spacing(1),
        transition: theme.transitions.create(
          ["background-color", "color", "transform"],
          {
            duration: theme.transitions.duration.short,
          }
        ),
        "&:hover": {
          transform: "scale(1.05)",
        },
      };

      switch (variant) {
        case "primary":
          return {
            ...baseStyles,
            color: theme.palette.primary.main,
            "&:hover": {
              ...baseStyles["&:hover"],
              backgroundColor: theme.palette.primary.light + "20",
              color: theme.palette.primary.dark,
            },
          };
        case "secondary":
          return {
            ...baseStyles,
            color: theme.palette.secondary.main,
            "&:hover": {
              ...baseStyles["&:hover"],
              backgroundColor: theme.palette.secondary.light + "20",
              color: theme.palette.secondary.dark,
            },
          };
        case "success":
          return {
            ...baseStyles,
            color: theme.palette.success.main,
            "&:hover": {
              ...baseStyles["&:hover"],
              backgroundColor: theme.palette.success.light + "20",
              color: theme.palette.success.dark,
            },
          };
        case "warning":
          return {
            ...baseStyles,
            color: theme.palette.warning.main,
            "&:hover": {
              ...baseStyles["&:hover"],
              backgroundColor: theme.palette.warning.light + "20",
              color: theme.palette.warning.dark,
            },
          };
        case "error":
          return {
            ...baseStyles,
            color: theme.palette.error.main,
            "&:hover": {
              ...baseStyles["&:hover"],
              backgroundColor: theme.palette.error.light + "20",
              color: theme.palette.error.dark,
            },
          };
        case "info":
          return {
            ...baseStyles,
            color: theme.palette.info.main,
            "&:hover": {
              ...baseStyles["&:hover"],
              backgroundColor: theme.palette.info.light + "20",
              color: theme.palette.info.dark,
            },
          };
        default:
          return {
            ...baseStyles,
            color: theme.palette.text.secondary,
            "&:hover": {
              ...baseStyles["&:hover"],
              backgroundColor: theme.palette.action.hover,
              color: theme.palette.text.primary,
            },
          };
      }
    };

    return (
      <MuiIconButton
        ref={ref}
        size={size}
        sx={{
          ...getVariantSx(),
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiIconButton>
    );
  }
);

AppIconButton.displayName = "AppIconButton";

export default AppIconButton;
