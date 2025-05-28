import type { ReactElement, SVGProps } from "react";
import { clsx, pick } from "../ui";
import { icon, type IconProps } from "./style.css";

export function ArrowDownIcon({
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
      <path fill="currentColor" fillRule="evenodd" d="M10 3a.75.75 0 0 1 .75.75v10.638l3.96-4.158a.75.75 0 1 1 1.08 1.04l-5.25 5.5a.75.75 0 0 1-1.08 0l-5.25-5.5a.75.75 0 1 1 1.08-1.04l3.96 4.158V3.75A.75.75 0 0 1 10 3" clipRule="evenodd" />
    </svg>
  );
}

export function ArrowLeftIcon({
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
      <path fill="currentColor" fillRule="evenodd" d="M15 10a.75.75 0 0 1-.75.75H7.612l2.158 1.96a.75.75 0 1 1-1.04 1.08l-3.5-3.25a.75.75 0 0 1 0-1.08l3.5-3.25a.75.75 0 1 1 1.04 1.08L7.612 9.25h6.638A.75.75 0 0 1 15 10" clipRule="evenodd" />
    </svg>
  );
}

export function ArrowUpRightIcon({
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
      <path fill="currentColor" fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06" clipRule="evenodd" />
    </svg>
  );
}
