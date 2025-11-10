import { apiClient } from "../../lib/api";

export interface BackendLoginResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  };
  accessToken: string;
  refreshToken: string;
}

export interface BackendRegisterResponse {
  message: string;
  user: {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
  };
  accessToken: string;
  refreshToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "USER" | "ADMIN";
  createdAt?: string;
  lastLoginAt?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    tokens: AuthTokens;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface RefreshRequest {
  refreshToken: string;
}

const decodeJWT = (
  token: string
): { exp?: number; [key: string]: any } | null => {
  try {
    const payload = token.split(".")[1];
    const decodedPayload = atob(payload);
    return JSON.parse(decodedPayload);
  } catch {
    return null;
  }
};

export const isExpired = (
  token: string,
  skewSeconds: number = 120
): boolean => {
  const decoded = decodeJWT(token);
  if (!decoded?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp <= now + skewSeconds;
};

export const shouldRefresh = (
  token: string,
  skewSeconds: number = 180
): boolean => {
  const decoded = decodeJWT(token);
  if (!decoded?.exp) return true;
  const now = Math.floor(Date.now() / 1000);
  return decoded.exp <= now + skewSeconds;
};

export const TokenStorage = {
  setTokens: (
    accessToken: string,
    refreshToken: string,
    expiresIn?: number
  ) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    if (expiresIn) {
      localStorage.setItem("tokenExpiresIn", expiresIn.toString());
    }
  },

  getAccessToken: (): string | null => {
    return localStorage.getItem("accessToken");
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem("refreshToken");
  },

  isTokenExpired: (token: string): boolean => {
    const decoded = decodeJWT(token);
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  },

  shouldRefreshToken: (token: string): boolean => {
    const decoded = decodeJWT(token);
    if (!decoded?.exp) return true;
    const threeMinutesInMs = 3 * 60 * 1000;
    return Date.now() >= decoded.exp * 1000 - threeMinutesInMs;
  },

  clearTokens: () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("tokenExpiresIn");
    localStorage.removeItem("user");
  },

  setUser: (user: User) => {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser: (): User | null => {
    const userStr = localStorage.getItem("user");
    return userStr ? JSON.parse(userStr) : null;
  },
};

export class AuthService {
  static async register(data: RegisterRequest): Promise<User> {
    try {
      const response = await apiClient.post("/auth/register", data);

      const backendResponse: BackendRegisterResponse = response.data;

      if (!backendResponse.accessToken) {
        throw new Error("Missing access token");
      }

      const user: User = {
        id: backendResponse.user.id.toString(),
        name: backendResponse.user.name,
        email: backendResponse.user.email,
        role: backendResponse.user.role,
      };

      TokenStorage.setTokens(
        backendResponse.accessToken,
        backendResponse.refreshToken
      );
      TokenStorage.setUser(user);

      return user;
    } catch (error: any) {
      if (error.response?.status === 400) {
        throw new Error("INVALID_DATA");
      } else if (error.response?.status === 409) {
        throw new Error("EMAIL_EXISTS");
      } else if (error.response?.status >= 500) {
        throw new Error("SERVER_ERROR");
      } else if (!error.response) {
        throw new Error("NETWORK_ERROR");
      }

      throw new Error("REGISTRATION_FAILED");
    }
  }

  static async login(data: LoginRequest): Promise<User> {
    try {
      const response = await apiClient.post("/auth/login", data);

      const backendResponse: BackendLoginResponse = response.data;

      if (!backendResponse.accessToken) {
        throw new Error("Missing access token");
      }

      const user: User = {
        id: backendResponse.user.id.toString(),
        name: backendResponse.user.name,
        email: backendResponse.user.email,
        role: backendResponse.user.role,
      };

      TokenStorage.setTokens(
        backendResponse.accessToken,
        backendResponse.refreshToken
      );
      TokenStorage.setUser(user);

      return user;
    } catch (error: any) {
      if (error.response?.status === 401 || error.response?.status === 400) {
        throw new Error("INVALID_CREDENTIALS");
      } else if (error.response?.status >= 500) {
        throw new Error("SERVER_ERROR");
      } else if (!error.response) {
        throw new Error("NETWORK_ERROR");
      }

      throw new Error("LOGIN_FAILED");
    }
  }

  static async refresh(): Promise<{
    accessToken: string;
    refreshToken: string;
  }> {
    const refreshToken = TokenStorage.getRefreshToken();

    if (!refreshToken) {
      throw new Error("No refresh token available");
    }

    try {
      const response = await apiClient.post("/auth/refresh", { refreshToken });

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      if (!newAccessToken) {
        throw new Error("Missing access token");
      }

      TokenStorage.setTokens(newAccessToken, newRefreshToken);
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      TokenStorage.clearTokens();
      throw new Error("SESSION_EXPIRED");
    }
  }

  static async logout(): Promise<void> {
    try {
      const refreshToken = TokenStorage.getRefreshToken();
      if (refreshToken) {
        await apiClient.post("/auth/logout", { refreshToken });
      }
    } catch (error) {
      // Silent logout on API failure
    } finally {
      TokenStorage.clearTokens();
    }
  }

  static async verify(): Promise<User> {
    const accessToken = TokenStorage.getAccessToken();

    if (!accessToken) {
      throw new Error("No access token");
    }

    if (TokenStorage.isTokenExpired(accessToken)) {
      throw new Error("Token expired");
    }

    try {
      const response = await apiClient.get("/auth/verify");

      const { user: backendUser } = response.data;

      if (!backendUser) {
        throw new Error("No user data");
      }

      const user: User = {
        id: backendUser.id?.toString() || backendUser.id,
        name: backendUser.name,
        email: backendUser.email,
        role: backendUser.role,
      };

      TokenStorage.setUser(user);
      return user;
    } catch (error) {
      TokenStorage.clearTokens();
      throw new Error("TOKEN_VERIFICATION_FAILED");
    }
  }

  static async getCurrentUserFromAPI(): Promise<User> {
    try {
      const response = await apiClient.get("/users/me");
      const backendUser = response.data;

      if (!backendUser) {
        throw new Error("No user data");
      }

      const user: User = {
        id: backendUser.id?.toString() || backendUser.id,
        name: backendUser.name,
        email: backendUser.email,
        role: backendUser.role,
      };

      TokenStorage.setUser(user);
      return user;
    } catch (error) {
      throw new Error("FAILED_TO_GET_USER");
    }
  }

  static isAuthenticated(): boolean {
    const token = TokenStorage.getAccessToken();
    return !!(token && !isExpired(token));
  }

  static shouldRefreshToken(): boolean {
    const token = TokenStorage.getAccessToken();
    return !!(token && shouldRefresh(token));
  }

  static getCurrentUser(): User | null {
    return TokenStorage.getUser();
  }
}

export default AuthService;
