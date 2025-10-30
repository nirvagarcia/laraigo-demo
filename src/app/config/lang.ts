export const SUPPORTED_LANGUAGES = ["es", "en"] as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_CONFIG = {
  DEFAULT_LANGUAGE: "es" as SupportedLanguage,
  FALLBACK_LANGUAGE: "en" as SupportedLanguage,
  STORAGE_KEY: "laraigo_language",
} as const;

export const LANGUAGE_LABELS = {
  es: "Español",
  en: "English",
} as const;
