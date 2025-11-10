import { z } from "zod";

export const campaignSchema = z
  .object({
    title: z.string().min(3, "El título debe tener al menos 3 caracteres"),
    description: z.string().optional(),
    startDate: z.string().datetime("Fecha inválida"),
    endDate: z.string().datetime().optional().nullable(),
    source: z.string().min(1, "La fuente es obligatoria"),
    executionType: z.string().min(1, "El tipo de ejecución es obligatorio"),
    scheduledDate: z.string().datetime().optional().nullable(),
    scheduledTime: z.string().optional().nullable(),
    group: z.string().min(1, "El grupo es obligatorio"),
    channel: z.string().min(1, "El canal es obligatorio"),
    messageType: z.string().min(1, "El tipo de mensaje es obligatorio"),
    template: z.string().min(1, "La plantilla es obligatoria"),
    persons: z.array(z.any()).optional(),
    filePath: z.string().optional().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.executionType === "Programada") {
      if (!data.scheduledDate) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["scheduledDate"],
          message: "La fecha de programación es obligatoria",
        });
      }
      if (!data.scheduledTime) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["scheduledTime"],
          message: "La hora de programación es obligatoria",
        });
      }
    }

    if (data.source === "EXTERNA" && !data.filePath) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["filePath"],
        message: "El archivo es obligatorio para fuentes externas",
      });
    }
  });

export type CampaignFormData = z.infer<typeof campaignSchema>;
