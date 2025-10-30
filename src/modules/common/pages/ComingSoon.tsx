import { Box, Typography, Button, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { PageContainer } from "@shared/components/layout/PageContainer";
import { useTranslation } from "@app/providers/I18nProvider";

interface ComingSoonProps {
  titleKey?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ titleKey }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <PageContainer centered fullHeight>
      <Fade in timeout={800}>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            textAlign: "center",
            background: "linear-gradient(180deg, #f9f9ff 0%, #ffffff 100%)",
            borderRadius: 3,
            p: 6,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
            maxWidth: 600,
            width: "100%",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              mb: 3,
              color: "primary.main",
              fontSize: { xs: "2rem", md: "3rem" },
            }}
          >
            🚧 {titleKey ? t(titleKey) : t("common.coming_soon")}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 4,
              maxWidth: 450,
              lineHeight: 1.6,
              fontSize: { xs: "1rem", md: "1.25rem" },
            }}
          >
            {t("common.coming_soon_description")}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              textTransform: "none",
              px: 4,
              py: 1.5,
              fontSize: "1.1rem",
              borderRadius: 2,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              "&:hover": {
                boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)",
              },
            }}
          >
            {t("common.back_to_home")}
          </Button>
        </Box>
      </Fade>
    </PageContainer>
  );
};

export default ComingSoon;
