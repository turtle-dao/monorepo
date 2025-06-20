import type { JSX } from "react";
import { WidgetContainer } from "@/components/ui/widget-container";

export function Deposit(): JSX.Element {
  return (
    <>
      <div className="text-md text-[var(--color-text-primary)]">Deposit</div>
      <WidgetContainer variant="card" shadow="large" gradient={false}>
        <p className="text-sm text-[var(--color-text-primary)]">It will display an input field for entering the amount of tokens to deposit, along with a dropdown listing all supported tokens.</p>
      </WidgetContainer>
    </>
  );
}
