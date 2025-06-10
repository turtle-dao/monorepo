import type { JSX } from "react";
import { Separator } from "../ui/shadcn/separator";
import { Chain, ConfirmButton, Deposit, Earn } from "./sections";

function Swap(): JSX.Element {
  return (
    <>
      <Chain />
      <Separator />
      <Deposit />
      <Separator />
      <Earn />
      <Separator />
      <ConfirmButton />
    </>
  );
}

export default Swap;
