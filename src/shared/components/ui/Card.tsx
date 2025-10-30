import { forwardRef, ReactNode } from "react";
import {
  Card as MuiCard,
  CardProps as MuiCardProps,
  CardContent,
  CardActions,
  CardHeader,
  Typography,
} from "@mui/material";

export interface CardProps extends MuiCardProps {
  title?: string;
  subtitle?: string;
  actions?: ReactNode;
  padding?: "none" | "small" | "medium" | "large";
  hover?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      title,
      subtitle,
      actions,
      children,
      padding = "medium",
      hover = true,
      sx,
      ...props
    },
    ref
  ) => {
    const getPaddingValue = () => {
      switch (padding) {
        case "none":
          return 0;
        case "small":
          return 2;
        case "medium":
          return 3;
        case "large":
          return 4;
        default:
          return 3;
      }
    };

    const cardSx = {
      borderRadius: 3,
      boxShadow:
        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      transition: "all 0.2s ease-in-out",
      "&:hover": hover
        ? {
            boxShadow:
              "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            transform: "translateY(-2px)",
          }
        : {
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            transform: "none",
          },
      ...sx,
    };

    return (
      <MuiCard ref={ref} sx={cardSx} {...props}>
        {(title || subtitle) && (
          <CardHeader
            title={
              title && (
                <Typography variant="h6" component="h2">
                  {title}
                </Typography>
              )
            }
            subheader={
              subtitle && (
                <Typography variant="body2" color="text.secondary">
                  {subtitle}
                </Typography>
              )
            }
            sx={{ pb: padding === "none" ? 0 : 1 }}
          />
        )}

        {children && (
          <CardContent sx={{ p: getPaddingValue() }}>{children}</CardContent>
        )}

        {actions && (
          <CardActions sx={{ p: getPaddingValue(), pt: 0 }}>
            {actions}
          </CardActions>
        )}
      </MuiCard>
    );
  }
);

Card.displayName = "Card";

export default Card;
