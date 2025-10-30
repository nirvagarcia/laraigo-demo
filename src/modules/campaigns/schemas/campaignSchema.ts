import { z } from "zod";
import { required, optional, buildIssue } from "@shared/schemas/common";

const schemaCache = new WeakMap<
  Function,
  ReturnType<typeof createCampaignSchema>
>();

const createCampaignSchema = (t: (key: string, options?: any) => string) =>
  z
    .object({
      title: required(t, "fields.title", "string"),
      description: required(t, "fields.description", "string"),
      startDate: required(t, "fields.startDate", "date"),
      endDate: required(t, "fields.endDate", "date"),
      source: required(t, "fields.source", "string"),
      executionType: required(t, "fields.executionType", "string"),
      scheduledDate: optional("date"),
      scheduledTime: optional("string"),
      group: required(t, "fields.group", "string"),
      channel: required(t, "fields.channel", "string"),
      messageType: required(t, "fields.messageType", "string"),
      template: required(t, "fields.template", "string"),
    })
    .superRefine((data, ctx) => {
      if (data.executionType === "Programada") {
        if (!data.scheduledDate)
          buildIssue(
            ctx,
            "scheduledDate",
            t("errors.requiredDate", { field: t("fields.scheduledDate") })
          );
        if (!data.scheduledTime)
          buildIssue(
            ctx,
            "scheduledTime",
            t("errors.required", { field: t("fields.scheduledTime") })
          );
      }
    });

export const campaignSchema = (t: (key: string, options?: any) => string) => {
  if (!schemaCache.has(t)) {
    schemaCache.set(t, createCampaignSchema(t));
  }

  return schemaCache.get(t)!;
};
export type CampaignFormData = z.infer<ReturnType<typeof campaignSchema>>;
