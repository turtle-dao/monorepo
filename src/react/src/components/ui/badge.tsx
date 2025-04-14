import type { HTMLAttributes, ReactElement, Ref } from "react";
import { Root } from "@radix-ui/react-slot";
import { type AsChild, clsx, type WithChildren } from ".";
import { badge } from "./badge.css";

export function Badge({
  asChild,
  className,
  ...props
}: AsChild<WithChildren<HTMLAttributes<HTMLDivElement>>> & {
  ref?: Ref<HTMLDivElement>;
}): ReactElement {
  const Comp = asChild ? Root : "div";

  return (
    <Comp className={clsx(badge, className)} {...props} />
  );
}
