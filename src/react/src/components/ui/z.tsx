import type { ReactNode } from "react";
import { Root } from "@radix-ui/react-slot";

export function Z({
  children,
  index: zIndex = 2,
}: {
  children: ReactNode;
  index?: number;
}): React.ReactElement {
  return (
    <Root style={{ zIndex }}>
      {children}
    </Root>
  );
}
