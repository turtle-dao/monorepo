import type { JSX } from "react";
import { useSetAtom } from "jotai";
import { ArrowLeft } from "lucide-react";
import { showPanelAtom } from "@/store/sections";
import Opportunity from "./opportunity";
import { Button } from "./ui/shadcn/button";

interface Deal {
  name: string;
  iconUrl: string;
  tvl: string;
  yieldPercentage: string;
}

function Deals({ deals }: { deals: Deal[] }): JSX.Element {
  const setShowDeals = useSetAtom(showPanelAtom);
  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0 animate-in slide-in-from-left duration-300 w-full">
      <div className="mb-2">
        <Button
          onClick={() => setShowDeals(false)}
          className="flex items-center gap-2 text-[var(--color-text-accent)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
        </Button>
      </div>
      {deals.map((deal, index) => (
        <div
          key={deal.name}
          className="animate-in slide-in-from-left duration-400"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <Opportunity {...deal} />
        </div>
      ))}
    </div>
  );
}

export default Deals;
