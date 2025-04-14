import type { PropsWithChildren, ReactElement, Ref } from "react";
import { clsx } from ".";
import { card } from "./card.css";

export function Card({
  children,
  className,
  ref,
}: PropsWithChildren<{ className?: string }> & {
  ref?: Ref<HTMLDivElement>;
}): ReactElement {
  return <div className={clsx(card, className)} ref={ref}>{children}</div>;
}
