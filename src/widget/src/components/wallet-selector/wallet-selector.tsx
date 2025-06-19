import type { JSX } from "react";
import { TurtleLogo } from "@turtledev/react";
import { ChevronDown } from "lucide-react";
import { InteractiveIconOverlay } from "../ui/interactive-icon-overlay";

function WalletSelector(): JSX.Element {
  // Mock wallet address - you can replace this with actual wallet connection logic
  const walletAddress = "0x123...hj67kk5bsy";

  const walletIcon = (
    <div className="w-10 h-10 rounded-full bg-[var(--color-text-accent)]/10 flex items-center justify-center">
      <TurtleLogo className="absolute size-[42px]" />
    </div>
  );

  return (
    <InteractiveIconOverlay
      icon={walletIcon}
      ringClass="ring-green-400/60"
      onClick={() => console.warn("Wallet selector clicked")}
    >
      <span className="text-[var(--color-text-primary)] font-medium text-sm">
        {walletAddress}
      </span>
      <ChevronDown className="w-4 h-4 text-[var(--color-text-primary)]" />
    </InteractiveIconOverlay>
  );
}

export default WalletSelector;
