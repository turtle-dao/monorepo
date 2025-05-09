import type { InputHTMLAttributes, ReactElement, Ref } from "react";
import { Root } from "@radix-ui/react-slot";
import { type AsChild, clsx, type WithChildren } from ".";
import { input } from "./input.css";

export function Input({
  asChild,
  className,
  ...props
}: AsChild<WithChildren<InputHTMLAttributes<HTMLInputElement>>> & {
  ref?: Ref<HTMLInputElement>;
}): ReactElement {
  const Comp = asChild ? Root : "input";

  return (
    <Comp className={clsx(input, className)} {...props} />
  );
}
