import { themeVars } from "@/theme/theme.css";
import { keyframes, style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const rotate = keyframes({
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

export const dash = keyframes({
  "0%": { strokeDasharray: "30, 125.66", strokeDashoffset: "0" },
  "50%": { strokeDasharray: "-40, 125.66", strokeDashoffset: "-40" },
  "100%": { strokeDasharray: "-124, 125.66", strokeDashoffset: "-124" },
});

export const spinner = recipe({
  base: {
    animation: `${rotate} 1s linear infinite`,
  },
  variants: {
    size: {
      sm: {
        width: "1rem",
        height: "1rem",
      },
      md: {
        width: "1.5rem",
        height: "1.5rem",
      },
      lg: {
        width: "2rem",
        height: "2rem",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SpinnerProps = RecipeVariants<typeof spinner>;

export const path = style({
  fill: "none",
  stroke: "currentcolor",
  strokeWidth: "4",
  strokeLinecap: "round",
  strokeDasharray: "30, 125.66",
  strokeDashoffset: "0",
});
