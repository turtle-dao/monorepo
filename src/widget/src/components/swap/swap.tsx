import type { JSX } from "react";
import Scrollable from "../ui/scrollable";
import { ConfirmButton, Deposit, Earn } from "./sections";

function Swap(): JSX.Element {
  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0 h-full">
      <Scrollable>
        <div className="flex flex-col gap-4">
          <Deposit />
          <Earn />
        </div>
      </Scrollable>
      <ConfirmButton className="mt-auto" />
    </div>
  );
}

export default Swap;
