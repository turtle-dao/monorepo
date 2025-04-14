import { card } from "@/components/ui/card.css";
import { flex } from "@/components/ui/flex.css";
import { padding, rounding } from "@/theme/constants.css";
import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const tableCard = style([
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

export const tableHeader = style([
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

export const tableContent = style([
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

export const tableFooter = style([
  {
    position: "sticky",
    top: 0,
    zIndex: 3,
    marginTop: "calc(-100vh + 10rem)",
  },
]);

export const tablePadding = style({
  height: "calc(100vh - 9rem)",
});

export const grid = style({
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(325px, 1fr))",
  gap: themeVars.gap,
});

export const banner = style([
  card,
  rounding({ size: "xl" }),
  {
    position: "relative",
    minHeight: "175px",
    borderColor: themeVars.buttonBgColor,
    overflow: "hidden",
  },
  {
    "::before": {
      content: "",
      position: "absolute",
      inset: 0,
      background: `linear-gradient(120deg, transparent 35%, ${themeVars.buttonBgColor} 100%)`,
      opacity: 0.1,
      pointerEvents: "none",
      userSelect: "none",
    },
  },
]);

export const loadingCard = style({
  background: themeVars.bgSecondary,
  height: "175px",
});

export const cardHeader = style({
  display: "flex",
  gap: "0.25rem",
  alignItems: "center",
});

export const boostContainer = style({
  display: "flex",
  alignItems: "center",
  gap: "0.25rem",
});

export const cardActions = style({
  display: "flex",
  alignItems: "flex-end",
  gap: "0.25rem",
  justifyContent: "space-between",
});

export const search = style({
  height: "2rem",
});

export const empty = style({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const emptyLogo = style({
  minWidth: "1.75rem",
  minHeight: "1.75rem",
  maxWidth: "1.75rem",
  maxHeight: "1.75rem",
  background: themeVars.bgAccent,
  borderRadius: "99999px",
  marginRight: "0.375rem",
});

export const spacer = style({
  flex: 1,
});
