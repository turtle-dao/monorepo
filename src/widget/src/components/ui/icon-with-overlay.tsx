import type { JSX, ReactNode } from "react";

interface IconWithOverlayProps {
  icon: ReactNode;
  ringClass?: string;
  iconSize?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
}

const sizeClasses = {
  sm: { container: "h-9 w-9", padding: "pl-10" },
  md: { container: "h-11 w-11", padding: "pl-12" },
  lg: { container: "h-12 w-12", padding: "pl-14" },
};

export function IconWithOverlay({ 
  icon, 
  ringClass = "", 
  iconSize = "md",
  children, 
  className = "" 
}: IconWithOverlayProps): JSX.Element {
  const { container, padding } = sizeClasses[iconSize];
  
  return (
    <div className={`relative flex items-center min-w-[180px] h-10 ${className}`}>
      {/* Overlapped Icon */}
      <span className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center ${container} rounded-full ring-1 ${ringClass} bg-[var(--color-surface-primary)]`}>
        {icon}
      </span>
      
      {/* Content Container - can be wrapped with anything */}
      <div className={`flex items-center justify-between rounded-full bg-[var(--color-surface-secondary)] ${padding} pr-3 gap-3 border border-[var(--color-text-primary)]/10 w-full h-10`}>
        {children}
      </div>
    </div>
  );
} 