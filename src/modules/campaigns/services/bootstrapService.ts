import { Campaign, SelectOption } from "../types/campaign";

export interface BootstrapData {
  sources: SelectOption[];
  executionTypes: SelectOption[];
  groups: SelectOption[];
  channels: SelectOption[];
  messageTypes: SelectOption[];
  templates: Record<string, SelectOption[]>;
  campaign?: Campaign | null;
}

export const bootstrapService = {
  async getBootstrap(): Promise<BootstrapData> {
    return {
      sources: [
        { value: "EXTERNA", label: "source.externa" },
        { value: "PERSONAS", label: "source.personas" },
        { value: "OPORTUNIDADES", label: "source.oportunidades" },
      ],
      executionTypes: [
        { value: "Manual", label: "executionType.manual" },
        { value: "Programada", label: "executionType.programada" },
      ],
      groups: [
        { value: "claro", label: "group.claro" },
        { value: "entel", label: "group.entel" },
        { value: "upc", label: "group.upc" },
        { value: "movistar", label: "group.movistar" },
      ],
      channels: [
        { value: "whatsapp", label: "channel.whatsapp" },
        { value: "correo", label: "channel.correo" },
        { value: "phone", label: "channel.phone" },
        { value: "sms", label: "channel.sms" },
      ],
      messageTypes: [
        { value: "hsm", label: "messageType.hsm" },
        { value: "mail", label: "messageType.mail" },
        { value: "html", label: "messageType.html" },
        { value: "sms", label: "messageType.sms" },
      ],
      templates: {
        hsm: [
          { value: "hsm_template_1", label: "HSM Template 1" },
          { value: "hsm_template_2", label: "HSM Template 2" },
        ],
        mail: [
          { value: "mail_template_1", label: "Email Template 1" },
          { value: "mail_template_2", label: "Email Template 2" },
        ],
        html: [
          { value: "html_template_1", label: "HTML Template 1" },
          { value: "html_template_2", label: "HTML Template 2" },
        ],
        sms: [
          { value: "sms_template_1", label: "SMS Template 1" },
          { value: "sms_template_2", label: "SMS Template 2" },
        ],
      },
    };
  },
};
