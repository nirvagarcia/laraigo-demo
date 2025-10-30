import { AppBox } from "@shared/components/ui/AppBox";
import { AppText } from "@shared/components/ui/AppText";
import { CardPlaceholder } from "@shared/components/ui/CardPlaceholder";
import { useTranslation } from "@app/providers/I18nProvider";
import { campaignSx } from "../styles/stylesCampaign";

export const PersonsTab: React.FC = () => {
  const { t } = useTranslation();

  return (
    <AppBox>
      <CardPlaceholder>
        <AppText variant="h6" color="secondary" gutterBottom>
          👥 {t("tabs.persons")}
        </AppText>
        <AppText
          variant="body1"
          color="secondary"
          sx={campaignSx.personsMainDescription}
        >
          {t("persons.tab.description")}
        </AppText>
        <AppText variant="body2" sx={campaignSx.personsFeaturesDescription}>
          {t("persons.tab.features")}
        </AppText>
        <AppBox component="ul" sx={campaignSx.personsFeaturesList}>
          <li>{t("persons.feature.audiences")}</li>
          <li>{t("persons.feature.demographics")}</li>
          <li>{t("persons.feature.behavior")}</li>
          <li>{t("persons.feature.exclusion")}</li>
          <li>{t("persons.feature.validation")}</li>
        </AppBox>
      </CardPlaceholder>
    </AppBox>
  );
};

export default PersonsTab;
