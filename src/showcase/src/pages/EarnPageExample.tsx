import { Button } from "@/components/ui/button";
import { Hazard } from "@/components/ui/hazard";
import { Switch } from "@/components/ui/switch";
import { Label } from "@radix-ui/react-label";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { defaultThemeConfig, EarnPage, TurtleLogo, TurtleProvider } from "@turtledev/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useAccount, useSignMessage } from "wagmi";
import BookOpen from "~icons/heroicons/book-open-16-solid";
import Star from "~icons/heroicons/star-16-solid";
import "@turtledev/react/styles.css";

export function EarnPageExample(): React.ReactElement {
  const [showHazard, setShowHazard] = useState(false);
  const [enableSearch, setEnableSearch] = useState(true);
  const [useLightTheme, setUseLightTheme] = useState(false);

  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { signMessageAsync } = useSignMessage();

  const signMessage = async (message: string): Promise<string> => {
    const signature = await signMessageAsync({ message });
    return signature;
  };

  useEffect(() => {
    if (useLightTheme) {
      document.documentElement.classList.remove("dark");
    }
    else {
      document.documentElement.classList.add("dark");
    }
  }, [useLightTheme]);

  return (
    <main className="flex justify-center w-full min-h-screen bg-white dark:bg-zinc-950">
      <div className="flex flex-col gap-8 w-full max-w-[1200px] px-8 mt-8 mb-12">
        <div className="flex justify-between">
          <Link to="/">
            <TurtleLogo fill={useLightTheme ? "#060606" : "#fff"} className="w-10 h-10" />
          </Link>

          <ConnectButton />
        </div>

        <div>
          <div className="text-2xl font-medium">Earn Showcase</div>

          <div className="flex gap-2 mt-3">
            <Button variant="ghost" asChild>
              <Link to="/components/earn-page">
                <BookOpen />
                Docs
              </Link>
            </Button>

            <Button variant="ghost" asChild>
              <Link to="/earn-wizard">
                <Star />
                Wizard
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-xl font-medium">Component Toggles</div>

          <div className="flex items-center space-x-3">
            <Switch id="show-hazard" checked={showHazard} onCheckedChange={setShowHazard} />
            <Label htmlFor="show-hazard" className="block text-base font-medium">Show Component Area</Label>
          </div>

          <div className="flex items-center space-x-3">
            <Switch id="enable-search" checked={enableSearch} onCheckedChange={setEnableSearch} />
            <Label htmlFor="enable-search" className="block text-base font-medium">Enable Search</Label>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="text-xl font-medium">Theme Customization</div>

          <div className="flex items-center space-x-3">
            <Switch
              id="use-light-theme"
              checked={useLightTheme}
              onCheckedChange={setUseLightTheme}
            />
            <Label htmlFor="use-light-theme" className="block text-base font-medium">Use light theme</Label>
          </div>
        </div>

        <TurtleProvider themeConfig={{
          ...defaultThemeConfig,
          theme: useLightTheme ? "light" : "dark",
        }}
        >
          {showHazard && (
            <div className="w-[calc(100%+1rem)] -m-2">
              <Hazard>
                <EarnPage
                  referral="TURTLE"
                  user={address}
                  openConnectionModal={openConnectModal}
                  signMessage={signMessage}
                  enableSearch={enableSearch}
                />
              </Hazard>
            </div>
          )}

          {!showHazard && (
            <EarnPage
              referral="TURTLE"
              user={address}
              openConnectionModal={openConnectModal}
              signMessage={signMessage}
              enableSearch={enableSearch}
            />
          )}
        </TurtleProvider>
      </div>
    </main>
  );
}
