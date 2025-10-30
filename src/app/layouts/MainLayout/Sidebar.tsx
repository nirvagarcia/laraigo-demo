import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
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
    <Box
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 3,
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            textAlign: "center",
            background: "linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Laraigo S26
        </Typography>
        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            opacity: 0.8,
            mt: 0.5,
          }}
        >
          {t("app.subtitle")}
        </Typography>
      </Box>

      <Box sx={{ flex: 1, py: 2 }}>
        <List sx={{ px: 2 }}>
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <ListItemButton
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  py: 1.5,
                  px: 2,
                  color: "rgba(255, 255, 255, 0.9)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    color: "white",
                    transform: "translateX(4px)",
                  },
                  ...(isActive && {
                    backgroundColor: "rgba(255, 255, 255, 0.15)",
                    color: "white",
                    fontWeight: 600,
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                  }),
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: "1.2rem",
                    mr: 2,
                  }}
                >
                  {item.icon}
                </Typography>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontWeight: isActive ? 600 : 500,
                    fontSize: "0.95rem",
                  }}
                />
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      <Box
        sx={{
          p: 3,
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          © 2025 Laraigo Platform
        </Typography>
        <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            opacity: 0.7,
          }}
        >
          v1.0.0
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
