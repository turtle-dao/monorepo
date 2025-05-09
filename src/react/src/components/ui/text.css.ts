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
    error: {
      true: {
        color: themeVars.errorColor,
      },
    },
    size: {
      xs: {
        fontSize: "0.75rem",
      },
      sm: {
        fontSize: "0.875rem",
      },
      md: {
        fontSize: "1rem",
      },
      lg: {
        fontSize: "1.25rem",
      },
      xl: {
        fontSize: "1.5rem",
      },
    },
    align: {
      center: {
        textAlign: "center",
      },
      left: {
        textAlign: "left",
      },
      right: {
        textAlign: "right",
      },
    },
    overflowDots: {
      true: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        width: "100%",
      },
    },
  },
  defaultVariants: {
    size: "md",
    secondary: false,
    bold: false,
    error: false,
    overflowDots: false,
    align: "left",
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
