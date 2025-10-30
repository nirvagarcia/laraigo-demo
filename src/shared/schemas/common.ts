import { z } from "zod";

export const required = (
  t: (key: string, options?: any) => string,
  field: string,
  type: "string" | "date" | "number" | "array" | "boolean"
) => {
  const baseError = t("errors.required", { field: t(field) });
  const baseInvalid = t("validation.invalid_type");

  switch (type) {
    case "string":
      return z.string().min(1, baseError);
    case "date":
      return z.date({
        required_error: t("errors.requiredDate", { field: t(field) }),
        invalid_type_error: baseInvalid,
      });
    case "number":
      return z.coerce.number({
        required_error: baseError,
        invalid_type_error: baseInvalid,
      });
    case "array":
      return z.array(z.any(), { required_error: baseError });
    case "boolean":
      return z.boolean({ required_error: baseError });
    default:
      return z.any();
  }
};

export const optional = (type: "string" | "date" | "number" = "string") => {
  switch (type) {
    case "string":
      return z.string().optional();
    case "date":
      return z.coerce.date().optional();
    case "number":
      return z.coerce.number().optional();
    default:
      return z.any().optional();
  }
};

export const buildIssue = (
  ctx: z.RefinementCtx,
  path: string,
  message: string
) =>
  ctx.addIssue({
    code: z.ZodIssueCode.custom,
    path: [path],
    message,
  });
