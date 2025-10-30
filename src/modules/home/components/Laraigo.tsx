import { useNavigate } from "react-router-dom";
import { AppHero } from "@shared/components/ui/AppHero";
import { AppText } from "@shared/components/ui/AppText";
import { AppBox } from "@shared/components/ui/AppBox";
import { HeroChip } from "@shared/components/ui/HeroChip";
import { GradientButton } from "@shared/components/ui/GradientButton";
import { FeatureGrid } from "@shared/components/ui/FeatureGrid";
import { useTranslation } from "@app/providers/I18nProvider";
import { layouts } from "@shared/styles/layouts";
import { laraigoSx } from "../styles/stylesLaraigo";

export const Laraigo: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoToCampaigns = () => {
    navigate("/campaigns");
  };

  const featureChips = [
    { id: "ai", label: "🚀 AI Powered" },
    { id: "realtime", label: "⚡ Real-time" },
    { id: "analytics", label: "📊 Analytics" },
  ];

  const features = [
    {
      id: "campaigns",
      icon: "📢",
      title: "Smart Campaigns",
      description: "AI-driven campaign optimization",
    },
    {
      id: "templates",
      icon: "📋",
      title: "Dynamic Templates",
      description: "Pre-built marketing templates",
    },
    {
      id: "analytics",
      icon: "📈",
      title: "Deep Analytics",
      description: "Real-time performance insights",
    },
  ];

  return (
    <AppHero background="gradient" height="fullscreen" decorated>
      <AppBox
        direction="column"
        align="center"
        gap={4}
        sx={layouts.heroContent}
      >
        <AppBox direction="row" gap={2} justify="center">
          {featureChips.map((chip) => (
            <HeroChip
              key={chip.id}
              label={chip.label}
              gradient
              color="secondary"
              blurred
            />
          ))}
        </AppBox>

        <AppText variant="h1" weight="bold" sx={laraigoSx.heroTitle}>
          {t("app.welcome")}
        </AppText>

        <AppText variant="h4" weight="medium" sx={laraigoSx.heroSubtitle}>
          {t("app.subtitle")}
        </AppText>

        <AppText variant="body1" sx={laraigoSx.heroDescription}>
          {t("app.description")}
        </AppText>

        <GradientButton variant="primary" onClick={handleGoToCampaigns}>
          🚀 {t("buttons.go_to_campaigns")}
        </GradientButton>

        <FeatureGrid features={features} gap={4} sx={laraigoSx.featureGrid} />
      </AppBox>
    </AppHero>
  );
};

export default Laraigo;
