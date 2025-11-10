import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "@app/providers/I18nProvider";
import { Campaign, CampaignFormData } from "../types/campaign";
import {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} from "../data/campaignApiService";
import { logger } from "@shared/utils/logger";

import { AxiosError } from "axios";

const getErrorMessage = (error: any): string => {
  if (error instanceof Error) {
    if ("response" in error && error.response) {
      const axiosError = error as AxiosError<{ message?: string }>;
      switch (axiosError.response?.status) {
        case 403:
          return "You don't have permission to perform this action.";
        case 404:
          return "Campaign not found.";
        case 422:
        case 400:
          return axiosError.response?.data?.message || "Invalid data provided.";
        default:
          return axiosError.message;
      }
    }
    return error.message;
  }
  return "An unexpected error occurred.";
};

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
        const apiCampaigns = await getCampaigns();

        if (Array.isArray(apiCampaigns)) {
          setCampaigns(apiCampaigns);
        } else {
          setCampaigns([]);
          setError("Invalid response format from server");
        }
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        logger.error("Failed to load campaigns", err, "useCampaigns");
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCampaigns();
  }, [t]);
  const createCampaignAction = useCallback(
    async (data: CampaignFormData): Promise<Campaign> => {
      setIsLoading(true);
      setError(null);

      try {
        const newCampaign = await createCampaign(data);
        setCampaigns((prev) => [...prev, newCampaign]);
        return newCampaign;
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const updateCampaignAction = useCallback(
    async (id: number, data: CampaignFormData): Promise<Campaign> => {
      setIsLoading(true);
      setError(null);

      try {
        const updatedCampaign = await updateCampaign(id, data);
        setCampaigns((prev) =>
          prev.map((campaign) =>
            campaign.id === id ? updatedCampaign : campaign
          )
        );
        return updatedCampaign;
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const deleteCampaignAction = useCallback(
    async (id: number): Promise<void> => {
      setError(null);

      try {
        setCampaigns((prev) => prev.filter((campaign) => campaign.id !== id));
        await deleteCampaign(id);
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        try {
          const apiCampaigns = await getCampaigns();
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
    },
    []
  );

  const getCampaign = useCallback(async (id: number): Promise<Campaign> => {
    setError(null);

    try {
      const campaign = await getCampaignById(id);
      return campaign;
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
      throw err;
    }
  }, []);

  return {
    campaigns,
    isLoading,
    error,
    getCampaign,
    createCampaign: createCampaignAction,
    updateCampaign: updateCampaignAction,
    deleteCampaign: deleteCampaignAction,
    refresh: useCallback(async () => {
      try {
        setIsLoading(true);
        const apiCampaigns = await getCampaigns();

        if (Array.isArray(apiCampaigns)) {
          setCampaigns(apiCampaigns);
          setError(null);
        } else {
          setCampaigns([]);
          setError("Invalid response format from server");
        }
      } catch (err) {
        const errorMessage = getErrorMessage(err);
        setError(errorMessage);
        setCampaigns([]);
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
      if (!status) return t("status.unknown");
      return t(`status.${status.toLowerCase()}`);
    },
    [t]
  );

  return {
    getStatusColor,
    getStatusLabel,
  };
};
