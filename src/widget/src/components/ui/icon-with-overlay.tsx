import type { JSX } from "react";

interface IconWithOverlayProps {
  icon: string;
  alt: string;
  size?: "sm" | "md" | "lg";
  ringColor?: string;
}

export function IconWithOverlay({ 
  icon, 
  alt, 
  size = "md",
  ringColor = "ring-blue-400/60"
}: IconWithOverlayProps): JSX.Element {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-11 w-11",
    lg: "h-14 w-14"
  };
  
  const iconSizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  };

  return (
    <span className={`flex items-center justify-center ${sizeClasses[size]} rounded-full ring-1 ${ringColor} bg-[var(--color-surface-primary)]`}>
      <img
        src={icon}
        alt={alt}
        className={`${iconSizeClasses[size]} rounded-full`}
      />
    </span>
  );
} 