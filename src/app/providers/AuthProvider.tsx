import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import AuthService, {
  User,
  isExpired,
  shouldRefresh,
} from "@shared/services/authService";
import { LoadingSplash } from "@shared/components/ui/LoadingSplash";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isReady: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const clearRefreshInterval = useCallback(() => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  }, []);

  const startRefreshInterval = useCallback(() => {
    clearRefreshInterval();

    refreshIntervalRef.current = setInterval(async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) return;

      if (shouldRefresh(accessToken, 180)) {
        try {
          const tokens = await AuthService.refresh();
          localStorage.setItem("accessToken", tokens.accessToken);
          localStorage.setItem("refreshToken", tokens.refreshToken);
        } catch {
          await logout();
        }
      }
    }, 600000); // 10 minutes
  }, []);

  const logout = useCallback(async (): Promise<void> => {
    try {
      clearRefreshInterval();
      await AuthService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, [clearRefreshInterval]);

  const boot = useCallback(async () => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!accessToken || !refreshToken) {
      setIsAuthenticated(false);
      setIsReady(true);
      return;
    }

    const expired = isExpired(accessToken, 120);

    if (!expired) {
      const existingUser = localStorage.getItem("user");
      if (existingUser) {
        const user = JSON.parse(existingUser);
        setUser(user);
        setIsAuthenticated(true);
        setIsReady(true);
        startRefreshInterval();
        return;
      } else {
        try {
          const user = await AuthService.getCurrentUserFromAPI();
          setUser(user);
          setIsAuthenticated(true);
          setIsReady(true);
          startRefreshInterval();
          return;
        } catch {
          // Fall through to refresh attempt
        }
      }
    }

    try {
      const tokens = await AuthService.refresh();
      localStorage.setItem("accessToken", tokens.accessToken);
      localStorage.setItem("refreshToken", tokens.refreshToken);

      const user = await AuthService.getCurrentUserFromAPI();
      setUser(user);
      setIsAuthenticated(true);
      startRefreshInterval();
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
    } finally {
      setIsReady(true);
    }
  }, [startRefreshInterval]);

  useEffect(() => {
    boot();

    return () => {
      clearRefreshInterval();
    };
  }, [boot, clearRefreshInterval]);

  const login = async (email: string, password: string): Promise<void> => {
    const authenticatedUser = await AuthService.login({ email, password });
    setUser(authenticatedUser);
    setIsAuthenticated(true);
    startRefreshInterval();
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<void> => {
    const authenticatedUser = await AuthService.register({
      name,
      email,
      password,
    });
    setUser(authenticatedUser);
    setIsAuthenticated(true);
    startRefreshInterval();
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isReady,
    login,
    register,
    logout,
  };

  if (!isReady) {
    return <LoadingSplash />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
