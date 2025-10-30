import { forwardRef, ReactNode } from "react";
import { CardContent } from "@mui/material";
import { Card, CardProps } from "@shared/components/ui/Card";

export interface CardPlaceholderProps extends Omit<CardProps, "children"> {
  children: ReactNode;
  padding?: "none" | "small" | "medium" | "large";
}

export const CardPlaceholder = forwardRef<HTMLDivElement, CardPlaceholderProps>(
  ({ children, padding = "large", sx, ...props }, ref) => {
    const paddingValue = {
      none: 0,
      small: 2,
      medium: 3,
      large: 4,
    }[padding];

    return (
      <Card
        ref={ref}
        sx={{
          border: 1,
          borderColor: "divider",
          borderStyle: "dashed",
          backgroundColor: "grey.50",
          textAlign: "center",
          p: paddingValue,
          ...sx,
        }}
        {...props}
      >
        <CardContent sx={{ "&:last-child": { pb: paddingValue } }}>
          {children}
        </CardContent>
      </Card>
    );
  }
);

CardPlaceholder.displayName = "CardPlaceholder";

export default CardPlaceholder;
