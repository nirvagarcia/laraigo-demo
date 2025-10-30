import { ReactNode } from "react";
import { useTheme } from "@mui/material";
import { AppBox } from "@shared/components/ui/AppBox";
import { layouts } from "@shared/styles/layouts";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const sidebarWidth = 280;
  const theme = useTheme();

  return (
    <AppBox direction="row" sx={layouts.pageLayout}>
      <Sidebar />

      <AppBox
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: `${sidebarWidth}px`,
          minHeight: "100vh",
          backgroundColor: theme.palette.background.default,
          position: "relative",
        }}
      >
        {children}
      </AppBox>
    </AppBox>
  );
};

export default MainLayout;
