import type { ReactElement, Ref } from "react";
import type { SpinnerProps } from "./spinner.css";
import { clsx, pick } from ".";
import { path, spinner } from "./spinner.css";

export function Spinner({
  className,
  ref,
  ...props
}: SpinnerProps & {
  ref?: Ref<SVGSVGElement>;
  className?: string;
}): ReactElement {
  return (
    <svg
      viewBox="0 0 50 50"
      className={clsx(spinner(pick(props, spinner)), className)}
      ref={ref}
      {...props}
    >
      <circle className={path} cx="25" cy="25" r="15" />
    </svg>
  );
}
