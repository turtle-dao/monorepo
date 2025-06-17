import type { JSX } from "react";

export function Deposit(): JSX.Element {
  return (
    <>
      <div className="text-md text-wise-white/80">Deposit</div>
      <div className="text-sm text-wise-white/50">
        It will display an input field for entering the amount of tokens to deposit, along with a dropdown listing all supported tokens.
      </div>
    </>
  );
}
