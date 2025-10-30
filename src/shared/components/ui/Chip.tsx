import { forwardRef } from "react";
import { Chip as MuiChip, ChipProps as MuiChipProps } from "@mui/material";
import { colors } from "@shared/styles/colors";

export interface ChipProps extends Omit<MuiChipProps, "color"> {
  color?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "error"
    | "info"
    | "default";
  gradient?: boolean;
}

export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ color = "primary", gradient = false, sx, ...props }, ref) => {
    const getChipSx = () => {
      if (gradient && color === "primary") {
        return {
          background: colors.gradient.primary,
          color: "white",
          fontWeight: 600,
          "& .MuiChip-deleteIcon": {
            color: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              color: "white",
            },
          },
          ...sx,
        };
      }

      if (gradient && color === "secondary") {
        return {
          background: colors.gradient.secondary,
          color: "white",
          fontWeight: 600,
          "& .MuiChip-deleteIcon": {
            color: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              color: "white",
            },
          },
          ...sx,
        };
      }

      return sx;
    };

    return (
      <MuiChip
        ref={ref}
        color={color === "default" ? undefined : color}
        sx={getChipSx()}
        {...props}
      />
    );
  }
);

Chip.displayName = "Chip";

export default Chip;
