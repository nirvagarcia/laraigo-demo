import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  CircularProgress,
  Box,
} from "@mui/material";
import { WarningAmber } from "@mui/icons-material";
import { colors } from "@shared/styles/colors";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
  destructive?: boolean;
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  onConfirm,
  onCancel,
  loading = false,
  destructive = false,
}) => {
  return (
    <Dialog
      open={open}
      onClose={loading ? undefined : onCancel}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          backdropFilter: "blur(20px)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          pb: 2,
          pt: 3,
        }}
      >
        {destructive && (
          <WarningAmber
            sx={{
              color: colors.semantic.error,
              fontSize: "2rem",
            }}
          />
        )}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: destructive ? colors.semantic.error : colors.primary[700],
          }}
        >
          {title}
        </Typography>
      </DialogTitle>

      <DialogContent sx={{ pb: 2 }}>
        <Typography
          variant="body1"
          sx={{
            color: colors.neutral[600],
            lineHeight: 1.6,
          }}
        >
          {message}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 1 }}>
        <Button
          onClick={onCancel}
          disabled={loading}
          variant="outlined"
          sx={{
            borderColor: colors.neutral[300],
            color: colors.neutral[600],
            "&:hover": {
              borderColor: colors.neutral[400],
              backgroundColor: colors.neutral[50],
            },
          }}
        >
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          disabled={loading}
          variant="contained"
          sx={{
            backgroundColor: destructive
              ? colors.semantic.error
              : colors.primary[500],
            color: "white",
            minWidth: 100,
            "&:hover": {
              backgroundColor: destructive ? "#dc2626" : colors.primary[600],
            },
            "&:disabled": {
              backgroundColor: destructive ? "#fca5a5" : colors.neutral[300],
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {loading && (
              <CircularProgress
                size={16}
                sx={{
                  color: "inherit",
                }}
              />
            )}
            {confirmText}
          </Box>
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
