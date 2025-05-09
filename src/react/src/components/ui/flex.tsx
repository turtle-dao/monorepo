import type { HTMLAttributes, ReactElement, Ref } from "react";
import { Root } from "@radix-ui/react-slot";
import { type AsChild, clsx, pick, type WithChildren } from ".";
import { flex, flexItem, type FlexProps } from "./flex.css";

export function Flex({
  asChild,
  className,
  ...props
}: AsChild<WithChildren<HTMLAttributes<HTMLDivElement>>> & FlexProps & {
  ref?: Ref<HTMLDivElement>;
}): ReactElement {
  const Comp = asChild ? Root : "div";

  return (
    <Comp
      className={clsx(flex(pick(props, flex)), className)}
      {...props}
    />
  );
}

export function FlexItem({
  asChild,
  className,
  ...props
}: AsChild<WithChildren<HTMLAttributes<HTMLDivElement>>> & {
  ref?: Ref<HTMLDivElement>;
}): ReactElement {
  const Comp = asChild ? Root : "div";

  return (
    <Comp
      className={clsx(flexItem, className)}
      {...props}
    />
  );
}
