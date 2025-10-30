import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Typography, Stack, IconButton, Skeleton } from "@mui/material";
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
    <CampaignCard elevation={0}>
      <Box sx={campaignSx.formHeader}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="start"
          sx={campaignSx.formHeader}
        >
          <Skeleton
            variant="text"
            width="60%"
            height={32}
            sx={{
              fontSize: "1.25rem",
              transform: "scale(1, 0.8)",
            }}
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
          sx={{
            borderRadius: 3,
            mt: 1,
          }}
          animation="wave"
        />
      </Box>

      <Skeleton
        variant="text"
        width="85%"
        height={20}
        sx={{
          mb: 1,
          fontSize: "0.875rem",
          transform: "scale(1, 0.8)",
        }}
        animation="wave"
      />
      <Skeleton
        variant="text"
        width="70%"
        height={20}
        sx={{
          fontSize: "0.875rem",
          transform: "scale(1, 0.8)",
          mb: 2,
        }}
        animation="wave"
      />

      <Box sx={campaignSx.campaignDate}>
        <Skeleton
          variant="text"
          width="40%"
          height={16}
          sx={{
            fontSize: "0.75rem",
            transform: "scale(1, 0.6)",
          }}
          animation="wave"
        />
      </Box>
    </CampaignCard>
  );

  if (isLoading) {
    return (
      <PageContainer>
        <CampaignContainer>
          <CampaignHeader>
            <Box>
              <Skeleton
                variant="text"
                width={280}
                height={48}
                sx={{
                  fontSize: "2rem",
                  mb: 1,
                  transform: "scale(1, 0.85)",
                }}
                animation="wave"
              />
              <Skeleton
                variant="text"
                width={350}
                height={24}
                sx={{
                  fontSize: "1rem",
                  transform: "scale(1, 0.8)",
                }}
                animation="wave"
              />
            </Box>
            <Skeleton
              variant="rounded"
              width={160}
              height={40}
              sx={{
                borderRadius: 2,
                bgcolor: "primary.50",
              }}
              animation="wave"
            />
          </CampaignHeader>

          <Box sx={campaignSx.listContainer}>
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={`skeleton-${index}`}>{renderSkeletonCard()}</div>
            ))}
          </Box>
        </CampaignContainer>
      </PageContainer>
    );
  }

  // Error state
  if (error) {
    return (
      <PageContainer>
        <CampaignContainer>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              minHeight: "400px",
              justifyContent: "center",
            }}
          >
            <Typography variant="h6" color="error" gutterBottom>
              {t("campaign.error")}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {error}
            </Typography>
          </Box>
        </CampaignContainer>
      </PageContainer>
    );
  }

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
