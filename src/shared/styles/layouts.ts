import { SxProps, Theme } from "@mui/material";

export const layouts = {
  flexCenter: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  } as SxProps<Theme>,

  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  } as SxProps<Theme>,

  flexStart: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  } as SxProps<Theme>,

  flexEnd: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  } as SxProps<Theme>,

  flexColumn: {
    display: "flex",
    flexDirection: "column",
  } as SxProps<Theme>,

  flexColumnCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  } as SxProps<Theme>,

  gridResponsive: {
    display: "grid",
    gridTemplateColumns: {
      xs: "1fr",
      sm: "1fr 1fr",
      md: "1fr 1fr 1fr",
      lg: "1fr 1fr 1fr 1fr",
    },
    gap: 3,
  } as SxProps<Theme>,

  gridTwoColumns: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    gap: 3,
  } as SxProps<Theme>,

  gridThreeColumns: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr", lg: "1fr 1fr 1fr" },
    gap: 3,
  } as SxProps<Theme>,

  sectionWrapper: (theme: Theme) =>
    ({
      padding: theme.spacing(4, 3),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(6, 4),
      },
    }) as SxProps<Theme>,

  sectionWrapperLarge: (theme: Theme) =>
    ({
      padding: theme.spacing(6, 3),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(8, 4),
      },
    }) as SxProps<Theme>,

  pageLayout: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
  } as SxProps<Theme>,

  pageContent: (theme: Theme) =>
    ({
      flex: 1,
      padding: theme.spacing(3),
      [theme.breakpoints.up("md")]: {
        padding: theme.spacing(4),
      },
    }) as SxProps<Theme>,

  cardGrid: {
    display: "grid",
    gap: 3,
    gridTemplateColumns: {
      xs: "1fr",
      sm: "repeat(auto-fit, minmax(300px, 1fr))",
    },
  } as SxProps<Theme>,

  cardList: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
  } as SxProps<Theme>,

  navList: (theme: Theme) =>
    ({
      listStyle: "none",
      padding: 0,
      margin: 0,
      "& li": {
        marginBottom: theme.spacing(1),
      },
    }) as SxProps<Theme>,

  navItem: (theme: Theme) =>
    ({
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(1.5, 2),
      borderRadius: theme.spacing(1),
      textDecoration: "none",
      color: theme.palette.text.primary,
      transition: theme.transitions.create(["background-color", "color"], {
        duration: theme.transitions.duration.short,
      }),
      "&:hover": {
        backgroundColor: theme.palette.action.hover,
      },
      "&.active": {
        backgroundColor: theme.palette.primary.light + "20",
        color: theme.palette.primary.main,
      },
    }) as SxProps<Theme>,

  formRow: {
    display: "flex",
    gap: 2,
    flexWrap: "wrap",
    "& > *": {
      flex: 1,
      minWidth: "200px",
    },
  } as SxProps<Theme>,

  formGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
    gap: 3,
  } as SxProps<Theme>,

  heroContent: {
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  } as SxProps<Theme>,

  heroActions: {
    display: "flex",
    gap: 2,
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 4,
  } as SxProps<Theme>,

  fullHeight: {
    height: "100%",
  } as SxProps<Theme>,

  fullWidth: {
    width: "100%",
  } as SxProps<Theme>,

  hidden: {
    display: "none",
  } as SxProps<Theme>,

  visuallyHidden: {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: 0,
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  } as SxProps<Theme>,
} as const;

export type Layouts = typeof layouts;
