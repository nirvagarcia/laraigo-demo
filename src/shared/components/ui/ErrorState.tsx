import React from "react";
import { AppBox } from "./AppBox";
import { AppText } from "./AppText";
import { Button } from "./Button";

interface ErrorStateProps {
  title?: string;
  description?: string;
  icon?: string;
  onRetry?: () => void;
  retryLabel?: string;
}

export const ErrorState: React.FC<ErrorStateProps> = ({
  title = "Something went wrong",
  description = "We couldn't load the data. Please try again.",
  icon = "🛰️",
  onRetry,
  retryLabel = "Try Again",
}) => {
  return (
    <AppBox sx={errorStateSx.container}>
      <AppBox sx={errorStateSx.content}>
        <AppBox sx={errorStateSx.iconContainer}>
          <AppText variant="h1" sx={errorStateSx.icon}>
            {icon}
          </AppText>
        </AppBox>

        <AppText variant="h5" sx={errorStateSx.title}>
          {title}
        </AppText>

        <AppText variant="body1" sx={errorStateSx.description}>
          {description}
        </AppText>

        {onRetry && (
          <Button
            variant="primary"
            onClick={onRetry}
            sx={errorStateSx.retryButton}
          >
            {retryLabel}
          </Button>
        )}
      </AppBox>
    </AppBox>
  );
};

const errorStateSx = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px",
    background: "#FAFAFF",
    borderRadius: "16px",
    p: 4,
    animation: "fadeIn 0.5s ease-out",
    "@keyframes fadeIn": {
      "0%": {
        opacity: 0,
        transform: "translateY(20px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  },

  content: {
    textAlign: "center",
    maxWidth: "400px",
    animation: "slideUp 0.6s ease-out 0.1s backwards",
    "@keyframes slideUp": {
      "0%": {
        opacity: 0,
        transform: "translateY(30px)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0)",
      },
    },
  },

  iconContainer: {
    mb: 3,
    animation: "bounce 0.8s ease-out 0.2s backwards",
    "@keyframes bounce": {
      "0%": {
        opacity: 0,
        transform: "scale(0.3) rotate(-10deg)",
      },
      "60%": {
        transform: "scale(1.1) rotate(5deg)",
      },
      "100%": {
        opacity: 1,
        transform: "scale(1) rotate(0deg)",
      },
    },
  },

  icon: {
    fontSize: "4rem",
    lineHeight: 1,
    mb: 0,
  },

  title: {
    fontWeight: 600,
    color: "error.main",
    mb: 2,
    letterSpacing: "-0.01em",
  },

  description: {
    color: "text.secondary",
    lineHeight: 1.6,
    mb: 4,
  },

  retryButton: {
    px: 4,
    py: 1.5,
    borderRadius: "12px",
    fontSize: "0.95rem",
    fontWeight: 600,
    letterSpacing: "0.01em",
    background:
      "linear-gradient(135deg, #6366F1 0%, #8B5CF6 50%, #A855F7 100%)",
    boxShadow: "0 4px 16px rgba(99, 102, 241, 0.3)",
    border: "none",
    color: "white",
    transition: "all 0.25s ease",
    "&:hover": {
      background:
        "linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #9333EA 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 8px 25px rgba(99, 102, 241, 0.4)",
    },
    "&:active": {
      transform: "translateY(0px)",
    },
  },
} as const;
