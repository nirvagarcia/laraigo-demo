import { useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { AppBox } from "@shared/components/ui/AppBox";
import { AppText } from "@shared/components/ui/AppText";
import { useTranslation } from "@app/providers/I18nProvider";
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
