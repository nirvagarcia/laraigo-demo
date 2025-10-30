import { CampaignFormData } from "../schemas/campaignSchema";

export const defaultCampaignValues: CampaignFormData = {
  title: "",
  description: "",
  startDate: null,
  endDate: null,
  source: "",
  executionType: "",
  scheduledDate: null,
  scheduledTime: "",
  group: "",
  channel: "",
  messageType: "",
  template: "",
};

export const getDefaultCampaignValues = (): CampaignFormData => {
  return JSON.parse(JSON.stringify(defaultCampaignValues));
};

export const isEmptyFormValue = (value: any): boolean => {
  return value === null || value === undefined || value === "";
};

export const mergeWithDefaults = (
  values: Partial<CampaignFormData>
): CampaignFormData => {
  return {
    ...getDefaultCampaignValues(),
    ...values,
  };
};
