import React from "react";
import { AppBox } from "./AppBox";
import { AppText } from "./AppText";

interface StatusBadgeProps {
  status: "active" | "draft" | "paused";
  label: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  return (
    <AppBox sx={statusBadgeSx.container}>
      <AppText
        variant="caption"
        sx={statusBadgeSx[`${status}Badge` as keyof typeof statusBadgeSx]}
      >
        {label}
      </AppText>
    </AppBox>
  );
};

const statusBadgeSx = {
  container: {
    display: "inline-block",
  },

  activeBadge: {
    px: 2,
    py: 0.5,
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    textTransform: "uppercase",
    background: "linear-gradient(135deg, #10B981 0%, #34D399 100%)",
    color: "white",
    boxShadow: "0 2px 8px rgba(16, 185, 129, 0.3)",
    border: "none",
    display: "inline-block",
  },

  draftBadge: {
    px: 2,
    py: 0.5,
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    textTransform: "uppercase",
    background: "linear-gradient(135deg, #F59E0B 0%, #FBBF24 100%)",
    color: "white",
    boxShadow: "0 2px 8px rgba(245, 158, 11, 0.3)",
    border: "none",
    display: "inline-block",
  },

  pausedBadge: {
    px: 2,
    py: 0.5,
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    textTransform: "uppercase",
    background: "linear-gradient(135deg, #3B82F6 0%, #60A5FA 100%)",
    color: "white",
    boxShadow: "0 2px 8px rgba(59, 130, 246, 0.3)",
    border: "none",
    display: "inline-block",
  },
} as const;
