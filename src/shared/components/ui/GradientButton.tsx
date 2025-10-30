import { forwardRef } from "react";
import { useTheme } from "@mui/material";
import { Button, ButtonProps } from "@shared/components/ui/Button";

export interface GradientButtonProps extends ButtonProps {
  glass?: boolean;
  lift?: boolean;
}

export const GradientButton = forwardRef<
  HTMLButtonElement,
  GradientButtonProps
>(({ glass = true, lift = true, size = "large", sx, ...props }, ref) => {
  const theme = useTheme();

  const glassStyle = glass
    ? {
        background: "rgba(255, 255, 255, 0.95)",
        color: theme.palette.primary.dark,
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.3)",
      }
    : {};

  const liftStyle = lift
    ? {
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-3px)",
          boxShadow: "0 12px 35px rgba(0, 0, 0, 0.25)",
          ...(glass && {
            background: "rgba(255, 255, 255, 1)",
          }),
        },
      }
    : {};

  return (
    <Button
      ref={ref}
      size={size}
      sx={{
        fontSize: "1.125rem",
        fontWeight: 600,
        px: theme.spacing(6),
        py: theme.spacing(2),
        borderRadius: theme.spacing(3),
        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
        ...glassStyle,
        ...liftStyle,
        ...sx,
      }}
      {...props}
    />
  );
});

GradientButton.displayName = "GradientButton";

export default GradientButton;
