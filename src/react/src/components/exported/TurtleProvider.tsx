import type { Config } from "@turtledev/api";
import type { TurtleThemeConfig } from "../../theme";
import { defaultConfig } from "@turtledev/api";
import { createContext, useContext, useMemo } from "react";
import { defaultThemeConfig } from "../../theme/default";

interface TurtleContextType {
  config: Config;
  themeConfig: TurtleThemeConfig;
}

const TurtleContext = createContext<TurtleContextType | undefined>(undefined);

export function TurtleProvider({
  config = defaultConfig,
  themeConfig,
  children,
}: {
  config?: Config;
  themeConfig?: Partial<TurtleThemeConfig>;
  children: React.ReactNode;
}): React.ReactElement {
  const fullTheme = useMemo(() => ({
    ...defaultThemeConfig,
    ...themeConfig,
  }), [themeConfig]);

  const valueMemo = useMemo(() => ({
    config,
    themeConfig: fullTheme,
  }), [config, fullTheme]);

  return (
    <TurtleContext value={valueMemo}>
      {children}
    </TurtleContext>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTurtleContext(): TurtleContextType {
  const context = useContext(TurtleContext);

  if (!context) {
    throw new Error("useTurtleContext must be used within a TurtleProvider");
  }

  return context;
}
