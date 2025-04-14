import type { ReactElement, SVGProps } from "react";
import { clsx, pick } from "../ui";
import { icon, type IconProps } from "./style.css";

export function FunnelIcon({
  className,
  ...props
}: SVGProps<SVGSVGElement> & IconProps): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={clsx(icon(pick(props, icon)), className)}
      {...props}
    >
      <path fill="currentColor" fillRule="evenodd" d="M3.792 2.938A49 49 0 0 1 12 2.25c2.797 0 5.54.236 8.209.688a1.86 1.86 0 0 1 1.541 1.836v1.044a3 3 0 0 1-.879 2.121l-6.182 6.182a1.5 1.5 0 0 0-.439 1.061v2.927a3 3 0 0 1-1.658 2.684l-1.757.878A.75.75 0 0 1 9.75 21v-5.818a1.5 1.5 0 0 0-.44-1.06L3.13 7.938a3 3 0 0 1-.879-2.121V4.774c0-.897.64-1.683 1.542-1.836" clipRule="evenodd"></path>
    </svg>
  );
}
