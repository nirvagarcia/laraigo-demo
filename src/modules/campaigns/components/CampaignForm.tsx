import { useState, useCallback, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, Tab, Stack, Skeleton } from "@mui/material";
import { Button } from "@shared/components/ui/Button";
import { Card } from "@shared/components/ui/Card";
import { AppBox } from "@shared/components/ui/AppBox";
import { AppText } from "@shared/components/ui/AppText";
import { PageContainer } from "@shared/components/layout/PageContainer";
import { globalStyles } from "@shared/styles/globals";
import { useTranslation } from "@app/providers/I18nProvider";
import { campaignSx } from "../styles/stylesCampaign";
import { CampaignFormData } from "../schemas/campaignSchema";
import { CampaignProvider, useCampaign } from "../contexts/CampaignContext";
import { useCampaigns } from "../contexts/CampaignsProvider";
import { CampaignError } from "../services/campaignService";
import { useToast } from "@shared/components/ui";
import { goToCampaignsList } from "../utils/navigation";
import { GeneralTab } from "./GeneralTab";
import { PersonsTab } from "./PersonsTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = memo<TabPanelProps>(({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`campaign-tabpanel-${index}`}
      aria-labelledby={`campaign-tab-${index}`}
    >
      {value === index && <AppBox>{children}</AppBox>}
    </div>
  );
});

const FormLoadingSkeleton: React.FC = () => (
  <Card sx={{ p: 3 }}>
    <AppBox sx={{ mb: 3 }}>
      <Skeleton variant="text" width="30%" height={32} sx={{ mb: 1 }} />
      <Skeleton variant="text" width="60%" height={24} sx={{ mb: 2 }} />
    </AppBox>

    <Stack spacing={3}>
      <Skeleton variant="rounded" width="100%" height={56} />
      <Skeleton variant="rounded" width="100%" height={120} />

      <AppBox sx={{ display: "flex", gap: 2 }}>
        <Skeleton variant="rounded" width="48%" height={56} />
        <Skeleton variant="rounded" width="48%" height={56} />
      </AppBox>

      <AppBox sx={{ display: "flex", gap: 2 }}>
        <Skeleton variant="rounded" width="48%" height={56} />
        <Skeleton variant="rounded" width="48%" height={56} />
      </AppBox>

      <Skeleton variant="rounded" width="100%" height={56} />
      <Skeleton variant="rounded" width="100%" height={56} />

      <AppBox
        sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}
      >
        <Skeleton variant="rounded" width={100} height={40} />
        <Skeleton variant="rounded" width={120} height={40} />
      </AppBox>
    </Stack>
  </Card>
);

const CampaignFormInner: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState(0);
  const { saveCampaign } = useCampaigns();
  const toast = useToast();

  const {
    handleSubmit,
    formState: { isSubmitting },
    isLoadingCampaign,
    isReady,
  } = useCampaign();

  const isEditing = id && id !== "new";
  const pageTitle = isEditing ? t("campaign.edit") : t("campaign.create");

  const onSubmit = useCallback(
    async (data: CampaignFormData) => {
      try {
        await saveCampaign(data, isEditing ? id : undefined);
        toast.success(
          isEditing
            ? t("messages.campaign_updated")
            : t("messages.campaign_created")
        );
        goToCampaignsList(navigate);
      } catch (error) {
        console.error("Error saving campaign:", error);

        if (error instanceof CampaignError) {
          toast.error(error.message);
        } else {
          toast.error(t("errors.save_failed"));
        }
      }
    },
    [id, isEditing, navigate, t, saveCampaign]
  );

  const handleCancel = useCallback(() => {
    goToCampaignsList(navigate);
  }, [navigate]);

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: number) => {
      setActiveTab(newValue);
    },
    []
  );

  if (isLoadingCampaign || !isReady) {
    return (
      <PageContainer>
        <AppBox
          sx={{
            ...globalStyles.container,
            ...campaignSx.campaignFormContainer,
          }}
        >
          <AppBox sx={campaignSx.campaignFormHeader}>
            <AppBox>
              <AppText variant="h4" sx={campaignSx.campaignFormTitle}>
                {pageTitle}
              </AppText>
            </AppBox>
            <Stack
              direction="row"
              spacing={2}
              sx={campaignSx.campaignFormActions}
            >
              <Skeleton variant="rounded" width={80} height={40} />
              <Skeleton variant="rounded" width={120} height={40} />
            </Stack>
          </AppBox>

          <FormLoadingSkeleton />
        </AppBox>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AppBox
        sx={{ ...globalStyles.container, ...campaignSx.campaignFormContainer }}
      >
        <AppBox sx={campaignSx.campaignFormHeader}>
          <AppBox>
            <AppText variant="h4" sx={campaignSx.campaignFormTitle}>
              {pageTitle}
            </AppText>
            <AppText variant="body1" color="secondary">
              {isEditing
                ? t("campaign.form.description.edit")
                : t("campaign.form.description.create")}
            </AppText>
          </AppBox>
          <Stack
            direction="row"
            spacing={2}
            sx={campaignSx.campaignFormActions}
          >
            <Button
              variant="outlined"
              onClick={handleCancel}
              disabled={isSubmitting || isLoadingCampaign || !isReady}
            >
              {t("buttons.cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting || isLoadingCampaign || !isReady}
              form="campaign-form"
              sx={campaignSx.campaignFormSaveButton}
            >
              {isSubmitting
                ? t("campaign.form.saving")
                : t("buttons.save_campaign")}
            </Button>
          </Stack>
        </AppBox>

        <Card
          sx={{
            ...campaignSx.campaignFormCard,
            animation: "fadeIn 0.4s ease-out",
            "@keyframes fadeIn": {
              "0%": { opacity: 0, transform: "translateY(10px)" },
              "100%": { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <form id="campaign-form" onSubmit={handleSubmit(onSubmit)}>
            <AppBox sx={campaignSx.campaignFormTabsContainer}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={campaignSx.campaignFormTabs}
              >
                <Tab
                  label={`📋 ${t("tabs.general")}`}
                  id="campaign-tab-0"
                  aria-controls="campaign-tabpanel-0"
                />
                <Tab
                  label={`👥 ${t("tabs.persons")}`}
                  id="campaign-tab-1"
                  aria-controls="campaign-tabpanel-1"
                />
              </Tabs>
            </AppBox>

            <AppBox sx={campaignSx.campaignFormTabPanel}>
              <TabPanel value={activeTab} index={0}>
                <GeneralTab />
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <PersonsTab />
              </TabPanel>
            </AppBox>
          </form>
        </Card>
      </AppBox>
    </PageContainer>
  );
};

export const CampaignForm: React.FC = () => {
  return (
    <CampaignProvider>
      <CampaignFormInner />
    </CampaignProvider>
  );
};

export default CampaignForm;
