import { forwardRef } from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  CircularProgress,
} from "@mui/material";
import { globalStyles } from "@shared/styles/globals";

export interface ButtonProps extends Omit<MuiButtonProps, "variant"> {
  variant?: "primary" | "secondary" | "outlined" | "text";
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = "primary", loading = false, children, disabled, sx, ...props },
    ref
  ) => {
    const getVariantProps = () => {
      switch (variant) {
        case "primary":
          return {
            variant: "contained" as const,
            color: "primary" as const,
            sx: { ...globalStyles.buttonPrimary, ...sx },
          };
        case "secondary":
          return {
            variant: "contained" as const,
            color: "secondary" as const,
            sx: sx,
          };
        case "outlined":
          return {
            variant: "outlined" as const,
            color: "primary" as const,
            sx: sx,
          };
        case "text":
          return {
            variant: "text" as const,
            color: "primary" as const,
            sx: sx,
          };
        default:
          return {
            variant: "contained" as const,
            color: "primary" as const,
            sx: sx,
          };
      }
    };

    return (
      <MuiButton
        ref={ref}
        {...getVariantProps()}
        disabled={disabled || loading}
        startIcon={
          loading ? <CircularProgress size={16} color="inherit" /> : undefined
        }
        {...props}
      >
        {children}
      </MuiButton>
    );
  }
);

Button.displayName = "Button";

export default Button;
