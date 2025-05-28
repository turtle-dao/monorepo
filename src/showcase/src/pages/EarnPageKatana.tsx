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
        buttonBgColor: "#8b39fd",
        buttonTextColor: "#f4f4f4",
      },
      dark: {
        ...defaultThemeConfig.dark,
        buttonBgColor: "#8b39fd",
        buttonTextColor: "#f4f4f4",
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
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mr-1" fill="none" viewBox="0 0 20 20">
              <path fill="#7C29F0" fillRule="evenodd" d="M19.615 10c0 5.523-4.391 10-9.808 10C4.391 20 0 15.523 0 10S4.39 0 9.807 0c5.417 0 9.808 4.477 9.808 10ZM10.2 16.938V7.425c0-.231.184-.418.41-.418h5.114c.523 0 .846.58.578 1.037l-5.34 9.109c-.214.364-.762.21-.762-.215Zm-.788-4.373V3.05c0-.424-.548-.578-.761-.214l-5.34 9.108c-.268.457.055 1.037.577 1.037h5.115c.226 0 .41-.187.41-.417Z" clipRule="evenodd" />
            </svg>
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
