import { ReactNode } from "react";
import { Box } from "@mui/material";
import { Sidebar } from "./Sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const sidebarWidth = 280;

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          marginLeft: `${sidebarWidth}px`,
          minHeight: "100vh",
          backgroundColor: "#fafafa",
          position: "relative",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
