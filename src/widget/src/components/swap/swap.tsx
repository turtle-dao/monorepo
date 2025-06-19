import type { JSX } from "react";
import Scrollable from "../ui/scrollable";
import { ConfirmButton, Deposit, Earn } from "./sections";

function Swap(): JSX.Element {
  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0">
      <Deposit />
      <Earn />
      <ConfirmButton />
    </div>
  );
}

export default Swap;
