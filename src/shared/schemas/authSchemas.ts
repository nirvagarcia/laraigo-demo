import { z } from "zod";

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email es requerido")
    .email("Formato de email inválido"),
  password: z
    .string()
    .min(1, "Contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres"),
});

// Register schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nombre es requerido")
      .min(2, "El nombre debe tener al menos 2 caracteres")
      .max(50, "El nombre no puede exceder 50 caracteres"),
    email: z
      .string()
      .min(1, "Email es requerido")
      .email("Formato de email inválido"),
    password: z
      .string()
      .min(1, "Contraseña es requerida")
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "La contraseña debe contener al menos una mayúscula, una minúscula y un número"
      ),
    confirmPassword: z.string().min(1, "Confirmar contraseña es requerido"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

// Type inference
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;

// Password validation helper
export const passwordValidation = {
  minLength: (value: string) => value.length >= 8,
  hasUppercase: (value: string) => /[A-Z]/.test(value),
  hasLowercase: (value: string) => /[a-z]/.test(value),
  hasNumber: (value: string) => /\d/.test(value),
};

export const getPasswordStrength = (password: string) => {
  const checks = [
    passwordValidation.minLength(password),
    passwordValidation.hasUppercase(password),
    passwordValidation.hasLowercase(password),
    passwordValidation.hasNumber(password),
  ];

  const score = checks.filter(Boolean).length;

  if (score <= 1) return { strength: "weak", color: "error" };
  if (score <= 2) return { strength: "fair", color: "warning" };
  if (score <= 3) return { strength: "good", color: "info" };
  return { strength: "strong", color: "success" };
};
