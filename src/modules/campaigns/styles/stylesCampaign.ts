import { styled } from "@mui/material/styles";
import { Box, Paper } from "@mui/material";
import { colors } from "@shared/styles/colors";

export const CampaignContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  minHeight: "100vh",
  background: colors.neutral[50],
}));

export const CampaignHeader = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  padding: theme.spacing(3),
  background:
    "linear-gradient(135deg, rgba(106, 17, 203, 0.05) 0%, rgba(37, 117, 252, 0.05) 100%)",
  borderRadius: theme.spacing(2),
  border: `1px solid ${colors.primary[100]}`,
}));

export const CampaignCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(2),
  background: "white",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  transition: "all 0.2s ease-in-out",
  border: "1px solid transparent",
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    borderColor: colors.primary[200],
  },
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  background: "white",
  borderRadius: theme.spacing(2),
  padding: theme.spacing(4),
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  border: `1px solid ${colors.neutral[200]}`,
}));

export const campaignSx = {
  listContainer: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" },
    gap: 3,
    mt: 3,
  },
  statusChip: {
    fontWeight: 600,
    borderRadius: 2,
  },
  dateText: {
    color: colors.neutral[600],
    fontSize: "0.875rem",
  },
  actionButton: {
    minWidth: "auto",
    p: 1,
    borderRadius: 2,
  },
} as const;
