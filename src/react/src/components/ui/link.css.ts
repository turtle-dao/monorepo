import { themeVars } from "@/theme/theme.css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const link = recipe({
  base: {
    fontWeight: 500,
    fontFamily: themeVars.fontFamily,
  },
  variants: {
    color: {
      default: {
        color: themeVars.buttonBgColor,
      },
      text: {
        color: themeVars.textPrimary,
      },
      button: {
        color: themeVars.buttonTextColor,
      },
    },
  },
  defaultVariants: {
    color: "default",
  },
});

export type LinkProps = RecipeVariants<typeof link>;
