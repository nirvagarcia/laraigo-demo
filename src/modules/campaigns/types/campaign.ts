export interface Campaign {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  source: string;
  executionType: string;
  scheduledDate?: Date;
  scheduledTime?: string;
  group: string;
  channel: string;
  messageType: string;
  template: string;
  status: "draft" | "active" | "paused" | "completed";
  createdAt: Date;
  updatedAt: Date;
}
