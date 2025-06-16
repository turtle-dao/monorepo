import type { JSX } from "react";
import { WidgetContainer } from "@/components/ui/widget-container";

export function Earn(): JSX.Element {
  return (
    <>
      <div className="text-md text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Direct Earn</div>
      <WidgetContainer variant="card" shadow="large" gradient>
        <p className="text-sm text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">It will display a label showing the total amount of tokens to receive in a deal or campaign, along with a dropdown listing all possible options based on the token selected for deposit.</p>
      </WidgetContainer>
      <EarnDetails />
    </>
  );
}

function EarnDetails(): JSX.Element {
  return (
    <WidgetContainer variant="default" shadow="large" gradient>
      <p className="text-sm text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">Additional information about earning details will be displayed here</p>
      <p className="text-sm text-[var(--color-text-muted)] dark:text-[var(--color-text-muted-dark)]">Additional information about earning details will be displayed here</p>
    </WidgetContainer>
  );
}
