import { gap, padding } from "@/theme/constants.css";
import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";
import { flex } from "./flex.css";

export const card = style([
  flex({ direction: "column", items: "stretch", gap: "none" }),
  {
    "position": "relative",

    "::before": {
      content: "",
      position: "sticky",
      top: "0rem",
      zIndex: 1,
      left: 0,
      right: 0,
      height: "6rem",
      background: themeVars.bgSecondary,
      marginTop: "-6rem",
    },
  },
]);

export const grid = style([
  gap({ size: "sm" }),
  {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
]);

export const header = style([
  flex({ justify: "between", items: "center", gap: "sm" }),
  padding({ size: "xl" }),
  {
    position: "sticky",
    top: "5rem",
    zIndex: 3,

    minHeight: "3rem",
    maxHeight: "3rem",

    background: themeVars.borderColor,
    borderTopLeftRadius: `calc(${themeVars.borderRadius} * 2)`,
    borderTopRightRadius: `calc(${themeVars.borderRadius} * 2)`,
  },
]);

export const search = style({
  height: "2rem",
});

export const content = style([
  padding(),
  {
    flex: 1,
    width: "100%",
    paddingTop: 0,
    position: "relative",
    zIndex: 0,

    background: themeVars.borderColor,
    borderBottomLeftRadius: `calc(${themeVars.borderRadius} * 2)`,
    borderBottomRightRadius: `calc(${themeVars.borderRadius} * 2)`,
  },
]);

export const footer = style([
  {
    position: "sticky",
    top: 0,
    zIndex: 3,
    marginTop: "calc(-100vh + 10rem)",
  },
]);

export const pad = style({
  height: "calc(100vh - 9rem)",
});

export const empty = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  paddingTop: "3rem",
});

export const logoWrapper = style({
  width: "1.25rem",
  height: "1.25rem",
  borderRadius: "99999px",
  overflow: "hidden",
});
