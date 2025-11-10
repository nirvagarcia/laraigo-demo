import { useTheme, Avatar, IconButton, Tooltip } from "@mui/material";
import { LogoutOutlined } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBox } from "@shared/components/ui/AppBox";
import { AppText } from "@shared/components/ui/AppText";
import { useToast } from "@shared/components/ui";
import { useTranslation } from "@app/providers/I18nProvider";
import { useAuth } from "@app/providers/AuthProvider";
import { colors } from "@shared/styles/colors";

interface NavItem {
  label: string;
  path: string;
  icon: string;
}

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const toast = useToast();
  const theme = useTheme();

  const navItems: NavItem[] = [
    {
      label: t("menu.campaigns"),
      path: "/campaigns",
      icon: "📢",
    },
    {
      label: t("menu.templates"),
      path: "/templates",
      icon: "📋",
    },
    {
      label: t("menu.dashboard"),
      path: "/dashboard",
      icon: "📊",
    },
    {
      label: t("menu.reports"),
      path: "/reports",
      icon: "📈",
    },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success(t("auth.logout.success"), 4000);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(t("auth.logout.error"), 5000);
      navigate("/login");
    }
  };

  const getUserInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AppBox
      direction="column"
      sx={{
        width: 280,
        height: "100vh",
        background: colors.gradient.sidebar,
        color: "white",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1200,
        boxShadow: "4px 0 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <AppBox
        direction="column"
        align="center"
        p={3}
        sx={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <AppText
          variant="h5"
          weight="bold"
          sx={{
            textAlign: "center",
            background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Laraigo S26
        </AppText>
        <AppText
          variant="body2"
          sx={{
            textAlign: "center",
            opacity: 0.8,
            mt: theme.spacing(0.5),
          }}
        >
          {t("app.subtitle")}
        </AppText>
      </AppBox>

      <AppBox direction="column" sx={{ flex: 1 }} py={2}>
        <AppBox direction="column" px={2}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <AppBox
                key={item.path}
                direction="row"
                align="center"
                gap={2}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  cursor: "pointer",
                  borderRadius: theme.spacing(2),
                  mb: theme.spacing(1),
                  mx: theme.spacing(1),
                  px: theme.spacing(2),
                  py: theme.spacing(1.5),
                  color: "rgba(255, 255, 255, 0.9)",
                  backgroundColor: isActive
                    ? "rgba(255, 255, 255, 0.15)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                  transition: "all 0.2s ease-in-out",
                  ...(isActive && {
                    color: "white",
                    fontWeight: 600,
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                  }),
                }}
              >
                <AppText
                  sx={{
                    fontSize: "1.2rem",
                  }}
                >
                  {item.icon}
                </AppText>
                <AppText
                  variant="body1"
                  weight={isActive ? "semibold" : "regular"}
                >
                  {item.label}
                </AppText>
              </AppBox>
            );
          })}
        </AppBox>
      </AppBox>

      {user && (
        <AppBox
          direction="column"
          p={3}
          sx={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <AppBox
            direction="row"
            align="center"
            gap={2}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 2,
              background: "rgba(255, 255, 255, 0.1)",
            }}
          >
            <Avatar
              sx={{
                width: 40,
                height: 40,
                bgcolor: "rgba(255, 255, 255, 0.2)",
                color: "white",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              {getUserInitials(user.name)}
            </Avatar>
            <AppBox direction="column" flex={1}>
              <AppText
                variant="body2"
                weight="semibold"
                sx={{ color: "white" }}
              >
                {user.name}
              </AppText>
              <AppText
                variant="caption"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
                  fontSize: "0.75rem",
                }}
              >
                {user.email}
              </AppText>
            </AppBox>
          </AppBox>

          <Tooltip title="Cerrar Sesión" placement="top">
            <IconButton
              onClick={handleLogout}
              sx={{
                color: "rgba(255, 255, 255, 0.8)",
                background: "rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "rgba(255, 255, 255, 0.2)",
                  color: "white",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <LogoutOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </AppBox>
      )}

      <AppBox
        direction="column"
        align="center"
        p={3}
        sx={{
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <AppText
          variant="caption"
          sx={{
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          © 2025 Laraigo Platform
        </AppText>
        <AppText
          variant="caption"
          sx={{
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          v1.0.0
        </AppText>
      </AppBox>
    </AppBox>
  );
};

export default Sidebar;
