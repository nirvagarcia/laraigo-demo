import { ReactNode } from "react";
import { Container, Box, ContainerProps } from "@mui/material";
import { globalStyles } from "@shared/styles/globals";

export interface PageContainerProps extends Omit<ContainerProps, "children"> {
  children: ReactNode;
  centered?: boolean;
  fullHeight?: boolean;
  padding?: "none" | "small" | "medium" | "large";
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  centered = false,
  fullHeight = false,
  padding = "medium",
  sx,
  ...props
}) => {
  const getPaddingValue = () => {
    switch (padding) {
      case "none":
        return 0;
      case "small":
        return 2;
      case "medium":
        return { xs: 2, sm: 3, md: 4 };
      case "large":
        return { xs: 3, sm: 4, md: 6 };
      default:
        return { xs: 2, sm: 3, md: 4 };
    }
  };

  const containerSx = {
    maxWidth: "1200px",
    margin: "0 auto",
    ...(fullHeight && { minHeight: "100vh" }),
    p: getPaddingValue(),
    ...sx,
  };

  const content = centered ? (
    <Box sx={globalStyles.centeredContent}>{children}</Box>
  ) : (
    children
  );

  return (
    <Container maxWidth="xl" sx={containerSx} {...props}>
      {content}
    </Container>
  );
};

export default PageContainer;
