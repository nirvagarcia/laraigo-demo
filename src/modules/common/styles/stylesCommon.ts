import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

export const ComingSoonContainer = styled(Box)(({ theme }) => ({
  textAlign: "center",
  background: "linear-gradient(180deg, #f9f9ff 0%, #ffffff 100%)",
  borderRadius: theme.spacing(3),
  padding: theme.spacing(6),
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  maxWidth: "600px",
  width: "100%",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-2px)",
  },
}));

export const comingSoonSx = {
  container: {
    textAlign: "center",
    background: "linear-gradient(180deg, #f9f9ff 0%, #ffffff 100%)",
    borderRadius: 3,
    p: 6,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    maxWidth: "600px",
    width: "100%",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
      transform: "translateY(-2px)",
    },
  },

  title: {
    fontSize: { xs: "2rem", md: "3rem" },
    textAlign: "center",
  },

  description: {
    maxWidth: "450px",
    lineHeight: 1.6,
    fontSize: { xs: "1rem", md: "1.25rem" },
    textAlign: "center",
  },

  button: (theme: any) => ({
    textTransform: "none",
    px: theme.spacing(4),
    py: theme.spacing(1.5),
    fontSize: "1.1rem",
    borderRadius: theme.spacing(2),
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    "&:hover": {
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
    },
  }),
} as const;
