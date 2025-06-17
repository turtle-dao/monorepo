import type { JSX } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button } from "@/components/ui/shadcn/button";
import { useWidgetStyles } from "@/lib/cva-variants";
import { cn } from "@/utils";

const customButtonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-sm text-xs font-medium transition-colors transition-shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "hover-gradient-border hover-gradient-border-green-diagonal border border-[var(--color-text-muted)] dark:border-[var(--color-text-muted-dark)] bg-[var(--color-surface-primary)] dark:bg-[var(--color-surface-primary-dark)] text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] hover:bg-[var(--color-surface-secondary)] dark:hover:bg-[var(--color-surface-secondary-dark)] hover:text-[var(--color-text-accent)] dark:hover:text-[var(--color-text-accent-dark)] active:shadow-[0px_0px_4px_0px_rgba(115,243,108,1)]",
        reversed:
          "gradient-border gradient-border-green-vertical bg-[var(--color-surface-secondary)] dark:bg-[var(--color-surface-secondary-dark)] text-[var(--color-text-accent)] dark:text-[var(--color-text-accent-dark)] border border-[var(--color-text-accent)] dark:border-[var(--color-text-accent-dark)] shadow-[0px_0px_4px_0px_rgba(115,243,108,1)] hover:bg-[var(--color-surface-primary)] dark:hover:bg-[var(--color-surface-primary-dark)] hover:text-[var(--color-text-primary)] dark:hover:text-[var(--color-text-primary-dark)] hover:shadow-[0px_0px_20px_0px_rgba(115,243,108,0.7)]",
        ghost:
          "border border-[var(--color-text-muted)] dark:border-[var(--color-text-muted-dark)] bg-transparent text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)] hover:bg-[var(--color-surface-secondary)] dark:hover:bg-[var(--color-surface-secondary-dark)] hover:text-[var(--color-text-accent)] dark:hover:text-[var(--color-text-accent-dark)]",
        empty:
          "bg-transparent font-normal text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)] hover:bg-transparent",

      },
      color: {
        default: "",
        red: "hover:text-red-600 dark:hover:text-red-400",
      },
      size: {
        default: "h-[38px] px-4 py-2 text-sm",
        sm: "h-[28px] px-3",
        lg: "h-[44px] px-8 text-base",
        xl: "h-[60px] p-4 text-xl",
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
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
  VariantProps<typeof customButtonVariants> {
  asChild?: boolean;
  fullWidth?: boolean;
}

export function TurtleButton({ ref, className, variant = "default", size = "default", color, fullWidth, ...props }: ButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }): JSX.Element {
  const { rounding } = useWidgetStyles();
  const effectiveGradientRadius = rounding ?? "none";

  return (
    <Button
      ref={ref}
      {...props}
      className={cn(customButtonVariants({ variant, size, color, className, gradientRadius: effectiveGradientRadius, rounded: rounding }), fullWidth && "w-full")}
    />
  );
}
