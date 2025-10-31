import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "@app/providers/I18nProvider";
import { Campaign } from "../types/campaign";
import { campaignApiService } from "../data/campaignApiService";
import { campaignService } from "../services/campaignService";
import { CampaignFormData } from "../schemas/campaignSchema";
import { logger } from "@shared/utils/logger";

export const useCampaigns = () => {
  const { t } = useTranslation();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCampaigns = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const apiCampaigns = await campaignApiService.getAll();

        const translatedCampaigns = apiCampaigns.map((campaign) => ({
          ...campaign,
          title: campaign.title.startsWith("sample.")
            ? t(campaign.title)
            : campaign.title,
          description: campaign.description.startsWith("sample.")
            ? t(campaign.description)
            : campaign.description,
        }));

        setCampaigns(translatedCampaigns);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load campaigns";
        setError(errorMessage);
        logger.error("Failed to load campaigns", err, "useCampaigns");
      } finally {
        setIsLoading(false);
      }
    };

    loadCampaigns();
  }, [t]);

  const createCampaign = useCallback(
    async (data: CampaignFormData): Promise<Campaign> => {
      setIsLoading(true);
      setError(null);

      try {
        const formCampaign = await campaignService.create(data);
        const newCampaign = await campaignApiService.create(formCampaign);

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
        const formCampaign = await campaignService.update(id, data);
        const updatedCampaign = await campaignApiService.update(
          id,
          formCampaign
        );

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

  const deleteCampaign = useCallback(async (id: string): Promise<void> => {
    setError(null);

    try {
      setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));

      await campaignApiService.remove(id);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to delete campaign";
      setError(errorMessage);

      try {
        const apiCampaigns = await campaignApiService.getAll();
        setCampaigns(apiCampaigns);
      } catch (refetchErr) {
        logger.error(
          "Failed to restore campaigns after delete error",
          refetchErr,
          "useCampaigns"
        );
      }

      throw err;
    }
  }, []);

  const getCampaign = useCallback(async (id: string): Promise<Campaign> => {
    setError(null);

    try {
      const campaign = await campaignApiService.getById(id);
      return campaign;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to get campaign";
      setError(errorMessage);
      throw err;
    }
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
    getCampaign,
    createCampaign,
    updateCampaign,
    deleteCampaign,
    saveCampaign,
    refresh: useCallback(async () => {
      try {
        setIsLoading(true);
        const apiCampaigns = await campaignApiService.getAll();
        setCampaigns(apiCampaigns);
        setError(null);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to refresh campaigns";
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    }, []),
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
