import type { RecipeVariants } from "@vanilla-extract/recipes";
import { recipe } from "@vanilla-extract/recipes";
import { themeVars } from "@/theme/theme.css";

export const card = recipe({
  base: {
    flex: 1,
    display: "flex",
    flexDirection: "column",

    gap: themeVars.gap,
    padding: themeVars.padding,
    borderRadius: themeVars.borderRadius,
  },
  variants: {
    variant: {
      primary: {
        background: themeVars.bgPrimary,
        border: `1px solid ${themeVars.borderColor}`,
      },
      secondary: {
        background: themeVars.bgAccent,
        border: `1px solid ${themeVars.borderColor}`,
      },
      accent: {
        background: themeVars.bgAccent,
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export type CardProps = RecipeVariants<typeof card>;
