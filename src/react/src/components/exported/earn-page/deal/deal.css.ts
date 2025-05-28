import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { card } from "@/components/ui/card.css";
import { flex, flexItem } from "@/components/ui/flex.css";
import { rounding } from "@/theme/constants.css";
import { themeVars } from "@/theme/theme.css";

export const actionCard = style([
  card({}),
  rounding({ size: "xl" }),
  {
    top: "5rem",
    position: "sticky",
    minWidth: "350px",
    maxWidth: "350px",
  },
]);

export const content = style([
  flex({ direction: "column", items: "stretch", gap: "md" }),
  flexItem,
]);

export const grid = style([
  {
    gridTemplateColumns: "1fr",
  },
]);

export const tokenCard = recipe({
  base: [
    card({ variant: "accent" }),
    rounding({ size: "lg" }),
    {
      cursor: "pointer",
      border: "1px solid transparent",
      transition: "border-color 0.1s ease-in-out",
      selectors: {
        "&:hover": {
          borderColor: themeVars.buttonBgColor,
        },
      },
    },
  ],
  variants: {
    selected: {
      true: {
        borderColor: themeVars.buttonBgColor,
      },
    },
  },
  defaultVariants: {
    selected: false,
  },
});
