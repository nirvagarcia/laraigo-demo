import { API_CONFIG } from "@app/config/api";

const API_BASE_URL = API_CONFIG.BASE_URL;

export const mockApiService = {
  async get<T>(endpoint: string): Promise<T> {
    const res = await fetch(`${API_BASE_URL}/${endpoint}`);
    if (!res.ok) throw new Error(`Failed to fetch ${endpoint}`);
    return res.json();
  },
};
