import { API_BASE_URL } from "@app/config/api";
import { Campaign } from "../types/campaign";
import { SelectOption } from "../types/selectOption";

export interface BootstrapData {
  sources: SelectOption[];
  executionTypes: SelectOption[];
  groups: SelectOption[];
  channels: SelectOption[];
  messageTypes: SelectOption[];
  templates: Record<string, SelectOption[]>;
  campaign?: Campaign | null;
}

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

export const bootstrapService = {
  async getBootstrap(campaignId?: string): Promise<BootstrapData> {
    try {
      const [
        sourcesRes,
        executionTypesRes,
        groupsRes,
        channelsRes,
        messageTypesRes,
        templatesRes,
        campaignRes,
      ] = await Promise.all([
        fetch(`${API_BASE_URL}/sources`),
        fetch(`${API_BASE_URL}/executionTypes`),
        fetch(`${API_BASE_URL}/groups`),
        fetch(`${API_BASE_URL}/channels`),
        fetch(`${API_BASE_URL}/messageTypes`),
        fetch(`${API_BASE_URL}/templates`),
        campaignId ? fetch(`${API_BASE_URL}/campaigns/${campaignId}`) : null,
      ]);

      if (!sourcesRes.ok) throw new Error("Failed to fetch sources");
      if (!executionTypesRes.ok)
        throw new Error("Failed to fetch execution types");
      if (!groupsRes.ok) throw new Error("Failed to fetch groups");
      if (!channelsRes.ok) throw new Error("Failed to fetch channels");
      if (!messageTypesRes.ok) throw new Error("Failed to fetch message types");
      if (!templatesRes.ok) throw new Error("Failed to fetch templates");
      if (campaignRes && !campaignRes.ok)
        throw new Error("Failed to fetch campaign");

      const [
        sources,
        executionTypes,
        groups,
        channels,
        messageTypes,
        templates,
        campaign,
      ] = await Promise.all([
        sourcesRes.json(),
        executionTypesRes.json(),
        groupsRes.json(),
        channelsRes.json(),
        messageTypesRes.json(),
        templatesRes.json(),
        campaignRes ? campaignRes.json() : null,
      ]);

      return {
        sources,
        executionTypes,
        groups,
        channels,
        messageTypes,
        templates,
        campaign: campaign ? parseDates(campaign) : null,
      };
    } catch (error) {
      console.error("Bootstrap service error:", error);
      throw new Error(
        error instanceof Error
          ? `Bootstrap failed: ${error.message}`
          : "Unknown bootstrap error"
      );
    }
  },
};
