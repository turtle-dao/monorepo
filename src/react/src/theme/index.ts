export * from "./default";

export interface ThemeColors {
  // Background colors
  bgPrimary: string;
  bgSecondary: string;
  bgAccent: string;
  bgTranslucent: string;

  // Text colors
  textPrimary: string;
  textSecondary: string;

  // Border color
  borderColor: string;

  // Button colors
  buttonBgColor: string;
  buttonTextColor: string;

  // Error color
  errorColor: string;
}

export interface TurtleThemeConfig {
  // Theme selection
  theme: "light" | "dark";

  // Shared variables (apply to both themes)
  shared: {
    borderRadius: string;
    gap: string;
    padding: string;
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
  };

  // Theme-specific colors
  light: ThemeColors;
  dark: ThemeColors;
}
