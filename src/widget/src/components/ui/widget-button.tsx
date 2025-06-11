import type { VariantProps } from "class-variance-authority";
import type { JSX } from "react";
import { buttonVariants, useWidgetStyles } from "@/lib/cva-variants";
import { cn } from "@/lib/utils";

export interface WidgetButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export function WidgetButton({ ref, className, variant, size, ...props }: WidgetButtonProps & { ref?: React.RefObject<HTMLButtonElement | null> }): JSX.Element {
  const { cssVariables } = useWidgetStyles();

  return (
    <button
      type="button"
      className={cn(buttonVariants({ variant, size }), className)}
      ref={ref}
      style={cssVariables as React.CSSProperties}
      {...props}
    />
  );
}
