import type { Config } from "@turtledev/api";
import { defaultConfig } from "@turtledev/api";
import { ConfigContext } from "../hooks";

export function TurtleProvider({ config = defaultConfig, children }: {
  config?: Config;
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ConfigContext value={config}>
      {children}
    </ConfigContext>
  );
}
