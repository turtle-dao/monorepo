import { useSetAtom } from "jotai";
import { type JSX, useEffect, useState } from "react";
import { ChainSelector, Swap } from "./components";
import { MenuBar } from "./components/MenuBar";
import { Button } from "./components/ui/shadcn/button";
import { TurtleLogo } from "./components/ui/turtle-logo";
import { WidgetContainer } from "./components/ui/widget-container";
import { WidgetRoot } from "./components/widget/widget-root";
import { TAB_TURTLE_EARN, TAB_YOUR_POSITIONS, tabButtons, type TabType } from "./constants";
import { config2, config3, defaultWidgetStyleConfig, widgetStyleConfigAtom } from "./store/widget-style-config";
import { cn } from "./utils";

function App(): JSX.Element {
  const [tab, setTab] = useState<TabType>("swap");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const setConfig = useSetAtom(widgetStyleConfigAtom);

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add("dark");
    }
    else {
      root.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={cn("relative z-[1] flex flex-col w-screen items-center justify-center items-center size-full min-h-screen")}>
      <div className="flex gap-2 justify-between p-2">
        <Button onClick={() => setConfig(defaultWidgetStyleConfig)}>Default</Button>
        <Button onClick={() => setConfig(config2)}>Config 2</Button>
        <Button onClick={() => setConfig(config3)}>Config 3</Button>
        <Button onClick={() => setIsDarkMode(!isDarkMode)}>
          {isDarkMode ? "🌞 Light" : "🌙 Dark"}
        </Button>
      </div>
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
          className="flex w-full flex-col gap-5"
        >
          <div className="flex justify-center items-center text-4xl font-bold font-sans py-2.5 text-neon-green">
            <TurtleLogo className="w-20 h-20" />
            <span className="ml-2 text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Turtle Club</span>
          </div>

          <ChainSelector />
          {tab === TAB_TURTLE_EARN && <Swap />}
          {tab === TAB_YOUR_POSITIONS && <div>Positions</div>}
        </WidgetContainer>
      </WidgetRoot>
    </div>
  );
}

export default App;
