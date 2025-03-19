import { cn } from "@/components/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import SuccessIcon from "~icons/heroicons/check-circle-16-solid";
import ErrorIcon from "~icons/heroicons/exclamation-circle-16-solid";
import WarningIcon from "~icons/heroicons/exclamation-triangle-16-solid";
import InfoIcon from "~icons/heroicons/information-circle-16-solid";

export type AlertVariant = "info" | "warning" | "error" | "success";

const alertCardVariants = cva(
  "p-4 border-dashed border-2 rounded-xl not-prose",
  {
    variants: {
      variant: {
        info: "border-blue-500 bg-blue-500/5",
        warning: "border-yellow-500 bg-yellow-500/5",
        error: "border-red-500 bg-red-500/5",
        success: "border-green-500 bg-green-500/5",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  },
);

const titleVariants = cva("flex items-center gap-2 font-medium", {
  variants: {
    variant: {
      info: "text-blue-500",
      warning: "text-yellow-500",
      error: "text-red-500",
      success: "text-green-500",
    },
  },
});

const icons: Record<AlertVariant, typeof InfoIcon> = {
  info: InfoIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  success: SuccessIcon,
};

export interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
  Omit<VariantProps<typeof alertCardVariants>, "variant"> {
  variant: AlertVariant;
  title?: string;
}

export function Alert({
  ref,
  className,
  variant = "info",
  children,
  title,
  ...props
}: AlertProps & {
  ref?: React.RefObject<HTMLDivElement>;
}): React.ReactElement {
  const Icon = icons[variant];

  return (
    <div
      className={cn(alertCardVariants({ variant, className }))}
      ref={ref}
      {...props}
    >
      <div className={cn(titleVariants({ variant }))}>
        <Icon className="w-5 h-5" />

        {title && <div className="font-medium">{title}</div>}
      </div>

      <p className="text-base mt-1">
        {children}
      </p>
    </div>
  );
}
