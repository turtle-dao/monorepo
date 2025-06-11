import type { TabType } from "@/constants";
import { type JSX, useState } from "react";
import TurtleLogo from "@/assets/turtle-club-logo.svg";
import { ChainSelector, MenuBar, Swap } from "@/components";
import { TAB_TURTLE_EARN, TAB_YOUR_POSITIONS, tabButtons } from "@/constants";
import { cn } from "@/utils";

function App(): JSX.Element {
  const [tab, setTab] = useState<TabType>("swap");

  return (
    <div id="turtle-widget" className="widget" style={{ height: "100vh", width: "100vw" }}>
      <div className={cn("relative z-[1] flex w-full items-center justify-center size-full")}>
        <div className="flex w-full max-w-[510px] flex-col items-center gap-2 sm:min-h-[820px]">
          <div className="gradient-border gradient-border-white gradient-radius-20 flex w-full flex-col gap-5 bg-ninja-black px-5 py-10 md:p-[25px]">
            <div className="flex justify-center py-2.5">
              <TurtleLogo className="w-[135px]" />
            </div>
            <MenuBar
              selectedValue={tab}
              onValueChange={setTab}
              items={[...tabButtons]}
              className="hidden w-full bg-ninja-black sm:inline-flex"
            />
            <div className="text-center text-sm text-wise-white/50">
              Deposit into turtle campaigns and deals to earn rewards
            </div>
            <ChainSelector />
            {tab === TAB_TURTLE_EARN && <Swap />}
            {tab === TAB_YOUR_POSITIONS && <div>Positions</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
