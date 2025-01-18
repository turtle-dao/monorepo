import type { Config } from "@turtle/api";
import { defaultConfig } from "@turtle/api";
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
