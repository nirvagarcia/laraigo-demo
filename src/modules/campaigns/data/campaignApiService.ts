import { apiClient } from "@/lib/api";
import { Campaign } from "../types/campaign";

export const campaignApiService = {
  async getCampaigns(): Promise<Campaign[]> {
    const res = await apiClient.get("/campaigns");
    return res.data.data;
  },
  async getCampaignById(id: number): Promise<Campaign> {
    const res = await apiClient.get(`/campaigns/${id}`);
    return res.data.data;
  },
  async createCampaign(data: Campaign): Promise<Campaign> {
    const res = await apiClient.post("/campaigns", data);
    return res.data.data;
  },
  async updateCampaign(id: number, data: Campaign): Promise<Campaign> {
    const res = await apiClient.patch(`/campaigns/${id}`, data);
    return res.data.data;
  },
  async deleteCampaign(id: number): Promise<void> {
    await apiClient.delete(`/campaigns/${id}`);
  },
};

export const {
  getCampaigns,
  getCampaignById,
  createCampaign,
  updateCampaign,
  deleteCampaign,
} = campaignApiService;
