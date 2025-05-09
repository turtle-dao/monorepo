import type { AnchorHTMLAttributes, ReactElement, Ref } from "react";
import { type AsChild, clsx, pick, type WithChildren } from ".";
import { link, type LinkProps } from "./link.css";

export function Link({
  className,
  target = "_blank",
  ...props
}: AsChild<WithChildren<AnchorHTMLAttributes<HTMLAnchorElement>>> & LinkProps & {
  ref?: Ref<HTMLAnchorElement>;
}): ReactElement {
  return (
    <a
      className={clsx(link(pick(props, link)), className)}
      target={target}
      {...props}
    />
  );
}
