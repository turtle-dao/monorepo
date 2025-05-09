import { card } from "@/components/ui/card.css";
import { flex, flexItem } from "@/components/ui/flex.css";
import { gap, padding, rounding } from "@/theme/constants.css";
import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";

export const actionCard = style([
  card({}),
  rounding({ size: "xl" }),
  {
    position: "sticky",
    top: "6rem",
    minWidth: "350px",
    maxWidth: "350px",
  },
]);

export const content = style([
  flex({ direction: "column", items: "stretch", gap: "md" }),
  flexItem,
  padding(),
]);

export const grid = style([
  {
    gridTemplateColumns: "1fr",
  },
]);

export const tokenCard = recipe({
  base: [
    card({ }),
    rounding({ size: "lg" }),
    {
      cursor: "pointer",
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
