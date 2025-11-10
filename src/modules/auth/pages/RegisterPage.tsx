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
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@shared/components/ui/Button";
import { useToast } from "@shared/components/ui";
import { useAuth } from "@app/providers/AuthProvider";
import { useTranslation } from "@app/providers/I18nProvider";
import {
  registerSchema,
  RegisterFormData,
  getPasswordStrength,
} from "@shared/schemas/authSchemas";
import { colors } from "@shared/styles/colors";

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const { register: registerUser } = useAuth();
  const { t } = useTranslation();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const watchedPassword = watch("password");
  const passwordStrength = watchedPassword
    ? getPasswordStrength(watchedPassword)
    : null;

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);

      await registerUser(data.name, data.email, data.password);

      toast.success(`¡Bienvenido a Laraigo, ${data.name}!`, 2000);

      setTimeout(() => {
        navigate("/campaigns", { replace: true });
      }, 2000);
    } catch (err: any) {
      let errorMessage = "Error de registro. Inténtalo de nuevo.";

      if (err.message === "EMAIL_EXISTS") {
        errorMessage = "Este email ya está registrado. Usa uno diferente.";
      } else if (err.message === "INVALID_DATA") {
        errorMessage = "Datos inválidos. Revisa tu información.";
      } else if (err.message === "SERVER_ERROR") {
        errorMessage = "Error del servidor. Intenta más tarde.";
      } else if (err.message === "NETWORK_ERROR") {
        errorMessage = "Error de conexión. Intenta más tarde.";
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <Box
      sx={{
        opacity: 1,
        transform: "translateX(0)",
        transition: "all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
        animation: "fadeInSlide 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "@keyframes fadeInSlide": {
          "0%": {
            opacity: 0,
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
      }}
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
        <Box
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
          sx={{
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: 4,
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            p: { xs: 3, sm: 4, md: 6 },
            width: "100%",
            maxWidth: { xs: "90%", sm: 520 },
            position: "relative",
            zIndex: 1,
            transition: "all 0.35s cubic-bezier(0.25, 0.1, 0.25, 1)",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 24px 48px rgba(0, 0, 0, 0.12)",
            },
            "@media (hover: none) and (pointer: coarse)": {
              "&:hover": {
                transform: "none",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
              },
            },
          }}
        >
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
              {t("auth.register.title")}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: colors.neutral[600],
                opacity: 0.8,
              }}
            >
              {t("auth.register.subtitle")}
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={{ xs: 2.5, sm: 3 }}>
              <TextField
                fullWidth
                label={t("fields.name")}
                autoComplete="name"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person sx={{ color: colors.primary[500] }} />
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
                    transition: "all 0.3s ease",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary[400],
                      },
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.1)",
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary[500],
                        borderWidth: 2,
                      },
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: colors.primary[500],
                  },
                }}
              />

              <Box>
                <TextField
                  fullWidth
                  label={t("fields.password")}
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
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
                      transition: "all 0.3s ease",
                      "&:hover": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.primary[400],
                        },
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.1)",
                      },
                      "&.Mui-focused": {
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: colors.primary[500],
                          borderWidth: 2,
                        },
                        transform: "translateY(-1px)",
                        boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
                      },
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: colors.primary[500],
                    },
                  }}
                />

                {watchedPassword && passwordStrength && (
                  <Box sx={{ mt: 1 }}>
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: 1 }}
                    >
                      <Typography variant="caption" color="text.secondary">
                        {t("auth.password.security")}:
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color:
                            passwordStrength.color === "error"
                              ? colors.semantic.error
                              : passwordStrength.color === "warning"
                                ? colors.semantic.warning
                                : passwordStrength.color === "info"
                                  ? colors.semantic.info
                                  : passwordStrength.color === "success"
                                    ? colors.semantic.success
                                    : colors.neutral[500],
                          fontWeight: 600,
                          textTransform: "capitalize",
                        }}
                      >
                        {passwordStrength.strength === "weak" &&
                          t("auth.password.strength.weak")}
                        {passwordStrength.strength === "fair" &&
                          t("auth.password.strength.fair")}
                        {passwordStrength.strength === "good" &&
                          t("auth.password.strength.good")}
                        {passwordStrength.strength === "strong" &&
                          t("auth.password.strength.strong")}
                      </Typography>
                    </Stack>
                    <LinearProgress
                      variant="determinate"
                      value={
                        passwordStrength.strength === "weak"
                          ? 25
                          : passwordStrength.strength === "fair"
                            ? 50
                            : passwordStrength.strength === "good"
                              ? 75
                              : 100
                      }
                      sx={{
                        height: 4,
                        borderRadius: 2,
                        backgroundColor: colors.neutral[200],
                        "& .MuiLinearProgress-bar": {
                          backgroundColor:
                            passwordStrength.color === "error"
                              ? colors.semantic.error
                              : passwordStrength.color === "warning"
                                ? colors.semantic.warning
                                : passwordStrength.color === "info"
                                  ? colors.semantic.info
                                  : passwordStrength.color === "success"
                                    ? colors.semantic.success
                                    : colors.neutral[500],
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Box>
                )}
              </Box>

              <TextField
                fullWidth
                label={t("fields.confirmPassword")}
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                {...register("confirmPassword")}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: colors.primary[500] }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleToggleConfirmPassword}
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
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    transition: "all 0.3s ease",
                    "&:hover": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary[400],
                      },
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.1)",
                    },
                    "&.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary[500],
                        borderWidth: 2,
                      },
                      transform: "translateY(-1px)",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.15)",
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
                disabled={isLoading}
                sx={{
                  py: { xs: 1.75, sm: 1.5 },
                  borderRadius: 2,
                  fontSize: { xs: "1rem", sm: "1rem" },
                  fontWeight: 600,
                  background: colors.gradient.primary,
                  color: "white",
                  boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  minHeight: { xs: "52px", sm: "auto" },
                  "&:hover": {
                    boxShadow: "0 6px 20px rgba(99, 102, 241, 0.4)",
                    transform: "translateY(-2px)",
                    "@media (hover: none) and (pointer: coarse)": {
                      transform: "none",
                      boxShadow: "0 4px 12px rgba(99, 102, 241, 0.3)",
                    },
                  },
                  "&:active": {
                    transform: "translateY(0px)",
                    boxShadow: "0 2px 8px rgba(99, 102, 241, 0.3)",
                  },
                  "&:disabled": {
                    background: colors.neutral[300],
                    color: colors.neutral[500],
                    boxShadow: "none",
                    transform: "none",
                  },
                }}
              >
                {isLoading ? (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <CircularProgress size={16} color="inherit" />
                    <span>{t("auth.register.button.loading")}</span>
                  </Stack>
                ) : (
                  t("auth.register.button")
                )}
              </Button>
            </Stack>
          </form>

          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Typography variant="body2" sx={{ color: colors.neutral[600] }}>
              {t("auth.register.login_link").split(" ").slice(0, -3).join(" ")}{" "}
              <MuiLink
                component={Link}
                to="/login"
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
                {t("auth.register.login_link").split(" ").slice(-3).join(" ")}
              </MuiLink>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default RegisterPage;
