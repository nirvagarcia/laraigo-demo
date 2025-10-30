import { forwardRef, ReactNode } from "react";
import { useTheme } from "@mui/material";
import { AppBox } from "@shared/components/ui/AppBox";
import { AppText } from "@shared/components/ui/AppText";

export interface FeatureItem {
  id: string;
  icon: string;
  title: string;
  description: string;
}

export interface FeatureGridProps {
  features: FeatureItem[];
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  sx?: any;
  renderItem?: (feature: FeatureItem) => ReactNode;
}

export const FeatureGrid = forwardRef<HTMLDivElement, FeatureGridProps>(
  ({ features, gap = 4, sx, renderItem }, ref) => {
    const theme = useTheme();

    const defaultRenderItem = (feature: FeatureItem) => (
      <AppBox
        key={feature.id}
        direction="column"
        align="center"
        sx={{ opacity: 0.9 }}
      >
        <AppText
          variant="h6"
          weight="semibold"
          sx={{
            mb: theme.spacing(1),
            textAlign: "center",
          }}
        >
          {feature.icon} {feature.title}
        </AppText>
        <AppText
          variant="body2"
          sx={{
            opacity: 0.8,
            textAlign: "center",
          }}
        >
          {feature.description}
        </AppText>
      </AppBox>
    );

    return (
      <AppBox
        ref={ref}
        direction="row"
        gap={gap}
        justify="center"
        sx={{
          flexDirection: { xs: "column", md: "row" },
          ...sx,
        }}
      >
        {features.map(renderItem || defaultRenderItem)}
      </AppBox>
    );
  }
);

FeatureGrid.displayName = "FeatureGrid";

export default FeatureGrid;
