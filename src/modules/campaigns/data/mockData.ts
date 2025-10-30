export interface SelectOption {
  value: string;
  label: string;
}

export const sourceOptions: SelectOption[] = [
  { value: "externa", label: "source.externa" },
  { value: "personas", label: "source.personas" },
  { value: "oportunidades", label: "source.oportunidades" },
];

export const executionTypeOptions: SelectOption[] = [
  { value: "manual", label: "executionType.manual" },
  { value: "programada", label: "executionType.programada" },
];

export const groupOptions: SelectOption[] = [
  { value: "claro", label: "group.claro" },
  { value: "entel", label: "group.entel" },
  { value: "upc", label: "group.upc" },
  { value: "movistar", label: "group.movistar" },
];

export const channelOptions: SelectOption[] = [
  { value: "whatsapp", label: "channel.whatsapp" },
  { value: "correo", label: "channel.correo" },
  { value: "phone", label: "channel.phone" },
  { value: "sms", label: "channel.sms" },
];

export const messageTypeOptions: SelectOption[] = [
  { value: "hsm", label: "messageType.hsm" },
  { value: "mail", label: "messageType.mail" },
  { value: "html", label: "messageType.html" },
  { value: "sms", label: "messageType.sms" },
];

export const templateOptions: Record<string, SelectOption[]> = {
  hsm: [
    { value: "hsm_template_1", label: "HSM Template 1 - Welcome Message" },
    { value: "hsm_template_2", label: "HSM Template 2 - Promotional Offer" },
  ],
  mail: [
    { value: "mail_template_1", label: "Email Template 1 - Newsletter" },
    { value: "mail_template_2", label: "Email Template 2 - Product Launch" },
  ],
  html: [
    { value: "html_template_1", label: "HTML Template 1 - Landing Page" },
    { value: "html_template_2", label: "HTML Template 2 - Survey Form" },
  ],
  sms: [
    { value: "sms_template_1", label: "SMS Template 1 - Quick Alert" },
    { value: "sms_template_2", label: "SMS Template 2 - Reminder" },
  ],
};
