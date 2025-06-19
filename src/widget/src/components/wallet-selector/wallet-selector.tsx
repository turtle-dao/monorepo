import type { JSX } from "react";
import { TurtleLogo } from "@turtledev/react";
import { ChevronDown } from "lucide-react";

function WalletSelector(): JSX.Element {
  // Mock wallet address - you can replace this with actual wallet connection logic
  const walletAddress = "0x123...hj67kk5bsy";

  return (
    <div className="relative flex items-center min-w-[180px] h-10">
      {/* Overlapped Green Icon */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-11 w-11 rounded-full ring-1 ring-green-400/60 bg-[var(--color-surface-primary)]">
        <div className="w-10 h-10 rounded-full bg-[var(--color-text-accent)]/10 flex items-center justify-center">
          <TurtleLogo className="absolute size-[42px] " />
        </div>
      </span>

      {/* Main Container */}
      <div className="flex items-center justify-between rounded-full bg-[var(--color-surface-secondary)] pl-14 pr-3 gap-3 border border-[var(--color-text-primary)]/10 w-full h-10 cursor-pointer transition-colors hover:border-[var(--color-text-accent)]">
        {/* Wallet Address */}
        <span className="text-[var(--color-text-primary)] font-medium text-sm">
          {walletAddress}
        </span>

        {/* Chevron Down */}
        <ChevronDown className="w-4 h-4 text-[var(--color-text-primary)]" />
      </div>
    </div>
  );
}

export default WalletSelector;
