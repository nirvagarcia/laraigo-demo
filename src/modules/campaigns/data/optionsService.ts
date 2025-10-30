import { mockApiService } from "@shared/services/mockApiService";
import { SelectOption } from "../types/selectOption";

export const optionsService = {
  getSources: () => mockApiService.get<SelectOption[]>("sources"),
  getExecutionTypes: () => mockApiService.get<SelectOption[]>("executionTypes"),
  getGroups: () => mockApiService.get<SelectOption[]>("groups"),
  getChannels: () => mockApiService.get<SelectOption[]>("channels"),
  getMessageTypes: () => mockApiService.get<SelectOption[]>("messageTypes"),
  getTemplates: () =>
    mockApiService.get<Record<string, SelectOption[]>>("templates"),
};
