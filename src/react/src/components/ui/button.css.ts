import { themeVars } from "@/theme/theme.css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { flex } from "./flex.css";

export const button = recipe({
  base: [
    flex({ items: "center" }),
    {
      cursor: "pointer",
      borderRadius: themeVars.borderRadius,
      fontWeight: 500,
      fontFamily: themeVars.fontFamily,

      border: "none",
      outline: "none",
    },
  ],
  variants: {
    size: {
      sm: {
        padding: "5px 10px",
        fontSize: `calc(${themeVars.fontSize} * 0.85)`,
        gap: "0.25rem",
      },
      md: {
        padding: "7px 13px",
        fontSize: `calc(${themeVars.fontSize} * 0.95)`,
        gap: "0.25rem",
      },
      lg: {
        padding: "13px 20px",
        fontSize: `calc(${themeVars.fontSize} * 1.1)`,
        gap: "0.35rem",
      },
    },
    justify: {
      start: {
        justifyContent: "flex-start",
      },
      center: {
        justifyContent: "center",
      },
      end: {
        justifyContent: "flex-end",
      },
    },
    block: {
      true: {
        width: "100%",
      },
    },
    color: {
      primary: {
        background: themeVars.buttonBgColor,
        color: themeVars.buttonTextColor,
      },
      ghost: {
        transition: "background 0.1s ease-in-out",
        background: "transparent",
        color: themeVars.textPrimary,
        selectors: {
          "&:hover": {
            background: themeVars.bgTranslucent,
          },
          "&:active": {
            background: themeVars.bgTranslucent,
          },
        },
      },
    },
  },
  defaultVariants: {
    justify: "start",
    size: "md",
    color: "primary",
  },
});

export type ButtonProps = RecipeVariants<typeof button>;
