import { CampaignFormData } from "../schemas/campaignSchema";
import { Campaign } from "../types/campaign";
import { defaultCampaignValues } from "../utils/formDefaults";

export interface CampaignService {
  save: (data: CampaignFormData, id?: string) => Promise<Campaign>;
  create: (data: CampaignFormData) => Promise<Campaign>;
  update: (id: string, data: CampaignFormData) => Promise<Campaign>;
  get: (id: string) => Promise<Campaign>;
}

const mapFormDataToCampaign = (
  data: CampaignFormData
): Omit<Campaign, "id" | "createdAt" | "updatedAt"> => ({
  ...defaultCampaignValues,
  title: data.title || defaultCampaignValues.title,
  description: data.description || defaultCampaignValues.description,
  startDate: data.startDate || new Date(),
  endDate: data.endDate || new Date(),
  source: data.source || defaultCampaignValues.source,
  executionType: data.executionType || defaultCampaignValues.executionType,
  scheduledDate: data.scheduledDate || defaultCampaignValues.scheduledDate,
  scheduledTime: data.scheduledTime || defaultCampaignValues.scheduledTime,
  group: data.group || defaultCampaignValues.group,
  channel: data.channel || defaultCampaignValues.channel,
  messageType: data.messageType || defaultCampaignValues.messageType,
  template: data.template || defaultCampaignValues.template,
  status: "draft" as const,
});

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
      ...mapFormDataToCampaign(data),
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return newCampaign;
  }

  async update(id: string, data: CampaignFormData): Promise<Campaign> {
    const updatedCampaign: Campaign = {
      ...mapFormDataToCampaign(data),
      id,
      createdAt: new Date(Date.now() - 86400000),
      updatedAt: new Date(),
    };

    return updatedCampaign;
  }

  async get(id: string): Promise<Campaign> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const mockCampaign: Campaign = {
      id,
      title: `Sample Campaign ${id}`,
      description: `This is a sample description for campaign ${id}`,
      startDate: new Date(),
      endDate: new Date(Date.now() + 86400000 * 7),
      source: "web",
      executionType: "immediate",
      scheduledDate: undefined,
      scheduledTime: undefined,
      group: "marketing",
      channel: "email",
      messageType: "promotional",
      template: "default",
      status: Math.random() > 0.5 ? "active" : "draft",
      createdAt: new Date(Date.now() - 86400000 * 2),
      updatedAt: new Date(Date.now() - 86400000),
    };

    return mockCampaign;
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
