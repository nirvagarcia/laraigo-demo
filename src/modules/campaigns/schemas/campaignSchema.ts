import { z } from "zod";

export const campaignSchema = z.object({
  title: z.string().min(1, "Título requerido"),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date(),
});

export type CampaignFormData = z.infer<typeof campaignSchema>;

export interface Campaign extends CampaignFormData {
  id: string;
  status: "draft" | "active" | "paused" | "completed";
  createdAt: Date;
  updatedAt: Date;
}
