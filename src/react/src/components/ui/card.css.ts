import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const card = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",

  gap: themeVars.gap,
  padding: themeVars.padding,
  borderRadius: themeVars.borderRadius,

  background: themeVars.bgPrimary,
  border: `1px solid ${themeVars.borderColor}`,
});
