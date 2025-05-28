import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { defaultThemeConfig, EarnPage, TurtleProvider, useWagmiAdapter } from "@turtledev/react";
import { useAccount } from "wagmi";

export function EarnPageKatana(): React.ReactElement {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const adapter = useWagmiAdapter();

  return (
    <TurtleProvider themeConfig={{
      ...defaultThemeConfig,
      light: {
        ...defaultThemeConfig.light,
        buttonBgColor: "#dce43a",
        buttonTextColor: "#090909",
      },
      dark: {
        ...defaultThemeConfig.dark,
        buttonBgColor: "#f4ff00",
        buttonTextColor: "#090909",
      },
      theme: "dark",
    }}
    >
      <EarnPage
        referral="TURTLE"
        campaignId="aaf4438a-a721-4323-9ec2-f6f174d73027"
        user={address}
        header={{
          logo: (
            <img src="https://cdn.turtle.club/katana/logo.png" className="w-8 h-8 mr-1" />
          ),
          text: "Katana",
          extra: <ConnectButton />,
        }}
        openConnectionModal={openConnectModal ?? (() => {})}
        {...adapter}
      />
    </TurtleProvider>
  );
}
