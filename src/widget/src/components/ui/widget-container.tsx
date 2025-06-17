import type { VariantProps } from "class-variance-authority";
import type { JSX } from "react";
import { cva } from "class-variance-authority";
import { useWidgetStyles } from "@/lib/cva-variants";
import { cn } from "@/lib/utils";

// TODO: All this variants must use the css variables set in the useWidgetStyles hook
const containerVariants = cva("", {
  variants: {
    variant: {
      default: "bg-[var(--color-surface-primary)] dark:bg-[var(--color-surface-primary-dark)]",
      card: "bg-[var(--color-surface-secondary)] dark:bg-[var(--color-surface-secondary-dark)]",
    },
    gradient: {
      none: "",
      white: "gradient-border gradient-border-white",
      black: "gradient-border gradient-border-black",
    },
    gradientRadius: {
      "none": "gradient-radius-none",
      "default": "gradient-radius-sm",
      "sm": "gradient-radius-sm",
      "md": "gradient-radius-md",
      "lg": "gradient-radius-lg",
      "xl": "gradient-radius-xl",
      "2xl": "gradient-radius-2xl",
      "3xl": "gradient-radius-3xl",
      "full": "gradient-radius-full",
    },
    border: {
      none: "",
      primary: "border border-border-primary",
      input: "border border-border-input",
    },
    padding: {
      none: "p-0",
      small: "p-3",
      default: "p-4",
      large: "p-6",
      xlarge: "p-8",
    },
    width: {
      default: "w-auto",
      full: "w-full",
    },
    rounded: {
      "none": "rounded-none",
      "default": "rounded",
      "sm": "rounded-sm",
      "md": "rounded-md",
      "lg": "rounded-lg",
      "xl": "rounded-xl",
      "2xl": "rounded-2xl",
      "3xl": "rounded-3xl",
      "full": "rounded-full",
    },
    shadow: {
      none: "",
      small: "shadow-sm shadow-black",
      medium: "shadow-md shadow-black",
      large: "shadow-lg shadow-black",
      xlarge: "shadow-xl shadow-black",
    },
  },
  defaultVariants: {
    variant: "default",
    gradient: "none",
    gradientRadius: "none",
    border: "none",
    padding: "default",
    width: "default",
    rounded: "default",
    shadow: "none",
  },
});

export interface WidgetContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
  Omit<VariantProps<typeof containerVariants>, "gradientRadius" | "rounded" | "padding" | "gradient"> {
  asChild?: boolean;
  gradient: boolean;
}

export function WidgetContainer({
  className,
  variant,
  gradient,
  border,
  shadow,
  ...props
}: WidgetContainerProps): JSX.Element {
  const { theme, rounding, padding, widgetWidth } = useWidgetStyles();

  // If there's a gradient, the gradient radius should match the container's radius
  const effectiveGradientRadius = gradient ? rounding : "none";

  const effectiveGradient = gradient ? (theme === "dark" ? "white" : "white") : "none";
  return (
    <div
      className={cn(containerVariants({
        variant,
        gradient: effectiveGradient,
        border,
        padding,
        shadow,
        width: widgetWidth,
        gradientRadius: effectiveGradientRadius,
        rounded: rounding,
      }), className)}
      {...props}
    />
  );
}
