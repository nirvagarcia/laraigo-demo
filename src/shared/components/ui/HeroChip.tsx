import { forwardRef } from "react";
import { Chip, ChipProps } from "@shared/components/ui/Chip";

export interface HeroChipProps extends ChipProps {
  blurred?: boolean;
  gradient?: boolean;
}

export const HeroChip = forwardRef<HTMLDivElement, HeroChipProps>(
  ({ blurred = true, gradient = false, sx, ...props }, ref) => {
    const blurredStyle = blurred
      ? {
          background: "rgba(255, 255, 255, 0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
        }
      : {};

    return (
      <Chip
        ref={ref}
        gradient={gradient}
        sx={{
          ...blurredStyle,
          ...sx,
        }}
        {...props}
      />
    );
  }
);

HeroChip.displayName = "HeroChip";

export default HeroChip;
