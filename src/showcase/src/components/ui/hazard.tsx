import { cn } from "@/components/lib/utils";

import * as React from "react";

export function Hazard({
  ref,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  ref?: React.RefObject<HTMLDivElement>;
}): React.ReactElement {
  return (
    <div
      className={cn(
        "w-full p-2 border-dashed border-2 border-green-500 rounded-xl bg-green-500/5 not-prose",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
}
Hazard.displayName = "Hazard";
