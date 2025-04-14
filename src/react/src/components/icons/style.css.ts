import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const icon = recipe({
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
  },
  defaultVariants: {
    size: "md",
  },
});

export type IconProps = RecipeVariants<typeof icon>;
