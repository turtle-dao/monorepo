import type { Config } from "@turtledev/api";
import { useTurtleContext } from "../components/exported/TurtleProvider";

export function useConfig(): Config {
  const { config } = useTurtleContext();
  return config;
}
