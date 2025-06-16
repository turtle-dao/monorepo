import type { JSX } from "react";
import { Separator } from "../ui/shadcn/separator";
import { ConfirmButton, Deposit, Earn } from "./sections";

function Swap(): JSX.Element {
  return (
    <>
      <Deposit />
      <Earn />
      <ConfirmButton />
    </>
  );
}

export default Swap;
