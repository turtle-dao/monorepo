import type { ThemeColors } from ".";
import { type CSSProperties, useMemo } from "react";
import { useTurtleContext } from "../components";

export function useThemeApply(): {
  style: CSSProperties;
} {
  const { themeConfig } = useTurtleContext();

  return useMemo(() => {
    const style: CSSProperties = {};

    // Apply shared variables
    (style as any)["--turtle-border-radius"] = themeConfig.shared.borderRadius;
    (style as any)["--turtle-gap"] = themeConfig.shared.gap;
    (style as any)["--turtle-padding"] = themeConfig.shared.padding;
    (style as any)["--turtle-font-family"] = themeConfig.shared.fontFamily;
    (style as any)["--turtle-font-size"] = themeConfig.shared.fontSize;
    (style as any)["--turtle-font-weight"] = themeConfig.shared.fontWeight;

    // Apply theme-specific colors based on the selected theme
    const colors: ThemeColors = themeConfig.theme === "light"
      ? themeConfig.light
      : themeConfig.dark;

    // Apply all theme colors
    (style as any)["--turtle-bg-primary"] = colors.bgPrimary;
    (style as any)["--turtle-bg-secondary"] = colors.bgSecondary;
    (style as any)["--turtle-bg-accent"] = colors.bgAccent;
    (style as any)["--turtle-border-color"] = colors.borderColor;
    (style as any)["--turtle-text-primary"] = colors.textPrimary;
    (style as any)["--turtle-text-secondary"] = colors.textSecondary;
    (style as any)["--turtle-button-bg"] = colors.buttonBgColor;
    (style as any)["--turtle-button-text"] = colors.buttonTextColor;

    return { style };
  }, [themeConfig]);
}
