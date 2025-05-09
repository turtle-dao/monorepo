import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { defaultThemeConfig, EarnPage, TurtleLogo, TurtleProvider } from "@turtledev/react";
import { sendTransaction, waitForTransactionReceipt } from "@wagmi/core";
import { useAccount, useConfig, useSignMessage } from "wagmi";

export function EarnPageDev(): React.ReactElement {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();
  const config = useConfig();

  const signMessage = async (message: string): Promise<string> => {
    const signature = await signMessageAsync({ message });
    return signature;
  };

  return (
    <TurtleProvider themeConfig={{
      ...defaultThemeConfig,
      theme: "dark",
    }}
    >
      <EarnPage
        referral="TURTLE"
        user={address}
        headerLogo={(
          <TurtleLogo fill="hsl(117, 85%, 69%)" className="w-10 h-10" />
        )}
        headerText="Turtle Earn"
        headerExtra={(
          <>
            <ConnectButton />
          </>
        )}
        openConnectionModal={openConnectModal ?? (() => console.error("openConnectModal is not defined"))}
        sendTransaction={async (transaction) => {
          const tx = await sendTransaction(config, transaction);
          const receipt = await waitForTransactionReceipt(config, {
            ...config,
            hash: tx,
            confirmations: 1,
            pollingInterval: 1000,
          });

          return receipt.transactionHash;
        }}
        signMessage={signMessage}
      />
    </TurtleProvider>
  );
}
