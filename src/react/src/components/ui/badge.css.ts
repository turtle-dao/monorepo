import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";

export const badge = style({
  background: themeVars.bgAccent,
  borderRadius: `calc(${themeVars.borderRadius} / 1.5)`,
  padding: "0.125rem 0.35rem",
  fontSize: `calc(${themeVars.fontSize} * 0.85)`,
  fontWeight: 600,
  fontFamily: "monospace",
  color: themeVars.textSecondary,
});
