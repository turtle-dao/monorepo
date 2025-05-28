import { style } from "@vanilla-extract/css";
import { gap, padding } from "@/theme/constants.css";
import { themeVars } from "@/theme/theme.css";
import { flex } from "./flex.css";

export const card = style([
  flex({ direction: "column", items: "stretch", gap: "none" }),
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
    minHeight: "3rem",
    maxHeight: "3rem",

    background: themeVars.bgPrimary,
    border: `1px solid ${themeVars.borderColor}`,
    borderBottom: "none",

    borderTopLeftRadius: `calc(${themeVars.borderRadius} * 2)`,
    borderTopRightRadius: `calc(${themeVars.borderRadius} * 2)`,
  },
]);

export const search = style({
  height: "2.25rem",
});

export const content = style([
  padding(),
  {
    flex: 1,
    width: "100%",
    paddingTop: 0,
    position: "relative",
    zIndex: 0,
    minHeight: "18rem",

    background: themeVars.bgPrimary,
    border: `1px solid ${themeVars.borderColor}`,
    borderTop: "none",

    borderBottomLeftRadius: `calc(${themeVars.borderRadius} * 2)`,
    borderBottomRightRadius: `calc(${themeVars.borderRadius} * 2)`,
  },
]);

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
