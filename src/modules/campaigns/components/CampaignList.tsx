import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@shared/components/ui/Button";
import { Chip } from "@shared/components/ui/Chip";
import { PageContainer } from "@shared/components/layout/PageContainer";
import { useTranslation } from "@app/providers/I18nProvider";
import { useCampaigns, useCampaignStatus } from "../hooks";
import { goToNewCampaign, goToEditCampaign } from "../utils/navigation";
import {
  CampaignContainer,
  CampaignHeader,
  CampaignCard,
  campaignSx,
} from "../styles/stylesCampaign";

export const CampaignList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { campaigns, deleteCampaign } = useCampaigns();
  const { getStatusColor, getStatusLabel } = useCampaignStatus();

  const handleCreateCampaign = useCallback(() => {
    goToNewCampaign(navigate);
  }, [navigate]);

  const handleEditCampaign = useCallback(
    (id: string) => {
      goToEditCampaign(navigate, id);
    },
    [navigate]
  );

  const handleDeleteCampaign = useCallback(
    (id: string) => {
      deleteCampaign(id);
    },
    [deleteCampaign]
  );

  return (
    <PageContainer>
      <CampaignContainer>
        <CampaignHeader>
          <Box>
            <Typography variant="h4" sx={campaignSx.listTitle}>
              📢 {t("campaign.list")}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t("campaign.manage_description")}
            </Typography>
          </Box>
          <Button
            variant="primary"
            onClick={handleCreateCampaign}
            sx={campaignSx.createButton}
          >
            ➕ {t("buttons.create_campaign")}
          </Button>
        </CampaignHeader>

        <Box sx={campaignSx.listContainer}>
          {campaigns.map((campaign) => (
            <CampaignCard key={campaign.id} elevation={0}>
              <Box sx={campaignSx.formHeader}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="start"
                  sx={campaignSx.formHeader}
                >
                  <Typography variant="h6" sx={campaignSx.campaignTitle}>
                    {campaign.title}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <IconButton
                      size="small"
                      onClick={() => handleEditCampaign(campaign.id)}
                      sx={campaignSx.actionButton}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      sx={campaignSx.actionButton}
                      color="error"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>

                <Chip
                  label={getStatusLabel(campaign.status)}
                  color={getStatusColor(campaign.status)}
                  size="small"
                  sx={campaignSx.statusChip}
                />
              </Box>

              {campaign.description && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={campaignSx.campaignDescription}
                >
                  {campaign.description}
                </Typography>
              )}

              <Box sx={campaignSx.campaignDate}>
                <Typography variant="caption" sx={campaignSx.dateText}>
                  📅 {campaign.startDate.toLocaleDateString()} -{" "}
                  {campaign.endDate.toLocaleDateString()}
                </Typography>
              </Box>
            </CampaignCard>
          ))}
        </Box>
      </CampaignContainer>
    </PageContainer>
  );
};

export default CampaignList;
