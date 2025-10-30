import { forwardRef } from "react";
import {
  List as MuiList,
  ListProps as MuiListProps,
  ListItem,
  ListItemText,
  Box,
  useTheme,
} from "@mui/material";

export interface AppListItem {
  id: string | number;
  text: string;
  icon?: string;
}

export interface AppListProps extends Omit<MuiListProps, "children"> {
  items: AppListItem[];
  variant?: "default" | "bulleted" | "numbered" | "icon";
  spacing?: "none" | "small" | "medium" | "large";
  bullet?: string;
  color?: "primary" | "secondary" | "text" | "muted";
}

export const AppList = forwardRef<HTMLUListElement, AppListProps>(
  (
    {
      items,
      variant = "default",
      spacing = "small",
      bullet = "•",
      color = "text",
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const getSpacingValue = () => {
      switch (spacing) {
        case "none":
          return 0;
        case "small":
          return theme.spacing(0.5);
        case "medium":
          return theme.spacing(1);
        case "large":
          return theme.spacing(2);
        default:
          return theme.spacing(0.5);
      }
    };

    const getTextColor = () => {
      switch (color) {
        case "primary":
          return theme.palette.primary.main;
        case "secondary":
          return theme.palette.secondary.main;
        case "text":
          return theme.palette.text.primary;
        case "muted":
          return theme.palette.text.secondary;
        default:
          return theme.palette.text.primary;
      }
    };

    const getBulletColor = () => {
      switch (color) {
        case "primary":
          return theme.palette.primary.main;
        case "secondary":
          return theme.palette.secondary.main;
        default:
          return theme.palette.primary.main;
      }
    };

    if (variant === "bulleted") {
      return (
        <Box
          ref={ref}
          component="ul"
          sx={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            "& li": {
              display: "flex",
              alignItems: "flex-start",
              color: getTextColor(),
              fontSize: theme.typography.body2.fontSize,
              marginBottom: getSpacingValue(),
              "&:before": {
                content: `"${bullet}"`,
                color: getBulletColor(),
                marginRight: theme.spacing(1),
                flexShrink: 0,
                lineHeight: 1,
              },
            },
            ...sx,
          }}
          {...props}
        >
          {items.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </Box>
      );
    }

    if (variant === "numbered") {
      return (
        <Box
          ref={ref}
          component="ol"
          sx={{
            padding: 0,
            paddingLeft: theme.spacing(3),
            margin: 0,
            "& li": {
              color: getTextColor(),
              fontSize: theme.typography.body2.fontSize,
              marginBottom: getSpacingValue(),
              "& ::marker": {
                color: getBulletColor(),
                fontWeight: theme.typography.fontWeightMedium,
              },
            },
            ...sx,
          }}
          {...props}
        >
          {items.map((item) => (
            <li key={item.id}>{item.text}</li>
          ))}
        </Box>
      );
    }

    return (
      <MuiList
        ref={ref}
        sx={{
          padding: 0,
          "& .MuiListItem-root": {
            paddingY: getSpacingValue(),
          },
          ...sx,
        }}
        {...props}
      >
        {items.map((item) => (
          <ListItem key={item.id} sx={{ px: 0 }}>
            {variant === "icon" && item.icon && (
              <Box sx={{ mr: 2, fontSize: "1.2em" }}>{item.icon}</Box>
            )}
            <ListItemText
              primary={item.text}
              sx={{
                "& .MuiListItemText-primary": {
                  color: getTextColor(),
                  fontSize: theme.typography.body2.fontSize,
                },
              }}
            />
          </ListItem>
        ))}
      </MuiList>
    );
  }
);

AppList.displayName = "AppList";

export default AppList;
