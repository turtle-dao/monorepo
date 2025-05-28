import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";
import { themeVars } from "@/theme/theme.css";
import { flex } from "./flex.css";

export const button = recipe({
  base: [
    flex({ items: "center" }),
    {
      position: "relative",

      cursor: "pointer",
      borderRadius: themeVars.borderRadius,
      fontWeight: 500,
      fontFamily: themeVars.fontFamily,

      border: "none",
      outline: "none",
      flexShrink: 0,
    },
  ],
  variants: {
    size: {
      xs: {
        padding: "4px 6px",
        fontSize: `calc(${themeVars.fontSize} * 0.8)`,
        gap: "0.25rem",
      },
      sm: {
        padding: "5px 10px",
        fontSize: `calc(${themeVars.fontSize} * 0.85)`,
        gap: "0.35rem",
      },
      md: {
        padding: "10px 12px",
        fontSize: `calc(${themeVars.fontSize} * 0.95)`,
        gap: "0.35rem",
      },
      lg: {
        padding: "13px 20px",
        fontSize: `calc(${themeVars.fontSize} * 1.1)`,
        gap: "0.45rem",
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
    flex: {
      true: {
        flex: 1,
      },
    },
    pill: {
      true: {
        borderRadius: "99999px",
      },
    },
    color: {
      primary: {},
      ghost: {},
      outline: {},
    },
    disabled: {
      true: {
        cursor: "default",
        background: themeVars.bgTranslucent,
        color: themeVars.textSecondary,
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        disabled: false,
        color: "primary",
      },
      style: {
        background: themeVars.buttonBgColor,
        color: themeVars.buttonTextColor,
      },
    },
    {
      variants: {
        disabled: false,
        color: "ghost",
      },
      style: {
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
    {
      variants: {
        disabled: false,
        color: "outline",
      },
      style: {
        transition: "background 0.1s ease-in-out",
        background: "transparent",
        color: themeVars.textPrimary,
        border: `1px solid ${themeVars.borderColor}`,
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
  ],
  defaultVariants: {
    justify: "start",
    size: "md",
    color: "primary",
    disabled: false,
    flex: false,
  },
});

export type ButtonProps = RecipeVariants<typeof button>;
