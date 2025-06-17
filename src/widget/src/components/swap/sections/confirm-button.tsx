import type { JSX } from "react";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { TurtleButton } from "@/components/ui/TurtleButton";

export function ConfirmButton(): JSX.Element {
  const { address } = useAccount();

  const { openConnectModal } = useConnectModal();

  // Get error text if error exists
  // TODO: Migrate validationError
  // TODO: Parse enso transaction (see confirm-button in turtle-app)
  // TODO: Handle Swap
  // TODO: Handle Click Action and Button message based on txStep

  return address === undefined
    ? (
        <TurtleButton variant="reversed" size="lg" fullWidth onClick={openConnectModal}>
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
        >
          Confirm
        </TurtleButton>
      );
}
