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

      console.log("🔍 Register response:", response.data);

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
      console.error("Register error:", error);

      if (error.response?.status === 400) {
        throw new Error(
          "Invalid registration data. Please check your information."
        );
      } else if (error.response?.status === 409) {
        throw new Error(
          "Email already registered. Please use a different email."
        );
      } else if (error.response?.status >= 500) {
        throw new Error("Server error. Please try again later.");
      } else if (!error.response) {
        throw new Error("Network error. Please check your connection.");
      }

      throw new Error(
        error instanceof Error ? error.message : "Registration failed"
      );
    }
  }

  static async login(data: LoginRequest): Promise<User> {
    try {
      const response = await apiClient.post("/auth/login", data);

      console.log("🔍 Login response:", response.data);

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
      console.error("Login error:", error);

      if (error.response?.status === 401 || error.response?.status === 400) {
        throw new Error("INVALID_CREDENTIALS");
      } else if (error.response?.status >= 500) {
        throw new Error("SERVER_ERROR");
      } else if (!error.response) {
        throw new Error("NETWORK_ERROR");
      }

      throw new Error(error instanceof Error ? error.message : "Login failed");
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
      console.log("🔍 Refresh response:", response.data);

      const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        response.data;

      if (!newAccessToken) {
        throw new Error("Missing access token");
      }

      TokenStorage.setTokens(newAccessToken, newRefreshToken);
      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch (error) {
      TokenStorage.clearTokens();
      throw new Error(
        error instanceof Error ? error.message : "Token refresh failed"
      );
    }
  }

  static async logout(): Promise<void> {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      console.warn("Logout API call failed:", error);
    } finally {
      TokenStorage.clearTokens();
    }
  }

  static async verify(): Promise<User> {
    const accessToken = TokenStorage.getAccessToken();

    if (!accessToken) {
      throw new Error("No access token");
    }

    try {
      const response = await apiClient.get("/auth/verify");
      console.log("🔍 Verify response:", response.data);

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
      throw new Error(
        error instanceof Error ? error.message : "Token verification failed"
      );
    }
  }

  static isAuthenticated(): boolean {
    return !!TokenStorage.getAccessToken();
  }

  static getCurrentUser(): User | null {
    return TokenStorage.getUser();
  }
}

export default AuthService;
