export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export interface Campaign {
  id?: number;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string | null;
  source: string;
  executionType: string;
  scheduledDate?: string | null;
  scheduledTime?: string | null;
  group: string;
  channel: string;
  messageType: string;
  template: string;
  persons?: any[];
  filePath?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export type CampaignFormData = Omit<
  Campaign,
  "id" | "status" | "createdAt" | "updatedAt"
>;

export interface SelectOption {
  value: string;
  label: string;
}
