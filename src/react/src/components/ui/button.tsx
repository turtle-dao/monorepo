import type { ButtonHTMLAttributes, ReactElement, Ref } from "react";
import { Root } from "@radix-ui/react-slot";
import { type AsChild, clsx, pick, type WithChildren } from ".";
import { button, type ButtonProps } from "./button.css";

export function Button({
  asChild,
  className,
  ...props
}: AsChild<WithChildren<ButtonHTMLAttributes<HTMLButtonElement>>> & ButtonProps & {
  ref?: Ref<HTMLButtonElement>;
}): ReactElement {
  const Comp = asChild ? Root : "button";

  return (
    <Comp
      type="button"
      className={clsx(button(pick(props, button)), className)}
      {...props}
    />
  );
}
