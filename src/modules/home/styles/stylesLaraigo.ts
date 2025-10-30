import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const HeroContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: theme.spacing(4),
  padding: theme.spacing(4),
}));

export const FeatureChipContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(2),
  justifyContent: "center",
  flexWrap: "wrap",
}));

export const FeatureGridContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
  gap: theme.spacing(4),
  justifyContent: "center",
  marginTop: theme.spacing(8),
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    gap: theme.spacing(2),
  },
}));

export const FeatureItem = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  opacity: 0.9,
}));

export const laraigoSx = {
  featureChip: {
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
  },

  heroTitle: {
    fontSize: { xs: "3rem", md: "4.5rem", lg: "6rem" },
    textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
    background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textAlign: "center",
  },

  heroSubtitle: {
    fontSize: { xs: "1.25rem", md: "1.5rem" },
    opacity: 0.95,
    textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    textAlign: "center",
  },

  heroDescription: {
    fontSize: { xs: "1rem", md: "1.125rem" },
    opacity: 0.9,
    lineHeight: 1.6,
    maxWidth: "600px",
    textAlign: "center",
    textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
  },

  gradientButton: (theme: any) => ({
    fontSize: "1.125rem",
    fontWeight: 600,
    px: theme.spacing(6),
    py: theme.spacing(2),
    borderRadius: theme.spacing(3),
    background: "rgba(255, 255, 255, 0.95)",
    color: theme.palette.primary.dark,
    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    "&:hover": {
      background: "rgba(255, 255, 255, 1)",
      transform: "translateY(-3px)",
      boxShadow: "0 12px 35px rgba(0, 0, 0, 0.25)",
    },
  }),

  featureTitle: (theme: any) => ({
    mb: theme.spacing(1),
    textAlign: "center",
  }),

  featureDescription: {
    opacity: 0.8,
    textAlign: "center",
  },

  featureGridResponsive: {
    flexDirection: { xs: "column", md: "row" },
  },

  featureGrid: {
    mt: 8,
  },
} as const;
