import type { JSX } from "react";
import { useSetAtom } from "jotai";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useAutoSelectDeal } from "@/hooks/useAutoSelectDeal";
import { showPanelAtom } from "@/store/sections";
import Opportunity from "./opportunity";
import Scrollable from "./ui/scrollable";
import { Button } from "./ui/shadcn/button";

function Deals(): JSX.Element {
  const setShowDeals = useSetAtom(showPanelAtom);
  const { dealsFormatted } = useAutoSelectDeal();
  const [isExiting, setIsExiting] = useState(false);

  const handleClose = (): void => {
    setIsExiting(true);
    // Delay the actual close to allow animation to complete
    setTimeout(() => {
      setShowDeals(false);
      setIsExiting(false);
    }, 300); // Match animation duration
  };

  return (
    <div className={`flex flex-col gap-4 flex-1 min-h-0 w-full ${
      isExiting
        ? "animate-out fade-out duration-200"
        : "animate-in fade-in duration-300"
    }`}
    >
      <div className="mb-2">
        <Button
          onClick={handleClose}
          className="flex items-center gap-2 text-[var(--color-text-accent)] hover:text-[var(--color-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-8 h-8" />
        </Button>
      </div>
      <Scrollable>
        <div className="flex flex-col gap-4">
          {dealsFormatted.map(deal => (
            <div key={deal.tokenName}>
              <Opportunity {...deal} onAnimatedClose={handleClose} />
            </div>
          ))}
        </div>
      </Scrollable>
    </div>
  );
}

export default Deals;
