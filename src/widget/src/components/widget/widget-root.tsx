import type { WidgetStyleConfig } from "../../types/style-config";
import { useSetAtom } from "jotai";
import { type JSX, useEffect } from "react";
import { cn } from "@/utils";
import { useWidgetStyles } from "../../lib/cva-variants";
import { widgetStyleConfigAtom } from "../../store/widget-style-config";

interface WidgetRootProps {
  config: WidgetStyleConfig;
  children: React.ReactNode;
}

export function WidgetRoot({ config, children }: WidgetRootProps): JSX.Element {
  const setWidgetConfig = useSetAtom(widgetStyleConfigAtom);
  const { theme, cssVariables, fontPrimary, fontSecondary, widgetWidth } = useWidgetStyles();

  useEffect(() => {
    setWidgetConfig(config);
  }, [config, setWidgetConfig]);

  return (
    <div
      className={`font-${fontPrimary} antialiased transition-all duration-700 ease-linear ${theme === "dark" ? "dark" : ""}`}
      style={{
        ...(cssVariables as React.CSSProperties),
        "--font-primary": fontPrimary,
        "--font-secondary": fontSecondary,
      } as React.CSSProperties}
    >
      <div className={cn("flex w-full flex-col items-center gap-2 sm:min-h-[820px]", widgetWidth === "full" ? "w-full" : "max-w-[510px]")}>
        {children}
      </div>
    </div>
  );
}
