import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
  CircularProgress,
  Link as MuiLink,
  LinearProgress,
} from "@mui/material";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@shared/components/ui/Button";
import { useToast } from "@shared/components/ui";
import { useAuth } from "@app/providers/AuthProvider";
import { useTranslation } from "@app/providers/I18nProvider";
import { loginSchema, LoginFormData } from "@shared/schemas/authSchemas";
import { colors } from "@shared/styles/colors";

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { t } = useTranslation();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      setHasError(false);

      await login(data.email, data.password);

      setIsSuccess(true);
      const userName = data.email.split("@")[0];
      toast.success(t("auth.login.success", { name: userName }), 4000);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1200);
    } catch (err: any) {
      setHasError(true);
      setValue("password", "");

      let errorMessage = t("auth.login.error.general");

      if (err.message === "INVALID_CREDENTIALS") {
        errorMessage = t("auth.login.error.invalid");
      } else if (err.message === "NETWORK_ERROR") {
        errorMessage = t("auth.login.error.network");
      } else if (err.message === "SERVER_ERROR") {
        errorMessage = t("auth.login.error.server");
      }

      toast.error(errorMessage, 5000);

      setTimeout(() => setHasError(false), 500);
    } finally {
      setIsLoading(false);
    }
  };
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: colors.gradient.primary,
          position: "relative",
          overflow: "hidden",
          p: 2,
        }}
      >
        {/* Background elements */}
        <Box
          component={motion.div}
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.1)",
            filter: "blur(60px)",
          }}
        />
        <Box
          component={motion.div}
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          sx={{
            position: "absolute",
            bottom: -150,
            left: -150,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.08)",
            filter: "blur(80px)",
          }}
        />

        <Box
          component={motion.div}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{
            scale: isSuccess ? 0.95 : 1,
            opacity: isSuccess ? 0.7 : 1,
            y: hasError ? [-5, 5, -5, 5, 0] : 0,
          }}
          transition={{
            scale: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
            opacity: { duration: 0.4 },
            y: { duration: 0.5, ease: "easeOut" },
          }}
          sx={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            p: { xs: 3, sm: 4, md: 6 },
            width: "100%",
            maxWidth: { xs: "90%", sm: 480 },
            position: "relative",
            zIndex: 1,
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            ...(isLoading
              ? {}
              : {
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 24px 48px rgba(0, 0, 0, 0.12)",
                  },
                }),
            "@media (hover: none) and (pointer: coarse)": {
              "&:hover": {
                transform: "none",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        >
          {/* Loading Progress Bar */}
          {isLoading && (
            <LinearProgress
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                borderRadius: "16px 16px 0 0",
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                "& .MuiLinearProgress-bar": {
                  backgroundColor: colors.primary[500],
                },
              }}
            />
          )}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                background: colors.gradient.primary,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 1,
              }}
            >
              Laraigo
            </Typography>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: colors.primary[700],
                mb: 1,
              }}
            >
              {t("auth.login.title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.neutral[600],
                opacity: 0.8,
              }}
            >
              {t("auth.login.subtitle")}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={{ xs: 2.5, sm: 3 }}>
              <TextField
                fullWidth
                label={t("fields.email")}
                type="email"
                autoComplete="email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: colors.primary[500] }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    minHeight: { xs: "52px", sm: "56px" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary[400],
                      },
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.1)",
                      "@media (hover: none) and (pointer: coarse)": {
                        transform: "none",
                        boxShadow: "none",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary[500],
                        borderWidth: 2,
                      },
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
                      "@media (hover: none) and (pointer: coarse)": {
                        transform: "none",
                        boxShadow: "0 2px 6px rgba(99, 102, 241, 0.1)",
                      },
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[500],
                  },
                }}
              />

              <TextField
                fullWidth
                label={t("fields.password")}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: colors.primary[500] }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleTogglePassword}
                        edge="end"
                        size="small"
                        sx={{
                          transition: "all 0.2s ease",
                          "&:hover": {
                            backgroundColor: "rgba(99, 102, 241, 0.1)",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    minHeight: { xs: "52px", sm: "56px" },
                    transition: "all 0.3s ease",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary[400],
                      },
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.1)",
                      "@media (hover: none) and (pointer: coarse)": {
                        transform: "none",
                        boxShadow: "none",
                      },
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary[500],
                        borderWidth: 2,
                      },
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
                      "@media (hover: none) and (pointer: coarse)": {
                        transform: "none",
                        boxShadow: "0 2px 6px rgba(99, 102, 241, 0.1)",
                      },
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[500],
                  },
                }}
              />

              <Button
                type="submit"
                variant="primary"
                size="large"
                disabled={isLoading || isSuccess}
                sx={{
                  py: { xs: 1.75, sm: 1.5 },
                  borderRadius: 2,
                  fontSize: { xs: "1rem", sm: "1rem" },
                  fontWeight: 600,
                  background: isSuccess
                    ? "linear-gradient(135deg, #10B981 0%, #34D399 100%)"
                    : colors.gradient.primary,
                  color: "white",
                  boxShadow: isLoading
                    ? "0 2px 8px rgba(99, 102, 241, 0.2)"
                    : "0 4px 12px rgba(99, 102, 241, 0.3)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  minHeight: { xs: "52px", sm: "auto" },
                  transform: isLoading ? "scale(0.98)" : "scale(1)",
                  "&:hover":
                    !isLoading && !isSuccess
                      ? {
                          boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                          transform: "translateY(-2px)",
                          "@media (hover: none) and (pointer: coarse)": {
                            transform: "none",
                            boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                          },
                        }
                      : {},
                  "&:active":
                    !isLoading && !isSuccess
                      ? {
                          transform: "translateY(0px)",
                          boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
                        }
                      : {},
                  "&:disabled": {
                    background: isSuccess
                      ? "linear-gradient(135deg, #10B981 0%, #34D399 100%)"
                      : colors.neutral[300],
                    color: isSuccess ? "white" : colors.neutral[500],
                    boxShadow: "none",
                    transform: isLoading ? "scale(0.98)" : "none",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  {isLoading && (
                    <CircularProgress
                      size={18}
                      sx={{
                        color: "inherit",
                        animation: "spin 1s linear infinite",
                        "@keyframes spin": {
                          "0%": { transform: "rotate(0deg)" },
                          "100%": { transform: "rotate(360deg)" },
                        },
                      }}
                    />
                  )}
                  {isSuccess
                    ? "✓ " + t("auth.login.success_message")
                    : t("auth.login.submit")}
                </Box>
              </Button>
            </Stack>
          </form>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
              {t("auth.login.register_link").split(" ").slice(0, -3).join(" ")}{" "}
              <MuiLink
                component={Link}
                to="/register"
                sx={{
                  color: colors.primary[600],
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  "&:hover": {
                    textDecoration: "underline",
                    color: colors.primary[700],
                  },
                }}
              >
                {t("auth.login.register_link").split(" ").slice(-3).join(" ")}
              </MuiLink>
            </Typography>
          </Box>

          <Box
            sx={{
              mt: 4,
              p: 2,
              background: colors.neutral[50],
              borderRadius: 2,
              border: `1px solid ${colors.neutral[200]}`,
              transition: "all 0.3s ease",
              "&:hover": {
                background: colors.neutral[100],
                borderColor: colors.neutral[300],
              },
            }}
          >
            <Typography
              variant="caption"
              sx={{
                color: colors.neutral[600],
                fontWeight: 600,
                display: "block",
                mb: 0.5,
              }}
            >
              {t("auth.login.demo_credentials")}:
            </Typography>
            <Typography variant="caption" sx={{ color: colors.neutral[500] }}>
              Email: demo@laraigo.com | Contraseña: Demo123456
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPage;
