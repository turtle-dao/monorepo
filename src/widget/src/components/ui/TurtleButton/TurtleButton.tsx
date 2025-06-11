import type { JSX } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Button } from "@/components/ui/shadcn/button";
import { cn } from "@/utils";

const customButtonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-sm text-xs font-medium transition-colors transition-shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "gradient-radius-full hover-gradient-border hover-gradient-border-green-diagonal hover-gradient-radius-full border border-wise-white/10 bg-wise-white/10 text-wise-white hover:bg-ninja-black active:shadow-[0px_0px_4px_0px_rgba(115,243,108,1)]",
        reversed:
          "gradient-border gradient-border-green-vertical gradient-radius-full bg-ninja-black text-neon-green shadow-[0px_0px_4px_0px_rgba(115,243,108,1)] hover:bg-ninja-black hover:shadow-[0px_0px_20px_0px_rgba(115,243,108,0.7)]",
        ghost: "rounded-full border border-wise-white/10 bg-wise-white/10 hover:bg-accent hover:text-neon-green",
        empty: "bg-transparent font-normal hover:bg-transparent",
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
  return (
    <Button
      ref={ref}
      {...props}
      className={cn(customButtonVariants({ variant, size, color, className }), fullWidth && "w-full")}
    />
  );
}
