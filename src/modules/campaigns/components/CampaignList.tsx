import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton, Stack } from "@mui/material";
import { EditIcon, DeleteIcon } from "@shared/components/icons";
import { Button } from "@shared/components/ui/Button";
import { Card } from "@shared/components/ui/Card";
import { AppBox } from "@shared/components/ui/AppBox";
import { AppText } from "@shared/components/ui/AppText";
import { AppIconButton } from "@shared/components/ui/AppIconButton";
import { ErrorState } from "@shared/components/ui/ErrorState";
import { StatusBadge } from "@shared/components/ui/StatusBadge";
import { PageContainer } from "@shared/components/layout/PageContainer";
import { globalStyles } from "@shared/styles/globals";
import { useTranslation } from "@app/providers/I18nProvider";
import { campaignSx } from "../styles/stylesCampaign";
import { useCampaigns } from "../contexts/CampaignsProvider";
import { useCampaignStatus } from "../hooks";
import { goToNewCampaign, goToEditCampaign } from "../utils/navigation";

export const CampaignList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { campaigns, isLoading, error, deleteCampaign, refresh } =
    useCampaigns();
  const { getStatusLabel } = useCampaignStatus();

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
        <ErrorState
          title="Error loading campaigns"
          description="We couldn't reach the server. Please try again."
          icon="🛰️"
          onRetry={refresh}
          retryLabel="Retry"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AppBox
        sx={{ ...globalStyles.container, ...campaignSx.loadingContainer }}
      >
        <AppBox sx={campaignSx.listHeader}>
          <AppBox sx={campaignSx.listHeaderContent}>
            <AppText variant="h3" sx={campaignSx.listTitle}>
              📢 {t("menu.campaigns")}
            </AppText>
            <AppText variant="body1" sx={campaignSx.listSubtitle}>
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
            <Card
              key={campaign.id}
              className="modernCard"
              sx={{
                ...campaignSx.modernCard,
                ...(campaign.status === "active" && campaignSx.cardTintActive),
                ...(campaign.status === "draft" && campaignSx.cardTintDraft),
                ...(campaign.status === "paused" && campaignSx.cardTintPaused),
              }}
            >
              <AppBox sx={campaignSx.cardActions}>
                <AppIconButton
                  size="small"
                  onClick={() => handleEditCampaign(campaign.id)}
                  sx={campaignSx.glassIconButton}
                >
                  <EditIcon fontSize="small" />
                </AppIconButton>
                <AppIconButton
                  size="small"
                  onClick={() => handleDeleteCampaign(campaign.id)}
                  sx={campaignSx.glassIconButton}
                >
                  <DeleteIcon fontSize="small" />
                </AppIconButton>
              </AppBox>

              <AppText variant="h6" sx={{ ...campaignSx.cardTitle, mb: 2 }}>
                {campaign.title}
              </AppText>

              {campaign.description && (
                <AppText variant="body2" sx={campaignSx.cardDescription}>
                  {campaign.description}
                </AppText>
              )}

              <AppBox sx={{ mb: 2 }}>
                <StatusBadge
                  status={campaign.status as "active" | "draft" | "paused"}
                  label={getStatusLabel(campaign.status)}
                />
              </AppBox>
            </Card>
          ))}
        </AppBox>
      </AppBox>
    </PageContainer>
  );
};

export default CampaignList;
