import type { JSX } from "react";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select";
// TODO: create a pkg for manage supported chains and utilities
import { chainLogo, chainName } from "@/lib/chains";
import { TurtleLogo } from "../ui/turtle-logo";
import WalletSelector from "./account-details";
import { ChainSelectorV2 } from "./chain-selector-v2";

// Example: Only Ethereum Mainnet for now
const CHAINS = [
  { chainId: 1, label: chainName(1), icon: chainLogo(1), value: "1", glow: "ring-blue-400/60" },
  // Add more chains as needed
];

function shortenAddress(address?: string): string {
  if (!address)
    return "-";
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

// This component is used to display an icon with a children element overlapping it
function IconWithChildren({ icon, children, ringClass = "" }: { icon: React.ReactNode; children: React.ReactNode; ringClass?: string }): JSX.Element {
  return (
    <div className="relative flex items-center min-w-[180px] h-12">
      {/* Overlapped Icon */}
      <span className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center h-11 w-11 rounded-full ring-1 p-0.5 ${ringClass} bg-black`}>
        {icon}
      </span>
      <div className="flex items-center rounded-full bg-[#181A20] pl-14 pr-4 gap-3 border-none w-full h-12">
        {children}
      </div>
    </div>
  );
}

export function ChainSelect({ chain, selectedChain, setSelectedChain }: { chain: any; selectedChain: string; setSelectedChain: (chain: string) => void }): JSX.Element {
  return (
    <IconWithChildren
      icon={<img src={chain?.icon} alt={chain?.label} className="h-8 w-8 rounded-full" />}
      ringClass={chain?.glow || ""}
    >
      <Select value={selectedChain} onValueChange={setSelectedChain}>
        <SelectTrigger className="flex items-center dark:bg-[#181A20] hover:border-none focus:bg-[#181A20] bg-[#181A20] gap-3 rounded-full border-none w-full h-12 pl-0 pr-0">
          <span className="text-white font-semibold">{chain?.label}</span>
        </SelectTrigger>
        <SelectContent>
          {CHAINS.map(c => (
            <SelectItem key={c.value} value={c.value}>
              <span className="flex items-center gap-2">
                <span className={`flex items-center justify-center h-5 w-5 rounded-full ring-1 ${c.glow} bg-black`}>
                  <img src={c.icon} alt={c.label} className="h-6 w-6 rounded-full" />
                </span>
                {c.label}
              </span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </IconWithChildren>
  );
}

export function ChainSelector(): JSX.Element {
  // const { address } = useAccount();
  // const [selectedChain, setSelectedChain] = useState<string>(CHAINS[0].value);
  // const chain = CHAINS.find(c => c.value === selectedChain);

  return (
    <div className="flex w-full items-center justify-between gap-4">
      {/* Wallet Address Selector */}
      <WalletSelector />

      {/* Chain Selector */}
      <ChainSelectorV2 />
      {/* <ChainSelect chain={chain} selectedChain={selectedChain} setSelectedChain={setSelectedChain} /> */}
    </div>
  );
}
