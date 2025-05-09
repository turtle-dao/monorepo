import { recipe, type RecipeVariants } from "@vanilla-extract/recipes";

export const logo = recipe({
  base: {
    borderRadius: "999999px",
  },
  variants: {
    size: {
      xs: {
        width: "1.25rem",
        height: "1.25rem",
      },
      sm: {
        width: "1.5rem",
        height: "1.5rem",
      },
      md: {
        width: "2rem",
        height: "2rem",
      },
      lg: {
        width: "2.5rem",
        height: "2.5rem",
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

export type LogoProps = RecipeVariants<typeof logo>;
