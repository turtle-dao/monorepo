import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const icon = recipe({
  base: {
    flexShrink: 0,
  },
  variants: {
    size: {
      sm: {
        width: "0.75rem",
        height: "0.75rem",
      },
      md: {
        width: "1rem",
        height: "1rem",
      },
      lg: {
        width: "1.25rem",
        height: "1.25rem",
      },
    },
    inline: {
      true: {
        display: "inline-block",
      },
    },
  },
  defaultVariants: {
    size: "md",
    inline: false,
  },
});

export type IconProps = RecipeVariants<typeof icon>;
