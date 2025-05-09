import type { ThemeColors } from ".";
import { useTurtleContext } from "@/components/exported/TurtleProvider";
import { assignInlineVars } from "@vanilla-extract/dynamic";
import { type CSSProperties, useMemo } from "react";
import { themeVars } from "./theme.css";

export function useThemeApply(): {
  style: CSSProperties;
} {
  const { themeConfig } = useTurtleContext();

  return useMemo(() => {
    // Apply theme-specific colors based on the selected theme
    const colors: ThemeColors = themeConfig.theme === "light"
      ? themeConfig.light
      : themeConfig.dark;

    return {
      style: assignInlineVars(themeVars, {
        borderRadius: themeConfig.shared.borderRadius,
        gap: themeConfig.shared.gap,
        padding: themeConfig.shared.padding,
        fontFamily: themeConfig.shared.fontFamily,
        fontSize: themeConfig.shared.fontSize,
        fontWeight: themeConfig.shared.fontWeight,
        bgPrimary: colors.bgPrimary,
        bgSecondary: colors.bgSecondary,
        bgAccent: colors.bgAccent,
        bgTranslucent: colors.bgTranslucent,
        borderColor: colors.borderColor,
        textPrimary: colors.textPrimary,
        textSecondary: colors.textSecondary,
        buttonBgColor: colors.buttonBgColor,
        buttonTextColor: colors.buttonTextColor,
        errorColor: colors.errorColor,
      }),
    };
  }, [themeConfig]);
}
