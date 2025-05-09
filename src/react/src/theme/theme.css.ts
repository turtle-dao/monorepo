import { createThemeContract } from "@vanilla-extract/css";

export const themeVars = createThemeContract({
  borderRadius: null,
  gap: null,
  padding: null,
  fontFamily: null,
  fontSize: null,
  fontWeight: null,
  bgPrimary: null,
  bgSecondary: null,
  bgAccent: null,
  bgTranslucent: null,
  borderColor: null,
  textPrimary: null,
  textSecondary: null,
  buttonBgColor: null,
  buttonTextColor: null,
  errorColor: null,
});
