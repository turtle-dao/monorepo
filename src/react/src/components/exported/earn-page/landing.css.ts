import { card } from "@/components/ui/card.css";
import { rounding } from "@/theme/constants.css";
import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const banner = style([
  card({}),
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
