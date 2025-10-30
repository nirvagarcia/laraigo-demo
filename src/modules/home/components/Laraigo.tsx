import { Box, Typography, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@shared/components/ui/Button";
import { Chip } from "@shared/components/ui/Chip";
import { useTranslation } from "@app/providers/I18nProvider";
import { colors } from "@shared/styles/colors";

export const Laraigo: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoToCampaigns = () => {
    navigate("/campaigns");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: colors.gradient.primary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.1)",
          filter: "blur(40px)",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: "50%",
          background: "rgba(255, 255, 255, 0.08)",
          filter: "blur(30px)",
        }}
      />

      <Box
        sx={{
          textAlign: "center",
          color: "white",
          maxWidth: 800,
          zIndex: 1,
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          justifyContent="center"
          sx={{ mb: 4 }}
        >
          <Chip
            label="🚀 AI Powered"
            gradient
            color="secondary"
            sx={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          />
          <Chip
            label="⚡ Real-time"
            gradient
            color="secondary"
            sx={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          />
          <Chip
            label="📊 Analytics"
            gradient
            color="secondary"
            sx={{
              background: "rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
            }}
          />
        </Stack>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "3rem", md: "4.5rem", lg: "6rem" },
            fontWeight: 700,
            mb: 3,
            textShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
            background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("app.welcome")}
        </Typography>

        <Typography
          variant="h4"
          sx={{
            fontSize: { xs: "1.25rem", md: "1.5rem" },
            fontWeight: 500,
            mb: 2,
            opacity: 0.95,
            textShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          {t("app.subtitle")}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.125rem" },
            mb: 6,
            opacity: 0.9,
            lineHeight: 1.6,
            maxWidth: 600,
            mx: "auto",
            textShadow: "0 1px 5px rgba(0, 0, 0, 0.2)",
          }}
        >
          {t("app.description")}
        </Typography>

        <Button
          variant="primary"
          size="large"
          onClick={handleGoToCampaigns}
          sx={{
            fontSize: "1.125rem",
            fontWeight: 600,
            px: 6,
            py: 2,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.95)",
            color: colors.primary[600],
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.2)",
            transition: "all 0.3s ease",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            "&:hover": {
              background: "rgba(255, 255, 255, 1)",
              transform: "translateY(-3px)",
              boxShadow: "0 12px 35px rgba(0, 0, 0, 0.25)",
            },
          }}
        >
          🚀 {t("buttons.go_to_campaigns")}
        </Button>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={4}
          justifyContent="center"
          sx={{ mt: 8 }}
        >
          <Box sx={{ textAlign: "center", opacity: 0.9 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              📢 Smart Campaigns
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              AI-driven campaign optimization
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", opacity: 0.9 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              📋 Dynamic Templates
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Pre-built marketing templates
            </Typography>
          </Box>
          <Box sx={{ textAlign: "center", opacity: 0.9 }}>
            <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
              📈 Deep Analytics
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Real-time performance insights
            </Typography>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
};

export default Laraigo;
