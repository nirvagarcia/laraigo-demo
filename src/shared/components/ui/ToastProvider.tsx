import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface ToastMessage {
  id: string;
  message: string;
  type: AlertColor;
  duration?: number;
}

interface ToastContextType {
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  warning: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
}

const ToastContext = createContext<ToastContextType | null>(null);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (type: AlertColor, message: string, duration = 3000) => {
      const id = `toast-${Date.now()}-${Math.random()}`;
      const newToast: ToastMessage = { id, message, type, duration };

      setToasts((prev) => [...prev, newToast]);

      setTimeout(() => {
        removeToast(id);
      }, duration);
    },
    [removeToast]
  );

  const contextValue: ToastContextType = {
    success: useCallback(
      (message: string, duration?: number) =>
        addToast("success", message, duration),
      [addToast]
    ),
    error: useCallback(
      (message: string, duration?: number) =>
        addToast("error", message, duration),
      [addToast]
    ),
    warning: useCallback(
      (message: string, duration?: number) =>
        addToast("warning", message, duration),
      [addToast]
    ),
    info: useCallback(
      (message: string, duration?: number) =>
        addToast("info", message, duration),
      [addToast]
    ),
  };

  const getBackgroundColor = (type: AlertColor): string => {
    switch (type) {
      case "success":
        return "rgba(46, 125, 50, 0.9)";
      case "error":
        return "rgba(211, 47, 47, 0.9)";
      case "warning":
        return "rgba(237, 108, 2, 0.9)";
      case "info":
        return "rgba(2, 136, 209, 0.9)";
      default:
        return "rgba(30, 30, 30, 0.9)";
    }
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toasts.map((toast, index) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={toast.duration}
          onClose={() => removeToast(toast.id)}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          sx={{
            "& .MuiSnackbar-root": {
              bottom: `${24 + index * 72}px !important`,
            },
          }}
        >
          <Alert
            onClose={() => removeToast(toast.id)}
            severity={toast.type}
            variant="filled"
            sx={{
              borderRadius: 3,
              backdropFilter: "blur(8px)",
              backgroundColor: getBackgroundColor(toast.type),
              color: "#fff",
              boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
              fontWeight: 500,
              minWidth: 300,
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
              },
            }}
          >
            {toast.message}
          </Alert>
        </Snackbar>
      ))}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

export default ToastProvider;
