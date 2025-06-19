import type { JSX } from "react";
import { useSetAtom } from "jotai";
import { showPanelAtom } from "@/store/sections";
import { AssetIcon } from "./ui/asset-icon";
import { WidgetContainer } from "./ui/widget-container";

function Opportunity({ name, iconUrl, tvl, yieldPercentage }: { name: string; iconUrl: string; tvl: string; yieldPercentage: string }): JSX.Element {
  const setShowPanel = useSetAtom(showPanelAtom);
  return (
    <WidgetContainer onClick={() => setShowPanel(true)} variant="card" shadow="large" gradient className="w-full">
      <div className="flex justify-between p-1">
        <div className="flex flex-col gap-0.5 ">
          <div className="flex gap-2 items-center justify-start">
            <AssetIcon url={iconUrl} />
            <span className="text-2xl text-[var(--color-text-primary)]">{name}</span>
          </div>
          <span className="text-xs text-[var(--color-text-primary)]/80">
            Boosted TVL $
            {tvl}
          </span>
        </div>
        <div className="text-[var(--color-text-primary)]">
          <span className="text-4xl">{yieldPercentage}</span>
        </div>
      </div>
    </WidgetContainer>
  );
}

export default Opportunity;
