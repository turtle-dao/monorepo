import type { JSX } from "react";
import Scrollable from "../ui/scrollable";
import { ConfirmButton, Deposit, Earn } from "./sections";

function Swap(): JSX.Element {
  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      <Deposit />
      <Earn name="Zerolend ETH" iconUrl="https://app.turtle.club/networks/ethereum.svg" tvl="123.43M" yieldPercentage="13.85%" />

      <ConfirmButton />
    </div>
  );
}

export default Swap;
