import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "./theme.css";

function calc(value: string, amount: number): string {
  return `calc(${value} * ${amount})`;
}

export const rounding = recipe({
  variants: {
    size: {
      sm: { borderRadius: calc(themeVars.borderRadius, 0.5) },
      md: { borderRadius: calc(themeVars.borderRadius, 0.75) },
      lg: { borderRadius: calc(themeVars.borderRadius, 1.5) },
      xl: { borderRadius: calc(themeVars.borderRadius, 2) },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export const padding = recipe({
  variants: {
    size: {
      sm: { padding: calc(themeVars.gap, 0.5) },
      md: { padding: calc(themeVars.gap, 0.75) },
      lg: { padding: calc(themeVars.gap, 1) },
      xl: { padding: calc(themeVars.gap, 1.5) },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
