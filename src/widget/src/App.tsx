import { TurtleLogo } from "@turtledev/react";
import { type JSX, useState } from "react";
import { ChainSelector, Swap } from "./components";
import { MenuBar } from "./components/MenuBar";
import { WidgetContainer } from "./components/ui/widget-container";
import { WidgetRoot } from "./components/widget/widget-root";
import { TAB_TURTLE_EARN, TAB_YOUR_POSITIONS, tabButtons, type TabType } from "./constants";
import { defaultWidgetStyleConfig } from "./store/widget-style-config";
import { cn } from "./utils";

function App(): JSX.Element {
  const [tab, setTab] = useState<TabType>("swap");

  return (
    <div className={cn("relative z-[1] flex w-full items-center justify-center size-full")}>
      <WidgetRoot config={defaultWidgetStyleConfig}>
        <WidgetContainer
          variant="dark"
          gradient="white"
          shadow="large"
          className="flex w-full flex-col gap-5"
        >
          <div className="flex justify-center py-2.5">
            <TurtleLogo className="w-[135px]" />
          </div>
          <MenuBar
            selectedValue={tab}
            onValueChange={setTab}
            items={[...tabButtons]}
            className="hidden w-full bg-ninja-black sm:inline-flex"
          />
          <ChainSelector />
          {tab === TAB_TURTLE_EARN && <Swap />}
          {tab === TAB_YOUR_POSITIONS && <div>Positions</div>}
        </WidgetContainer>
      </WidgetRoot>
    </div>
  );
}

export default App;
