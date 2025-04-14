import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const input = style({
  background: themeVars.bgPrimary,
  color: themeVars.textPrimary,
  borderRadius: themeVars.borderRadius,
  borderColor: themeVars.borderColor,
  borderWidth: "1px",
  borderStyle: "solid",
  padding: "8px 12px",
  outline: "none",
  fontFamily: themeVars.fontFamily,
  fontSize: themeVars.fontSize,
  fontWeight: 500,
});
