import { CampaignFormData } from "../schemas/campaignSchema";
import { Campaign } from "../types/campaign";

export interface CampaignService {
  save: (data: CampaignFormData, id?: string) => Promise<Campaign>;
  create: (data: CampaignFormData) => Promise<Campaign>;
  update: (id: string, data: CampaignFormData) => Promise<Campaign>;
}

class MockCampaignService implements CampaignService {
  async save(data: CampaignFormData, id?: string): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (id) {
      return this.update(id, data);
    } else {
      return this.create(data);
    }
  }

  async create(data: CampaignFormData): Promise<Campaign> {
    const newCampaign: Campaign = {
      id: Date.now().toString(),
      title: data.title || "",
      description: data.description || "",
      startDate: data.startDate || new Date(),
      endDate: data.endDate || new Date(),
      source: data.source || "",
      executionType: data.executionType || "",
      scheduledDate: data.scheduledDate || undefined,
      scheduledTime: data.scheduledTime || undefined,
      group: data.group || "",
      channel: data.channel || "",
      messageType: data.messageType || "",
      template: data.template || "",
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return newCampaign;
  }

  async update(id: string, data: CampaignFormData): Promise<Campaign> {
    const updatedCampaign: Campaign = {
      id,
      title: data.title || "",
      description: data.description || "",
      startDate: data.startDate || new Date(),
      endDate: data.endDate || new Date(),
      source: data.source || "",
      executionType: data.executionType || "",
      scheduledDate: data.scheduledDate || undefined,
      scheduledTime: data.scheduledTime || undefined,
      group: data.group || "",
      channel: data.channel || "",
      messageType: data.messageType || "",
      template: data.template || "",
      status: "draft",
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(),
    };

    return updatedCampaign;
  }
}

export const campaignService = new MockCampaignService();

export class CampaignError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = "CampaignError";
  }
}
