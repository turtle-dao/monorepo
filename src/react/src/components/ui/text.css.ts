import { themeVars } from "@/theme/theme.css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const text = recipe({
  base: {
    color: themeVars.textPrimary,
    fontWeight: 400,
    fontFamily: themeVars.fontFamily,
  },
  variants: {
    secondary: {
      true: {
        color: themeVars.textSecondary,
      },
    },
    bold: {
      true: {
        fontWeight: 500,
      },
    },
    size: {
      sm: {
        fontSize: "0.875rem",
      },
      md: {
        fontSize: "1rem",
      },
      lg: {
        fontSize: "1.25rem",
      },
    },
  },
  defaultVariants: {
    size: "md",
    secondary: false,
    bold: false,
  },
});

export type TextProps = RecipeVariants<typeof text>;

export const heading = recipe({
  base: [
    text(),
    {
      fontWeight: 500,
    },
  ],
  variants: {
    level: {
      1: {
        fontSize: "2rem",
      },
      2: {
        fontSize: "1.5rem",
      },
      3: {
        fontSize: "1.25rem",
      },
      4: {
        fontSize: "1rem",
      },
      5: {
        fontSize: "0.875rem",
      },
    },
  },
  defaultVariants: {
    level: 2,
  },
});

export type HeadingProps = RecipeVariants<typeof heading>;
