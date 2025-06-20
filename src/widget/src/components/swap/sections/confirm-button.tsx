import { useConnectModal } from "@rainbow-me/rainbowkit";
import { type JSX, useEffect } from "react";
import { useAccount } from "wagmi";
import { TurtleButton } from "@/components/ui/TurtleButton";
import useTokenDeposit from "@/hooks/useTokenDeposit";

export function ConfirmButton({ className }: { className?: string }): JSX.Element {
  const { address } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { fetchedRoute, routeError } = useTokenDeposit();

  useEffect(() => {
    console.warn("fetchedRoute", fetchedRoute);
  }, [fetchedRoute]);

  useEffect(() => {
    console.warn("routeError", routeError);
  }, [routeError]);
  // Get error text if error exists
  // TODO: Migrate validationError
  // TODO: Parse enso transaction (see confirm-button in turtle-app)
  // TODO: Handle Swap
  // TODO: Handle Click Action and Button message based on txStep

  return address === undefined
    ? (
        <TurtleButton variant="reversed" size="lg" fullWidth onClick={openConnectModal} className={className}>
          Connect wallet
        </TurtleButton>
      )
    : (
        <TurtleButton
          variant="reversed"
          size="lg"
          fullWidth
          // disabled={txStep !== TxStepValues.DONE && (confirmButtonDisabled || isConfirming || isPending)}
          // eslint-disable-next-line no-alert
          onClick={() => { alert("Confirm Transaction"); }}
          className={className}
        >
          Confirm
        </TurtleButton>
      );
}
