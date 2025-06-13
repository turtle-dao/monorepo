import { useSetAtom } from "jotai";
import { type JSX, useState } from "react";
import { ChainSelector, Swap } from "./components";
import { MenuBar } from "./components/MenuBar";
import { Button } from "./components/ui/shadcn/button";
import { TurtleLogo } from "./components/ui/turtle-logo";
import { WidgetContainer } from "./components/ui/widget-container";
import { WidgetRoot } from "./components/widget/widget-root";
import { TAB_TURTLE_EARN, TAB_YOUR_POSITIONS, tabButtons, type TabType } from "./constants";
import { config2, config3, config4, defaultWidgetStyleConfig, widgetStyleConfigAtom } from "./store/widget-style-config";
import { cn } from "./utils";

function App(): JSX.Element {
  const [tab, setTab] = useState<TabType>("swap");
  const setConfig = useSetAtom(widgetStyleConfigAtom);

  return (
    <div className={cn("relative z-[1] flex flex-col w-screen items-center justify-center items-center size-full min-h-screen")}>
      <div className="flex gap-2 justify-between p-2">
        <Button onClick={() => setConfig(config4)}>Default</Button>
        <Button onClick={() => setConfig(defaultWidgetStyleConfig)}>Config 1</Button>
        <Button onClick={() => setConfig(config2)}>Config 2</Button>
        <Button onClick={() => setConfig(config3)}>Config 3</Button>
      </div>
      <WidgetRoot config={defaultWidgetStyleConfig}>
        <WidgetContainer
          gradient
          variant="dark"
          shadow="xlarge"
          className="flex w-full flex-col gap-5"
        >
          <div className="flex justify-center items-center text-4xl font-bold font-sans py-2.5 text-neon-green">
            <TurtleLogo className="w-20 h-20" />
            <span className="ml-2">Turtle Club</span>
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
