import type { Config } from "@turtledev/api";
import { createContext, useContext } from "react";

export const ConfigContext = createContext<Config | undefined>(undefined);

export function useConfig(): Config {
  const config = useContext(ConfigContext);

  if (!config) {
    throw new Error("Config not found");
  }

  return config;
}
