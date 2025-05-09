import type { ReactElement, SVGProps } from "react";
import { clsx, pick } from "../ui";
import { icon, type IconProps } from "./style.css";

export function ChevronDownIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement> & IconProps): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      className={clsx(icon(pick(props, icon)), className)}
      {...props}
    >
      <path fill="currentColor" fill-rule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06" clip-rule="evenodd" />
    </svg>
  );
}
