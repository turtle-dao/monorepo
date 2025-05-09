import type { HTMLAttributes, ReactElement, Ref } from "react";
import { Root } from "@radix-ui/react-slot";
import { type AsChild, clsx, pick, type WithChildren } from ".";
import { heading, type HeadingProps, text, type TextProps } from "./text.css";

export function Text({
  asChild,
  className,
  ...props
}: AsChild<WithChildren<HTMLAttributes<HTMLDivElement>>> & TextProps & {
  ref?: Ref<HTMLDivElement>;
}): ReactElement {
  const Comp = asChild ? Root : "div";

  return (
    <Comp
      className={clsx(text(pick(props, text)), className)}
      {...props}
    />
  );
}

export function Heading({
  asChild,
  className,
  level = 2,
  ...props
}: AsChild<WithChildren<HTMLAttributes<HTMLDivElement>>> & HeadingProps & {
  ref?: Ref<HTMLHeadingElement>;
}): ReactElement {
  const Comp = asChild ? Root : `h${level}`;

  return (
    <Comp
      className={clsx(heading({ level }), className)}
      {...props}
    />
  );
}
