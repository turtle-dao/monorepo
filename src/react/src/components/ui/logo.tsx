import type { HTMLAttributes, ReactElement, Ref } from "react";
import { type AsChild, clsx, pick, type WithChildren } from ".";
import { logo, type LogoProps } from "./logo.css";

export function Logo({
  src,
  className,
  ...props
}: AsChild<WithChildren<HTMLAttributes<HTMLImageElement>>> & LogoProps & {
  src: string;
  ref?: Ref<HTMLImageElement>;
}): ReactElement {
  return (
    <img
      src={src}
      className={clsx(logo(pick(props, logo)), className)}
      {...props}
    />
  );
}
