import type { JSX } from "react";
import { useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
// TODO: create a pkg for manage supported chains and utilities
import { chainLogo, chainName } from "@/lib/chains";
import { shortenAddress } from "@/utils/address";

// Example: Only Ethereum Mainnet for now
const CHAINS = [
  { chainId: 1, label: chainName(1), icon: chainLogo(1), value: "1" },
  // Add more chains as needed
];

export function ChainSelector(): JSX.Element {
  const { address } = useAccount();
  const [selectedChain, setSelectedChain] = useState<string>(CHAINS[0].value);
  const chain = useMemo(() => CHAINS.find(c => c.value === selectedChain), [selectedChain]);

  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* Wallet Address Section */}
      <div className="flex items-center gap-2 rounded-full ">
        {/* Placeholder Turtle Icon */}
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600">
          <span role="img" aria-label="turtle" className="text-xl">🐢</span>
        </span>
        <span className="text-white bg-[#181A20] p-1 text-sm font-mono text-ellipsis overflow-hidden">{shortenAddress(address)}</span>
      </div>

      {/* Chain Selector Section */}
      <Select value={selectedChain} onValueChange={setSelectedChain}>
        <SelectTrigger className="flex items-center gap-2 rounded-full bg-[#181A20] px-4 py-2 min-w-[120px]">
          {chain && (
            <span className="flex items-center gap-2">
              <img src={chain.icon} alt={chain.label} className="h-7 w-7 rounded-full" />
              <SelectValue>{chain.label}</SelectValue>
            </span>
          )}
        </SelectTrigger>
        <SelectContent>
          {CHAINS.map(c => (
            <SelectItem key={c.value} value={c.value}>
              <span className="flex items-center gap-2">
                <img src={c.icon} alt={c.label} className="h-5 w-5 rounded-full" />
                {c.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
