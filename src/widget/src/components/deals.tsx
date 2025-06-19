import type { JSX } from "react";
import type { DealFormatted } from "@/App";
import { useSetAtom } from "jotai";
import { ArrowLeft } from "lucide-react";
import { showPanelAtom } from "@/store/sections";
import Opportunity from "./opportunity";
import Scrollable from "./ui/scrollable";
import { Button } from "./ui/shadcn/button";

function Deals({ deals }: { deals: DealFormatted[] }): JSX.Element {
  const setShowDeals = useSetAtom(showPanelAtom);
  return (
    <div className="flex flex-col gap-4 flex-1 min-h-0 animate-in  slide-in-from-left duration-300 w-full">
      <div className="mb-2">
        <Button
          onClick={() => setShowDeals(false)}
          className="flex items-center gap-2 text-[var(--color-text-accent)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
        </Button>
      </div>
      <Scrollable>
        <div className="flex flex-col gap-4">
          {deals.map(deal => (
            <div key={deal.tokenName}>
              <Opportunity {...deal} />
            </div>
          ))}
        </div>
      </Scrollable>
    </div>
  );
}

export default Deals;
