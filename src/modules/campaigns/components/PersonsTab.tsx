import { Box, Typography, Card, CardContent } from "@mui/material";
import { useTranslation } from "@app/providers/I18nProvider";
import { campaignSx } from "../styles/stylesCampaign";

export const PersonsTab: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Box>
      <Card elevation={0} sx={campaignSx.personsPlaceholder}>
        <CardContent>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            👥 {t("tabs.persons")}
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={campaignSx.personsDescription}
          >
            {t("persons.tab.description")}
          </Typography>
          <Typography variant="body2" color="text.disabled">
            {t("persons.tab.features")}
          </Typography>
          <Box component="ul" sx={campaignSx.personsFeatureList}>
            <li>{t("persons.feature.audiences")}</li>
            <li>{t("persons.feature.demographics")}</li>
            <li>{t("persons.feature.behavior")}</li>
            <li>{t("persons.feature.exclusion")}</li>
            <li>{t("persons.feature.validation")}</li>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PersonsTab;
