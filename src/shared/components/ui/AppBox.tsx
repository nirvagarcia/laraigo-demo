import { forwardRef, ReactNode } from "react";
import {
  Box as MuiBox,
  BoxProps as MuiBoxProps,
  useTheme,
} from "@mui/material";

export interface AppBoxProps extends Omit<MuiBoxProps, "padding" | "margin"> {
  children?: ReactNode;
  direction?: "row" | "column";
  justify?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  gap?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  mb?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  mt?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8;
  fullWidth?: boolean;
  fullHeight?: boolean;
  center?: boolean;
}

export const AppBox = forwardRef<HTMLDivElement, AppBoxProps>(
  (
    {
      children,
      direction = "column",
      justify,
      align,
      gap,
      p,
      px,
      py,
      m,
      mx,
      my,
      mb,
      mt,
      fullWidth,
      fullHeight,
      center,
      sx,
      ...props
    },
    ref
  ) => {
    const theme = useTheme();

    const getFlexSx = () => {
      const flexSx: any = {};

      if (direction || justify || align || gap !== undefined || center) {
        flexSx.display = "flex";
      }

      if (direction) {
        flexSx.flexDirection = direction;
      }

      if (justify) {
        flexSx.justifyContent = justify;
      }

      if (align) {
        flexSx.alignItems = align;
      }

      if (gap !== undefined) {
        flexSx.gap = theme.spacing(gap);
      }

      if (center) {
        flexSx.display = "flex";
        flexSx.justifyContent = "center";
        flexSx.alignItems = "center";
      }

      return flexSx;
    };

    const getSpacingSx = () => {
      const spacingSx: any = {};

      if (p !== undefined) spacingSx.p = theme.spacing(p);
      if (px !== undefined) spacingSx.px = theme.spacing(px);
      if (py !== undefined) spacingSx.py = theme.spacing(py);
      if (m !== undefined) spacingSx.m = theme.spacing(m);
      if (mx !== undefined) spacingSx.mx = theme.spacing(mx);
      if (my !== undefined) spacingSx.my = theme.spacing(my);
      if (mb !== undefined) spacingSx.mb = theme.spacing(mb);
      if (mt !== undefined) spacingSx.mt = theme.spacing(mt);

      if (fullWidth) spacingSx.width = "100%";
      if (fullHeight) spacingSx.height = "100%";

      return spacingSx;
    };

    return (
      <MuiBox
        ref={ref}
        sx={{
          ...getFlexSx(),
          ...getSpacingSx(),
          ...sx,
        }}
        {...props}
      >
        {children}
      </MuiBox>
    );
  }
);

AppBox.displayName = "AppBox";

export default AppBox;
