import type { JSX } from "react";
import { cn } from "@/utils";
import { WidgetContainer } from "./widget-container";

export function InfoCard({ title, value, color, className }: { title: string; value: string; color: "primary" | "secondary" | "accent"; className?: string }): JSX.Element {
  return (
    <WidgetContainer variant="card" gradient={false} className={cn("p-3", className)}>
      <div className="flex flex-col gap-2">
        {/* Title */}
        <span className="text-sm text-[var(--color-text-muted)]">{title}</span>
        {/* Value */}
        <span className={cn("text-sm font-semibold", color === "primary" ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-accent)]")}>{value}</span>
      </div>
    </WidgetContainer>
  );
}
