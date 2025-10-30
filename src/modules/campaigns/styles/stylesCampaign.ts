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
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.primary.light}`,
}));

export const CampaignCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  background: theme.palette.background.paper,
  boxShadow: theme.shadows[1],
  transition: theme.transitions.create(["transform", "box-shadow"], {
    duration: theme.transitions.duration.short,
  }),
  border: `1px solid transparent`,
  "&:hover": {
    transform: "translateY(-2px)",
    boxShadow: theme.shadows[4],
    borderColor: theme.palette.primary.light,
  },
}));

export const FormContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(4),
  boxShadow: theme.shadows[1],
  border: `1px solid ${theme.palette.grey[300]}`,
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

  formCard: {
    borderRadius: 3,
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    padding: 3,
    transition: "none",
    "&:hover": {
      transform: "none",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
  },
  headerActions: {
    "& > *": {
      borderRadius: 3,
      px: 3,
    },
  },
  saveButton: {
    borderRadius: 3,
    px: 4,
    background: `linear-gradient(135deg, ${colors.primary[500]} 0%, #2196F3 100%)`,
    "&:hover": {
      background: `linear-gradient(135deg, ${colors.primary[600]} 0%, #1976D2 100%)`,
    },
  },

  tabsContainer: {
    borderBottom: 1,
    borderColor: "divider",
  },
  tabs: {
    px: 4,
    "& .MuiTab-root": {
      textTransform: "none",
      fontWeight: 600,
      fontSize: "1rem",
      py: 2,
    },
    "& .MuiTabs-indicator": {
      background: `linear-gradient(135deg, ${colors.primary[500]} 0%, #2196F3 100%)`,
      height: 3,
      borderRadius: "2px 2px 0 0",
    },
  },

  field: {
    "& .MuiOutlinedInput-root": {
      borderRadius: 2,
      transition: "all 0.2s ease-in-out",
      "& fieldset": {
        borderColor: "rgba(0, 0, 0, 0.12)",
        transition: "border-color 0.2s ease-in-out",
      },
      "&:hover fieldset": {
        borderColor: colors.primary[500],
        boxShadow: `0 0 0 1px ${colors.primary[500]}20`,
      },
      "&.Mui-focused fieldset": {
        borderColor: colors.primary[500],
        borderWidth: "2px",
        boxShadow: `0 0 0 3px ${colors.primary[500]}15`,
      },
    },
    "& .MuiInputLabel-root": {
      fontWeight: 500,
    },
    "& .MuiOutlinedInput-input": {
      padding: "14px 14px",
    },
  },

  personsPlaceholder: {
    backgroundColor: "grey.50",
    border: "2px dashed",
    borderColor: "grey.300",
    textAlign: "center",
    py: 6,
    borderRadius: 2,
  },

  listTitle: {
    fontWeight: 700,
    mb: 1,
  },
  createButton: {
    px: 4,
  },
  campaignTitle: {
    fontWeight: 600,
    flex: 1,
  },
  campaignDescription: {
    mb: 2,
  },
  campaignDate: {
    mt: 2,
  },

  formHeader: {
    mb: 3,
  },
  formGrid: {
    p: 4,
  },

  personsDescription: {
    mb: 2,
  },
  personsFeatureList: {
    textAlign: "left",
    mt: 2,
    color: "text.disabled",
  },
  underlinedButton: {
    textDecoration: "underline",
    p: 0,
  },
} as const;
