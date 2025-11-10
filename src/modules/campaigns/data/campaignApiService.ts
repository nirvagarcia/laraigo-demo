import { API_CONFIG } from "@app/config/api";
import { Campaign } from "../types/campaign";

const API_BASE_URL = API_CONFIG.BASE_URL;

const parseDates = (campaign: any): Campaign => ({
  ...campaign,
  startDate: new Date(campaign.startDate),
  endDate: new Date(campaign.endDate),
  scheduledDate: campaign.scheduledDate
    ? new Date(campaign.scheduledDate)
    : undefined,
  createdAt: new Date(campaign.createdAt),
  updatedAt: new Date(campaign.updatedAt),
});

export const campaignApiService = {
  async getAll(): Promise<Campaign[]> {
    const res = await fetch(`${API_BASE_URL}/campaigns`);
    if (!res.ok) throw new Error("Failed to fetch campaigns");
    const campaigns = await res.json();
    return campaigns.map(parseDates);
  },

  async getById(id: string): Promise<Campaign> {
    const res = await fetch(`${API_BASE_URL}/campaigns/${id}`);
    if (!res.ok) throw new Error("Failed to fetch campaign");
    const campaign = await res.json();
    return parseDates(campaign);
  },

  async create(data: Campaign): Promise<Campaign> {
    const res = await fetch(`${API_BASE_URL}/campaigns`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        startDate:
          data.startDate instanceof Date
            ? data.startDate.toISOString()
            : data.startDate,
        endDate:
          data.endDate instanceof Date
            ? data.endDate.toISOString()
            : data.endDate,
        scheduledDate:
          data.scheduledDate instanceof Date
            ? data.scheduledDate.toISOString()
            : data.scheduledDate,
        createdAt:
          data.createdAt instanceof Date
            ? data.createdAt.toISOString()
            : data.createdAt,
        updatedAt:
          data.updatedAt instanceof Date
            ? data.updatedAt.toISOString()
            : data.updatedAt,
      }),
    });
    if (!res.ok) throw new Error("Failed to create campaign");
    const result = await res.json();

    return parseDates(result);
  },

  async update(id: string, data: Partial<Campaign>): Promise<Campaign> {
    const res = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...data,
        startDate:
          data.startDate instanceof Date
            ? data.startDate.toISOString()
            : data.startDate,
        endDate:
          data.endDate instanceof Date
            ? data.endDate.toISOString()
            : data.endDate,
        scheduledDate:
          data.scheduledDate instanceof Date
            ? data.scheduledDate.toISOString()
            : data.scheduledDate,
        updatedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error("Failed to update campaign");
    const result = await res.json();
    return parseDates(result);
  },

  async remove(id: string): Promise<void> {
    const res = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete campaign");
  },
};
