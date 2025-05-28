import type { TurtleThemeConfig } from ".";

export const defaultThemeConfig: TurtleThemeConfig = {
  theme: "dark",
  shared: {
    borderRadius: "0.5rem",
    gap: "0.75rem",
    padding: "1rem",
    fontFamily: "Inter, system-ui, -apple-system, sans-serif",
    fontSize: "1rem",
    fontWeight: "400",
  },
  light: {
    bgPrimary: "rgba(230, 230, 230)",
    bgSecondary: "rgb(245, 245, 245)",
    bgAccent: "rgba(245, 245, 245)",
    bgTranslucent: "hsl(0 0% 10% / 0.25)",
    borderColor: "rgb(210, 210, 210)",
    textPrimary: "rgba(10, 10, 10)",
    textSecondary: "rgba(30, 30, 30)",
    buttonBgColor: "hsl(117, 85%, 69%)",
    buttonTextColor: "rgb(10, 10, 10)",
    errorColor: "rgb(247, 23, 53)",
  },
  dark: {
    bgPrimary: "rgb(32, 32, 34)",
    bgSecondary: "rgba(20, 20, 20)",
    bgAccent: "rgba(60, 60, 60)",
    bgTranslucent: "hsl(0 0% 90% / 0.25)",
    borderColor: "rgb(53, 53, 59)",
    textPrimary: "rgba(255, 255, 255)",
    textSecondary: "rgba(225, 225, 225)",
    buttonBgColor: "hsl(117, 85%, 69%)",
    buttonTextColor: "rgb(10, 10, 10)",
    errorColor: "rgb(246, 56, 85)",
  },
};
