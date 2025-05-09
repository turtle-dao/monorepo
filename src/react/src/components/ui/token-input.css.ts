import { rounding } from "@/theme/constants.css";
import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { card as baseCard } from "./card.css";

export const card = style([
  baseCard({}),
  rounding({ size: "lg" }),
]);

export const input = recipe({
  base: {
    flex: 1,
    background: "transparent",
    border: "none",
    outline: "none",
    padding: 0,
    minWidth: 0,
    fontSize: `calc(${themeVars.fontSize} * 1.6)`,
    cursor: "text",
  },
  variants: {
    error: {
      true: {
        color: themeVars.errorColor,
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});
