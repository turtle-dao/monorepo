import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { defaultThemeConfig, EarnPage, TurtleLogo, TurtleProvider } from "@turtledev/react";
import { useAccount, useSignMessage } from "wagmi";

export function EarnPageDev(): React.ReactElement {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();

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
        openConnectionModal={openConnectModal}
        signMessage={signMessage}
      />
    </TurtleProvider>
  );
}
