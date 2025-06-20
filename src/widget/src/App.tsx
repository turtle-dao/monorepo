import { useAtomValue } from "jotai";
import { type JSX, useState } from "react";
import { ChainSelector, Swap } from "./components";
import Deals from "./components/deals";
import { MenuBar } from "./components/MenuBar";
import { WidgetContainer } from "./components/ui/widget-container";
import { WidgetRoot } from "./components/widget/widget-root";
import { TAB_DISCOVER, TAB_PORTFOLIO, TAB_TURTLE_EARN, tabButtons, type TabType } from "./constants";
import { showPanelAtom } from "./store/sections";
import { defaultWidgetStyleConfig } from "./store/widget-style-config";
import { cn } from "./utils";

export interface DealFormatted {
  id: string;
  tokenName: string;
  tokenAddress: string;
  tvl: number;
  iconToken: string;
  iconDeal: string;
  yieldPercentage: number;
}

function App(): JSX.Element {
  const [tab, setTab] = useState<TabType>("earn");
  const showPanel = useAtomValue(showPanelAtom);

  return (
    <div className={cn("flex w-screen justify-center items-center h-screen p-4")}>
      <WidgetRoot config={defaultWidgetStyleConfig}>
        <MenuBar
          selectedValue={tab}
          onValueChange={setTab}
          items={[...tabButtons]}
          className="hidden w-full bg-[var(--color-surface-primary)] dark:bg-[var(--color-surface-primary-dark)] sm:inline-flex"
        />
        <WidgetContainer
          gradient
          variant="default"
          shadow="xlarge"
          className="flex w-full flex-col gap-3.5 flex-1 min-h-0 animate-in fade-in duration-300"
        >
          {showPanel
            ? <Deals />
            : (
                <div className="animate-in fade-in duration-300 flex flex-col gap-3.5 flex-1 min-h-0 w-full">
                  <div className="flex justify-center items-center text-4xl font-bold font-sans py-2">
                    <span className="text-[var(--color-text-accent)] dark:text-[var(--color-text-accent-dark)]">Turtle Club</span>
                  </div>

                  <ChainSelector />
                  {tab === TAB_PORTFOLIO && <div className="flex-1 min-h-0">Positions</div>}
                  {tab === TAB_TURTLE_EARN && <Swap />}
                  {tab === TAB_DISCOVER && <div className="flex-1 min-h-0">Discover</div>}
                </div>
              )}
        </WidgetContainer>
      </WidgetRoot>
    </div>
  );
}

export default App;
