import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { colors } from "@shared/styles/colors";

export const LoadingSplash: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        background: colors.gradient.primary,
        color: "white",
      }}
    >
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          borderRadius: 4,
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          p: 6,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            background: colors.gradient.primary,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            color: "transparent",
            mb: 3,
          }}
        >
          Laraigo
        </Typography>

        <CircularProgress
          sx={{
            color: colors.primary[500],
            mb: 3,
          }}
          size={48}
        />

        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: colors.primary[700],
            mb: 1,
          }}
        >
          Iniciando sesión...
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: colors.neutral[600],
            opacity: 0.8,
          }}
        >
          Verificando credenciales
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingSplash;
