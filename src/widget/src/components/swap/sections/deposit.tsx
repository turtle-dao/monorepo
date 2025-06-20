import type { JSX } from "react";
import { useAccount, useBalance } from "wagmi";
import { ChainSelect } from "@/components/wallet-section/wallet-section";
import { Button } from "@/components/ui/shadcn/button";
import { WidgetContainer } from "@/components/ui/widget-container";
import { chainLogo, chainName } from "@/lib/chains";

const CHAINS = [
  { chainId: 1, label: chainName(1), icon: chainLogo(1), value: "1", glow: "ring-blue-400/60" },
  // Add more chains as needed
];
export function Deposit(): JSX.Element {
  const { address } = useAccount();
  const { data: balance } = useBalance({
    address,
  });
  return (
    <>
      <div className="text-md text-[var(--color-text-primary)]">Deposit</div>
      <WidgetContainer variant="card" shadow="large" gradient={false}>
        <div className="flex items-center justify-between">
          <input type="number" placeholder="0" className="text-[var(--color-text-primary)] text-4xl w-2/4 pl-2 placeholder:text-[var(--color-text-primary)]" />
          <div className="flex flex-col items-end justify-center w-2/4">
            {/* //TODO: Improve token selector */}
            <ChainSelect chain={CHAINS[0]} selectedChain={CHAINS[0].value} setSelectedChain={() => {}} />
            <div className="flex gap-2 items-center">
              {/* balance section */}
              <span className="text-sm text-[var(--color-text-muted)]">
                Balance:
                {address ? `${balance?.value} ${balance?.symbol}` : "0.002"}
              </span>
              {/* max button */}
              <span className="bg-[var(--color-text-accent)] text-[var(--color-text-secondary)] text-xs font-semibold rounded-full px-1.5 py-0.5 cursor-pointer">
                Max
              </span>
            </div>

          </div>
        </div>
      </WidgetContainer>
    </>
  );
}
