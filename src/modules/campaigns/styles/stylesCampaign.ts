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
    gridTemplateColumns: {
      xs: "1fr",
      md: "repeat(auto-fit, minmax(320px, 1fr))",
    },
    gap: 4,
    mt: 4,
    mb: 4,
  },

  modernCard: {
    borderRadius: "20px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
    transition: "all 0.25s ease",
    overflow: "hidden",
    position: "relative",
    p: 3,
    cursor: "pointer",
    animation: "fadeInGrow 0.5s ease-out",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)",
      transition: "left 0.5s ease",
    },
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
      background: "rgba(255, 255, 255, 0.95)",
      "&:before": {
        left: "100%",
      },
    },
    "&:focus": {
      outline: "none",
      boxShadow: `0 0 0 3px ${colors.primary[200]}, 0 12px 40px rgba(0, 0, 0, 0.15)`,
      borderColor: "primary.main",
    },
    "&:focus-visible": {
      outline: `2px solid ${colors.primary[500]}`,
      outlineOffset: "2px",
    },
    "@keyframes fadeInGrow": {
      "0%": {
        opacity: 0,
        transform: "scale(0.95) translateY(20px)",
      },
      "100%": {
        opacity: 1,
        transform: "scale(1) translateY(0)",
      },
    },
  },

  cardTintActive: {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%), rgba(0, 200, 83, 0.05)",
  },
  cardTintDraft: {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%), rgba(255, 193, 7, 0.05)",
  },
  cardTintPaused: {
    background:
      "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 255, 255, 0.9) 100%), rgba(33, 150, 243, 0.05)",
  },

  cardContent: {
    p: 3,
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: 3,
    gap: 2,
  },

  cardTitle: {
    fontWeight: 700,
    fontSize: "1.25rem",
    lineHeight: 1.3,
    letterSpacing: "-0.02em",
    color: "text.primary",
    flex: 1,
    mb: 1,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  cardDescription: {
    fontSize: "0.95rem",
    lineHeight: 1.5,
    color: "text.secondary",
    mb: 2.5,
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },

  statusBadge: {
    borderRadius: "20px",
    px: 2,
    py: 0.5,
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.025em",
    textTransform: "uppercase",
    border: "none",
    background:
      "linear-gradient(135deg, var(--status-color-main) 0%, var(--status-color-light) 100%)",
    color: "white",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },

  actionButtonsContainer: {
    display: "flex",
    gap: 1,
  },

  glassIconButton: {
    minWidth: "auto",
    width: "36px",
    height: "36px",
    borderRadius: "12px",
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    color: "text.secondary",
    opacity: 0.7,
    transition: "all 0.2s ease",
    position: "relative",
    overflow: "hidden",
    "&:before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      width: "0",
      height: "0",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.4)",
      transition: "all 0.25s ease",
      transform: "translate(-50%, -50%)",
    },
    "&:hover": {
      opacity: 1,
      background: "rgba(255, 255, 255, 0.95)",
      transform: "translateY(-1px) scale(1.05)",
      boxShadow: "0 6px 16px rgba(0, 0, 0, 0.1)",
      color: "primary.main",
      "&:before": {
        width: "120%",
        height: "120%",
      },
    },
    "&:active": {
      transform: "translateY(0) scale(0.98)",
    },
    "&:focus": {
      outline: "none",
      opacity: 1,
      boxShadow: `0 0 0 2px ${colors.primary[300]}`,
      borderColor: "primary.main",
    },
    "&:focus-visible": {
      outline: `2px solid ${colors.primary[500]}`,
      outlineOffset: "2px",
    },
  },

  cardActions: {
    position: "absolute",
    top: 16,
    right: 16,
    display: "flex",
    gap: 0.5,
    opacity: 0,
    transition: "opacity 0.2s ease",
    ".modernCard:hover &": {
      opacity: 1,
    },
  },

  deleteIconButton: {
    "&:hover": {
      background: "rgba(248, 113, 113, 0.1)",
      color: "error.main",
      borderColor: "rgba(248, 113, 113, 0.2)",
    },
  },

  createCampaignButton: {
    borderRadius: "12px",
    px: 4,
    py: 1.5,
    fontSize: "0.95rem",
    fontWeight: 600,
    letterSpacing: "0.01em",
    background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 50%, #2196F3 100%)`,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
    border: "none",
    color: "white",
    transition: "all 0.25s ease",
    "&:hover": {
      background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 50%, #1976D2 100%)`,
      transform: "translateY(-1px)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.18)",
    },
    "&:active": {
      transform: "translateY(0px)",
    },
  },

  listHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: 4,
    gap: 3,
    flexWrap: { xs: "wrap", md: "nowrap" },
  },

  listHeaderContent: {
    flex: 1,
  },

  listSubtitle: {
    fontSize: "1rem",
    color: "text.secondary",
    lineHeight: 1.5,
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
    fontSize: "2rem",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    color: "text.primary",
    mb: 1,
    background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[800]} 100%)`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  createButton: {
    borderRadius: "12px",
    px: 4,
    py: 1.5,
    fontSize: "0.95rem",
    fontWeight: 600,
    letterSpacing: "0.01em",
    background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 50%, #2196F3 100%)`,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
    border: "none",
    color: "white",
    transition: "all 0.25s ease",
    "&:hover": {
      background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 50%, #1976D2 100%)`,
      transform: "translateY(-1px)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.18)",
    },
    "&:active": {
      transform: "translateY(0px)",
    },
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

  personsCard: {
    border: 1,
    borderColor: "divider",
    borderStyle: "dashed",
    backgroundColor: "grey.50",
    textAlign: "center",
    p: 4,
  },

  personsCardContent: {
    "&:last-child": { pb: 4 },
  },

  personsTitle: {
    color: "text.secondary",
    gutterBottom: true,
  },

  personsMainDescription: {
    color: "text.secondary",
    mb: 2,
  },

  personsFeaturesDescription: {
    color: "text.disabled",
    mb: 2,
  },

  personsFeaturesList: {
    listStyle: "none",
    padding: 0,
    margin: 0,
    "& li": {
      color: "text.secondary",
      fontSize: "0.875rem",
      mb: 1,
      "&:before": {
        content: "'•'",
        color: "primary.main",
        mr: 1,
      },
    },
  },

  campaignFormContainer: {
    py: 4,
  },

  campaignFormHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: 4,
    gap: 3,
    flexWrap: { xs: "wrap", md: "nowrap" },
  },

  campaignFormTitle: {
    fontSize: "1.875rem",
    fontWeight: 800,
    letterSpacing: "-0.02em",
    mb: 1,
    background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[800]} 100%)`,
    backgroundClip: "text",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  campaignFormActions: {
    minWidth: "auto",
    flexShrink: 0,
  },

  campaignFormSaveButton: {
    minWidth: "auto",
    px: 4,
    py: 1.5,
    borderRadius: "12px",
    fontSize: "0.95rem",
    fontWeight: 600,
    letterSpacing: "0.01em",
    background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 50%, #2196F3 100%)`,
    boxShadow: "0 4px 16px rgba(0, 0, 0, 0.12)",
    border: "none",
    color: "white",
    transition: "all 0.25s ease",
    "&:hover": {
      background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 50%, #1976D2 100%)`,
      transform: "translateY(-1px)",
      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.18)",
    },
    "&:active": {
      transform: "translateY(0px)",
    },
    "&:disabled": {
      background: "rgba(0, 0, 0, 0.12)",
      transform: "none",
      boxShadow: "none",
      cursor: "not-allowed",
    },
    "&:focus": {
      outline: "none",
      boxShadow: `0 0 0 3px ${colors.primary[200]}, 0 8px 25px rgba(0, 0, 0, 0.18)`,
    },
    "&:focus-visible": {
      outline: `2px solid ${colors.primary[500]}`,
      outlineOffset: "2px",
    },
  },

  campaignFormCard: {
    p: 0,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
  },

  campaignFormTabsContainer: {
    borderBottom: 1,
    borderColor: "divider",
    px: 3,
    pt: 3,
  },

  campaignFormTabs: {
    minHeight: "auto",
    "& .MuiTab-root": {
      minHeight: "auto",
      py: 1.5,
      px: 2,
      fontSize: "0.875rem",
      fontWeight: 500,
    },
  },

  campaignFormTabPanel: {
    p: 3,
  },

  listHeaderContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    mb: 4,
    gap: 3,
    flexWrap: { xs: "wrap", md: "nowrap" },
  },

  listSkeleton: {
    mb: 2,
  },

  skeletonHeader: {
    mb: 2,
  },

  skeletonTitle: {
    fontSize: "1.25rem",
    transform: "scale(1, 0.8)",
  },

  skeletonActions: {
    borderRadius: 3,
    mt: 1,
  },

  skeletonDescription: {
    mb: 1,
    fontSize: "0.875rem",
    transform: "scale(1, 0.8)",
  },

  skeletonDate: {
    fontSize: "0.75rem",
    transform: "scale(1, 0.6)",
  },

  loadingContainer: {
    py: 4,
  },

  loadingGrid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      md: "1fr 1fr",
      lg: "1fr 1fr 1fr",
    },
    gap: 3,
    mt: 3,
  },

  errorContainer: {
    py: 4,
  },

  errorContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "400px",
    justifyContent: "center",
  },

  campaignCardContainer: {
    mb: 2,
  },

  campaignCardHeader: {
    mb: 3,
  },

  campaignCardTitleRow: {
    direction: "row",
    justifyContent: "space-between",
    alignItems: "start",
    sx: { mb: 2 },
  },

  campaignCardTitle: {
    fontWeight: 600,
    flex: 1,
    color: "text.primary",
  },

  campaignCardActions: {
    direction: "row",
    spacing: 1,
  },

  editButton: {
    minWidth: "auto",
    p: 1,
    borderRadius: 2,
    color: "text.secondary",
    "&:hover": {
      backgroundColor: "action.hover",
      color: "primary.main",
    },
  },

  deleteButton: {
    minWidth: "auto",
    p: 1,
    borderRadius: 2,
    color: "text.secondary",
    "&:hover": {
      backgroundColor: "error.50",
      color: "error.main",
    },
  },

  statusChipContainer: {
    fontWeight: 600,
    borderRadius: 2,
  },

  campaignListDescription: {
    variant: "body2",
    color: "text.secondary",
    sx: { mb: 2 },
  },

  campaignDateContainer: {
    mt: 2,
  },

  campaignDateText: {
    color: "text.secondary",
    fontSize: "0.875rem",
  },

  emptyState: {
    textAlign: "center",
    py: 8,
    px: 4,
  },

  emptyStateIcon: {
    fontSize: "4rem",
    color: "text.disabled",
    mb: 2,
  },

  emptyStateTitle: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: "text.secondary",
    mb: 1,
  },

  emptyStateSubtitle: {
    color: "text.disabled",
    mb: 3,
    maxWidth: "400px",
    mx: "auto",
  },

  campaignGrid: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(auto-fill, minmax(360px, 1fr))",
    },
    gap: 3,
    mt: 3,
    "& > *": {
      animation: "fadeInUpStagger 0.6s ease-out backwards",
    },
    "& > *:nth-of-type(1)": { animationDelay: "0.1s" },
    "& > *:nth-of-type(2)": { animationDelay: "0.2s" },
    "& > *:nth-of-type(3)": { animationDelay: "0.3s" },
    "& > *:nth-of-type(4)": { animationDelay: "0.4s" },
    "& > *:nth-of-type(5)": { animationDelay: "0.5s" },
    "& > *:nth-of-type(6)": { animationDelay: "0.6s" },
    "@keyframes fadeInUpStagger": {
      "0%": {
        opacity: 0,
        transform: "translateY(30px) scale(0.95)",
      },
      "100%": {
        opacity: 1,
        transform: "translateY(0) scale(1)",
      },
    },
  },

  loadingCard: {
    minHeight: "200px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
    position: "relative",
    overflow: "hidden",
    "&:before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: "-100%",
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
      animation: "shimmer 1.5s ease-in-out infinite",
    },
    "@keyframes shimmer": {
      "0%": { left: "-100%" },
      "100%": { left: "100%" },
    },
  },

  skeletonPulse: {
    animation: "pulse 1.5s ease-in-out infinite",
    "@keyframes pulse": {
      "0%, 100%": { opacity: 1 },
      "50%": { opacity: 0.5 },
    },
  },

  errorCard: {
    background:
      "linear-gradient(135deg, rgba(255, 243, 243, 0.9) 0%, rgba(255, 236, 236, 0.6) 100%)",
    border: "1px solid rgba(239, 68, 68, 0.3)",
    borderLeft: "4px solid #EF4444",
    color: "error.main",
    animation: "shake 0.5s ease-in-out",
    "@keyframes shake": {
      "0%, 100%": { transform: "translateX(0)" },
      "25%": { transform: "translateX(-5px)" },
      "75%": { transform: "translateX(5px)" },
    },
  },

  loadingButton: {
    position: "relative",
    "&:disabled": {
      background: `linear-gradient(135deg, ${colors.primary[300]} 0%, ${colors.primary[400]} 100%)`,
      cursor: "wait",
      "& .MuiCircularProgress-root": {
        color: "white",
        position: "absolute",
        top: "50%",
        left: "50%",
        marginTop: "-12px",
        marginLeft: "-12px",
      },
    },
  },
} as const;
