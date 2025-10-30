import { useState, useCallback, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Tabs, Tab, Stack } from "@mui/material";
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
import { campaignService, CampaignError } from "../services/campaignService";
import { toast } from "../utils/toast";
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

const CampaignFormInner: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState(0);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useCampaign();

  const isEditing = id && id !== "new";
  const pageTitle = isEditing ? t("campaign.edit") : t("campaign.create");

  const onSubmit = useCallback(
    async (data: CampaignFormData) => {
      try {
        await campaignService.save(data, isEditing ? id : undefined);
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
    [id, isEditing, navigate, t]
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
              disabled={isSubmitting}
            >
              {t("buttons.cancel")}
            </Button>
            <Button
              type="submit"
              variant="primary"
              disabled={isSubmitting}
              form="campaign-form"
              sx={campaignSx.campaignFormSaveButton}
            >
              {isSubmitting
                ? t("campaign.form.saving")
                : t("buttons.save_campaign")}
            </Button>
          </Stack>
        </AppBox>

        <Card sx={campaignSx.campaignFormCard}>
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
