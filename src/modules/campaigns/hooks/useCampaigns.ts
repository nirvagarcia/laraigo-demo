import { useState, useCallback, useMemo } from "react";
import { useTranslation } from "@app/providers/I18nProvider";
import { Campaign } from "../types/campaign";
import { mockCampaigns } from "../data/mocks/campaigns.mock";
import { campaignService } from "../services/campaignService";
import { CampaignFormData } from "../schemas/campaignSchema";

export const useCampaigns = () => {
  const { t } = useTranslation();

  const initialCampaigns = useMemo(
    () =>
      mockCampaigns.map((campaign) => ({
        ...campaign,
        title: t(campaign.title),
        description: t(campaign.description),
      })),
    [t]
  );

  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createCampaign = useCallback(
    async (data: CampaignFormData): Promise<Campaign> => {
      setIsLoading(true);
      setError(null);

      try {
        const newCampaign = await campaignService.create(data);
        setCampaigns((prev) => [...prev, newCampaign]);
        return newCampaign;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to create campaign";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateCampaign = useCallback(
    async (id: string, data: CampaignFormData): Promise<Campaign> => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedCampaign = await campaignService.update(id, data);
        setCampaigns((prev) =>
          prev.map((campaign) =>
            campaign.id === id ? updatedCampaign : campaign
          )
        );
        return updatedCampaign;
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to update campaign";
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteCampaign = useCallback((id: string) => {
    setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
  }, []);

  const saveCampaign = useCallback(
    async (data: CampaignFormData, id?: string): Promise<Campaign> => {
      return id ? updateCampaign(id, data) : createCampaign(data);
    },
    [createCampaign, updateCampaign]
  );

  return {
    campaigns,
    isLoading,
    error,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    saveCampaign,
  };
};

export const useCampaignStatus = () => {
  const { t } = useTranslation();

  const getStatusColor = useCallback((status: Campaign["status"]) => {
    switch (status) {
      case "active":
        return "success";
      case "draft":
        return "warning";
      case "paused":
        return "info";
      case "completed":
        return "secondary";
      default:
        return "default";
    }
  }, []);

  const getStatusLabel = useCallback(
    (status: Campaign["status"]) => {
      return t(`status.${status}`);
    },
    [t]
  );

  return {
    getStatusColor,
    getStatusLabel,
  };
};
