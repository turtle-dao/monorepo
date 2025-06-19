import type { JSX } from "react";
import type { DealFormatted } from "@/App";
import { useSetAtom } from "jotai";
import { formatNumber } from "@/lib/format";
import { showPanelAtom } from "@/store/sections";
import { AssetIcon } from "./ui/asset-icon";
import { WidgetContainer } from "./ui/widget-container";

function Opportunity({ tokenName, tvl, iconToken, yieldPercentage }: DealFormatted): JSX.Element {
  const setShowPanel = useSetAtom(showPanelAtom);
  return (
    <WidgetContainer onClick={() => setShowPanel(true)} variant="card" shadow="large" gradient className="w-full">
      <div className="flex justify-between p-1">
        <div className="flex flex-col gap-2 ">
          <div className="flex gap-2 items-center justify-start">
            <AssetIcon url={iconToken} />
            <span className="text-lg text-[var(--color-text-primary)]">{tokenName}</span>
          </div>
          <span className="text-xs text-[var(--color-text-primary)]/80">
            Boosted TVL $
            {formatNumber(tvl, 2, true, true)}
          </span>
        </div>
        <div className="text-[var(--color-text-primary)]">
          <span className="text-3xl">
            {yieldPercentage > 0 ? formatNumber(yieldPercentage, 2, false, true) : 0}
            %
          </span>
        </div>
      </div>
    </WidgetContainer>
  );
}

export default Opportunity;
