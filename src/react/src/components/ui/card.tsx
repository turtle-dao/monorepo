import type { PropsWithChildren, ReactElement, Ref } from "react";
import { clsx, pick } from ".";
import { card, type CardProps } from "./card.css";

export function Card({
  children,
  className,
  ref,
  ...props
}: PropsWithChildren<{ className?: string }> & CardProps & {
  ref?: Ref<HTMLDivElement>;
}): ReactElement {
  return (
    <div className={clsx(card(pick(props, card)), className)} ref={ref} {...props}>
      {children}
    </div>
  );
}
