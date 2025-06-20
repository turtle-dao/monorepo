import type { Network } from "@turtledev/react/types/components/exported/earn-page/adapters/type";
import type { Address, Hex } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useWagmiAdapter } from "@turtledev/react";
import { type JSX, useEffect } from "react";
import { useAccount } from "wagmi";
import { TurtleButton } from "@/components/ui/TurtleButton";
import useTokenDeposit from "@/hooks/useTokenDeposit";

export function ConfirmButton({ className }: { className?: string }): JSX.Element {
  const { address } = useAccount();

  const { openConnectModal } = useConnectModal();
  const { fetchedRoute, routeError } = useTokenDeposit();
  const { sendTransaction } = useWagmiAdapter();

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

  const handleConfirm = async (tx: {
    data: string;
    value: string;
    from: string;
    to: string;
    gas: number;
  }): Promise<void> => {
    if (!fetchedRoute)
      return;

    // const tx = fetchedRoute.steps[1].tx;
    const hash = await sendTransaction({
      from: tx.from as Address,
      to: tx.to as Address,
      data: tx.data as Hex,
      value: BigInt(tx.value),
      chainId: 1 as Network,
    });
    console.warn("hash", hash);
  };

  return address === undefined
    ? (
        <TurtleButton variant="reversed" size="lg" fullWidth onClick={openConnectModal} className={className}>
          Connect wallet
        </TurtleButton>
      )
    : (
        <>
          {fetchedRoute && (
            fetchedRoute.steps.map((step, index) => (
              <TurtleButton
                key={index}
                variant="reversed"
                size="lg"
                fullWidth
                // disabled={routeError !== undefined || fetchedRoute === undefined || fetchedRoute?.steps.length === 0}
                onClick={() => handleConfirm(step.tx)}
                className={className}
              >
                Confirm
              </TurtleButton>
            ))
          )}
        </>

      );
}
