import { themeVars } from "@/theme/theme.css";
import { style } from "@vanilla-extract/css";
import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const flex = recipe({
  base: {
    display: "flex",
  },
  variants: {
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
      between: {
        justifyContent: "space-between",
      },
      around: {
        justifyContent: "space-around",
      },
      evenly: {
        justifyContent: "space-evenly",
      },
    },
    items: {
      start: {
        alignItems: "flex-start",
      },
      center: {
        alignItems: "center",
      },
      end: {
        alignItems: "flex-end",
      },
      stretch: {
        alignItems: "stretch",
      },
      baseline: {
        alignItems: "baseline",
      },
    },
    direction: {
      row: {
        flexDirection: "row",
      },
      column: {
        flexDirection: "column",
      },
    },
    reverse: {
      true: {},
      false: {},
    },
    gap: {
      "none": {
        gap: 0,
      },
      "xs": {
        gap: `calc(${themeVars.gap} * 0.25)`,
      },
      "sm": {
        gap: `calc(${themeVars.gap} * 0.5)`,
      },
      "md": {
        gap: themeVars.gap,
      },
      "lg": {
        gap: `calc(${themeVars.gap} * 1.5)`,
      },
      "xl": {
        gap: `calc(${themeVars.gap} * 2)`,
      },
      "2xl": {
        gap: `calc(${themeVars.gap} * 3)`,
      },
    },
  },
  compoundVariants: [
    {
      variants: {
        direction: "row",
        reverse: true,
      },
      style: {
        flexDirection: "row-reverse",
      },
    },
    {
      variants: {
        direction: "column",
        reverse: true,
      },
      style: {
        flexDirection: "column-reverse",
      },
    },
  ],
  defaultVariants: {
    justify: "start",
    items: "start",
    direction: "row",
    reverse: false,
    gap: "md",
  },
});

export type FlexProps = RecipeVariants<typeof flex>;

export const flexItem = style({
  flex: 1,
});
