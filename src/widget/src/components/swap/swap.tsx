import type { JSX } from "react";
import { ConfirmButton, Deposit, Earn } from "./sections";

function Swap(): JSX.Element {
  return (
    <div className="flex flex-col gap-4">
      <Deposit />
      <Earn />
      <ConfirmButton />
    </div>
  );
}

export default Swap;
