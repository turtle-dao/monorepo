import type { JSX } from "react";

export function Earn(): JSX.Element {
  return (
    <>
      <div className="text-md text-wise-white/80">Earn</div>
      <div className="text-sm text-wise-white/50">
        It will display a label showing the total amount of tokens to receive in a deal or campaign, along with a dropdown listing all possible options based on the token selected for deposit.
      </div>
      <EarnDetails />
    </>
  );
}

function EarnDetails(): JSX.Element {
  return (
    <div className="rounded bg-wise-white/5 p-2">
      <div className="text-xs text-wise-white/50">
        Additional information about earning details will be displayed here
        Additional information about earning details will be displayed here
        Additional information about earning details will be displayed here
      </div>
    </div>
  );
}
