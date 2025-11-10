export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  TIMEOUT: parseInt(import.meta.env.VITE_API_TIMEOUT || "10000"),
  RETRY_ATTEMPTS: 3,
} as const;

export const API_ENDPOINTS = {
  CAMPAIGNS: "/campaigns",
  TEMPLATES: "/templates",
  REPORTS: "/reports",
  AUTH: "/auth",
} as const;

export type ApiEndpoints = typeof API_ENDPOINTS;
