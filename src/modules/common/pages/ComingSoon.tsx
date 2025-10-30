import { Fade, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Button } from "@shared/components/ui/Button";
import { AppText } from "@shared/components/ui/AppText";
import { AppBox } from "@shared/components/ui/AppBox";
import { PageContainer } from "@shared/components/layout/PageContainer";
import { useTranslation } from "@app/providers/I18nProvider";
import { comingSoonSx } from "../styles/stylesCommon";

interface ComingSoonProps {
  titleKey?: string;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({ titleKey }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <PageContainer centered fullHeight>
      <Fade in timeout={800}>
        <AppBox
          direction="column"
          align="center"
          justify="center"
          gap={4}
          sx={comingSoonSx.container}
        >
          <AppText
            variant="h3"
            color="primary"
            weight="bold"
            sx={comingSoonSx.title}
          >
            🚧 {titleKey ? t(titleKey) : t("common.coming_soon")}
          </AppText>

          <AppText variant="h6" color="secondary" sx={comingSoonSx.description}>
            {t("common.coming_soon_description")}
          </AppText>

          <Button
            variant="primary"
            size="large"
            onClick={() => navigate("/")}
            sx={comingSoonSx.button(theme)}
          >
            {t("common.back_to_home")}
          </Button>
        </AppBox>
      </Fade>
    </PageContainer>
  );
};

export default ComingSoon;
