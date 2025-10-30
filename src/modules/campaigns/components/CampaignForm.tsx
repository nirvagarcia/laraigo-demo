import { useState, useCallback, memo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Typography, Tabs, Tab, Stack, Card } from "@mui/material";
import { Button } from "@shared/components/ui/Button";
import { PageContainer } from "@shared/components/layout/PageContainer";
import { useTranslation } from "@app/providers/I18nProvider";
import { CampaignFormData } from "../schemas/campaignSchema";
import { CampaignProvider, useCampaign } from "../contexts/CampaignContext";
import { campaignService, CampaignError } from "../services/campaignService";
import { toast } from "../utils/toast";
import { goToCampaignsList } from "../utils/navigation";
import { GeneralTab } from "./GeneralTab";
import { PersonsTab } from "./PersonsTab";
import {
  CampaignContainer,
  CampaignHeader,
  campaignSx,
} from "../styles/stylesCampaign";

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
      {value === index && <Box>{children}</Box>}
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
      <CampaignContainer>
        <CampaignHeader>
          <Box>
            <Typography variant="h4" sx={campaignSx.listTitle}>
              {pageTitle}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {isEditing
                ? t("campaign.form.description.edit")
                : t("campaign.form.description.create")}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} sx={campaignSx.headerActions}>
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
              sx={campaignSx.saveButton}
            >
              {isSubmitting
                ? t("campaign.form.saving")
                : t("buttons.save_campaign")}
            </Button>
          </Stack>
        </CampaignHeader>

        <Card elevation={1} sx={campaignSx.formCard}>
          <form id="campaign-form" onSubmit={handleSubmit(onSubmit)}>
            <Box sx={campaignSx.tabsContainer}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                sx={campaignSx.tabs}
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
            </Box>

            <Box sx={campaignSx.formGrid}>
              <TabPanel value={activeTab} index={0}>
                <GeneralTab />
              </TabPanel>

              <TabPanel value={activeTab} index={1}>
                <PersonsTab />
              </TabPanel>
            </Box>
          </form>
        </Card>
      </CampaignContainer>
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
