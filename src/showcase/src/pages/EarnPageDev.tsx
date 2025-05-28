import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { defaultThemeConfig, EarnPage, TurtleLogo, TurtleProvider, useWagmiAdapter } from "@turtledev/react";
import { useAccount } from "wagmi";

export function EarnPageDev(): React.ReactElement {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const adapter = useWagmiAdapter();

  return (
    <TurtleProvider themeConfig={{
      ...defaultThemeConfig,
      theme: "dark",
    }}
    >
      <EarnPage
        referral="TURTLE"
        user={address}
        header={{
          logo: <TurtleLogo fill="hsl(117, 85%, 69%)" className="w-10 h-10" />,
          text: "Turtle Earn",
          extra: <ConnectButton />,
        }}
        openConnectionModal={openConnectModal ?? (() => {})}
        {...adapter}
      />
    </TurtleProvider>
  );
}
