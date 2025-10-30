import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@shared/components/ui/Button";
import { Card } from "@shared/components/ui/Card";
import { Chip } from "@shared/components/ui/Chip";
import { AppBox } from "@shared/components/ui/AppBox";
import { AppText } from "@shared/components/ui/AppText";
import { AppIconButton } from "@shared/components/ui/AppIconButton";

import { PageContainer } from "@shared/components/layout/PageContainer";

import { globalStyles } from "@shared/styles/globals";
import { useTranslation } from "@app/providers/I18nProvider";
import { campaignSx } from "../styles/stylesCampaign";
import { useCampaigns, useCampaignStatus } from "../hooks";
import { goToNewCampaign, goToEditCampaign } from "../utils/navigation";

export const CampaignList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { campaigns, isLoading, error, deleteCampaign } = useCampaigns();
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
    async (id: string) => {
      try {
        await deleteCampaign(id);
      } catch (error) {
        console.error("Failed to delete campaign:", error);
      }
    },
    [deleteCampaign]
  );

  const renderSkeletonCard = () => (
    <Card sx={campaignSx.listSkeleton}>
      <AppBox mb={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
          sx={campaignSx.skeletonHeader}
        >
          <Skeleton
            variant="text"
            width="60%"
            height={32}
            sx={campaignSx.skeletonTitle}
          />
          <Stack direction="row" spacing={1}>
            <Skeleton
              variant="circular"
              width={32}
              height={32}
              animation="wave"
            />
            <Skeleton
              variant="circular"
              width={32}
              height={32}
              animation="wave"
            />
          </Stack>
        </Stack>
        <Skeleton
          variant="rounded"
          width={80}
          height={24}
          sx={campaignSx.skeletonActions}
          animation="wave"
        />
      </AppBox>

      <Skeleton
        variant="text"
        width="85%"
        height={20}
        sx={campaignSx.skeletonDescription}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width="70%"
        height={20}
        sx={campaignSx.skeletonDescription}
        animation="wave"
      />

      <AppBox mt={2}>
        <Skeleton
          variant="text"
          width="40%"
          height={16}
          sx={campaignSx.skeletonDate}
          animation="wave"
        />
      </AppBox>
    </Card>
  );

  if (isLoading) {
    return (
      <PageContainer>
        <AppBox
          sx={{ ...globalStyles.container, ...campaignSx.loadingContainer }}
        >
          <AppBox sx={campaignSx.listHeaderContainer}>
            <AppBox>
              <Skeleton
                variant="text"
                width={280}
                height={48}
                sx={campaignSx.skeletonTitle}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={350}
                height={24}
                sx={campaignSx.skeletonDescription}
                animation="wave"
              />
            </AppBox>
            <Skeleton
              variant="rounded"
              width={160}
              height={40}
              sx={campaignSx.skeletonActions}
              animation="wave"
            />
          </AppBox>

          <AppBox sx={campaignSx.loadingGrid}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${index}`}>{renderSkeletonCard()}</div>
            ))}
          </AppBox>
        </AppBox>
      </PageContainer>
    );
  }

  if (error) {
    return (
      <PageContainer>
        <AppBox
          sx={{ ...globalStyles.container, ...campaignSx.errorContainer }}
        >
          <AppBox sx={campaignSx.errorContent}>
            <AppText variant="h6" color="error" gutterBottom>
              {t("campaign.error")}
            </AppText>
            <AppText variant="body2" color="secondary">
              {error}
            </AppText>
          </AppBox>
        </AppBox>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AppBox
        sx={{ ...globalStyles.container, ...campaignSx.loadingContainer }}
      >
        <AppBox sx={campaignSx.listHeaderContainer}>
          <AppBox>
            <AppText variant="h4" sx={campaignSx.listTitle}>
              📢 {t("campaign.list")}
            </AppText>
            <AppText variant="body1" color="secondary">
              {t("campaign.manage_description")}
            </AppText>
          </AppBox>
          <Button
            variant="primary"
            onClick={handleCreateCampaign}
            sx={campaignSx.createButton}
          >
            ➕ {t("buttons.create_campaign")}
          </Button>
        </AppBox>

        <AppBox sx={campaignSx.campaignGrid}>
          {campaigns.map((campaign) => (
            <Card key={campaign.id} sx={campaignSx.campaignCardContainer}>
              <AppBox sx={campaignSx.campaignCardHeader}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="start"
                  sx={campaignSx.skeletonHeader}
                >
                  <AppText variant="h6" sx={campaignSx.campaignCardTitle}>
                    {campaign.title}
                  </AppText>
                  <Stack direction="row" spacing={1}>
                    <AppIconButton
                      size="small"
                      onClick={() => handleEditCampaign(campaign.id)}
                      sx={campaignSx.editButton}
                    >
                      <EditIcon fontSize="small" />
                    </AppIconButton>
                    <AppIconButton
                      size="small"
                      onClick={() => handleDeleteCampaign(campaign.id)}
                      sx={campaignSx.deleteButton}
                    >
                      <DeleteIcon fontSize="small" />
                    </AppIconButton>
                  </Stack>
                </Stack>

                <Chip
                  label={getStatusLabel(campaign.status)}
                  color={getStatusColor(campaign.status)}
                  size="small"
                  sx={campaignSx.statusChipContainer}
                />
              </AppBox>

              {campaign.description && (
                <AppText
                  variant="body2"
                  color="secondary"
                  sx={campaignSx.campaignListDescription.sx}
                >
                  {campaign.description}
                </AppText>
              )}

              <AppBox sx={campaignSx.campaignDateContainer}>
                <AppText variant="caption" sx={campaignSx.campaignDateText}>
                  📅 {campaign.startDate.toLocaleDateString()} -{" "}
                  {campaign.endDate.toLocaleDateString()}
                </AppText>
              </AppBox>
            </Card>
          ))}
        </AppBox>
      </AppBox>
    </PageContainer>
  );
};

export default CampaignList;
