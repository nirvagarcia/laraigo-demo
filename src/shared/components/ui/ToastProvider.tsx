import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { Snackbar, Alert, AlertColor, Slide, SlideProps } from "@mui/material";
import {
  CheckCircleIcon,
  ErrorIcon,
  WarningIcon,
  InfoIcon,
} from "@shared/components/icons";

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

function SlideTransition(props: SlideProps) {
  return (
    <Slide
      {...props}
      direction="left"
      timeout={{
        enter: 400,
        exit: 300,
      }}
      easing={{
        enter: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        exit: "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
      }}
    />
  );
}

const getIcon = (type: AlertColor) => {
  const iconProps = { fontSize: "small" as const };

  switch (type) {
    case "success":
      return <CheckCircleIcon {...iconProps} />;
    case "error":
      return <ErrorIcon {...iconProps} />;
    case "warning":
      return <WarningIcon {...iconProps} />;
    case "info":
      return <InfoIcon {...iconProps} />;
    default:
      return <InfoIcon {...iconProps} />;
  }
};

const getGradientBackground = (type: AlertColor): string => {
  const baseColors = {
    success: "#4caf50",
    error: "#f44336",
    warning: "#ff9800",
    info: "#2196f3",
  };

  const color = baseColors[type as keyof typeof baseColors];
  return `linear-gradient(135deg, ${color}ee, ${color}dd)`;
};

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (type: AlertColor, message: string, duration = 4000) => {
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

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {toasts.map((toast) => (
        <Snackbar
          key={toast.id}
          open={true}
          autoHideDuration={toast.duration}
          onClose={() => removeToast(toast.id)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          TransitionComponent={SlideTransition}
          sx={{
            zIndex: 10000,
            "& .MuiSnackbar-root": {
              position: "fixed",
              top: `${24 + toasts.findIndex((t) => t.id === toast.id) * 88}px !important`,
              right: "24px !important",
              left: "auto !important",
            },
          }}
        >
          <Alert
            onClose={() => removeToast(toast.id)}
            severity={toast.type}
            icon={getIcon(toast.type)}
            variant="filled"
            sx={{
              width: "100%",
              maxWidth: 420,
              minWidth: 320,
              borderRadius: 3,
              border: "1px solid rgba(255, 255, 255, 0.2)",
              boxShadow: (theme) =>
                `0 8px 32px rgba(0, 0, 0, 0.12), 0 2px 16px rgba(0, 0, 0, 0.08), ${theme.shadows[8]}`,
              backdropFilter: "blur(20px)",
              background: getGradientBackground(toast.type),
              "&:hover": {
                transform: "translateY(-2px)",
                boxShadow: (theme) =>
                  `0 12px 40px rgba(0, 0, 0, 0.15), 0 4px 20px rgba(0, 0, 0, 0.1), ${theme.shadows[12]}`,
              },
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              "& .MuiAlert-icon": {
                alignItems: "center",
                fontSize: "1.25rem",
                marginRight: 2,
                filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.2))",
              },
              "& .MuiAlert-message": {
                fontWeight: 600,
                fontSize: "0.9rem",
                lineHeight: 1.5,
                color: "white",
                textShadow: "0 1px 2px rgba(0, 0, 0, 0.1)",
                flex: 1,
              },
              "& .MuiAlert-action": {
                alignItems: "center",
                paddingTop: 0,
                marginLeft: 1,
                "& .MuiIconButton-root": {
                  color: "rgba(255, 255, 255, 0.8)",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  padding: "4px",
                  backdropFilter: "blur(10px)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                    transform: "scale(1.1)",
                  },
                  transition: "all 0.2s ease",
                },
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
