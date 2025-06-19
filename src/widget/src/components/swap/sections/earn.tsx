import type { JSX } from "react";
import { useAtomValue } from "jotai";
import { ExternalLink } from "lucide-react";
import Opportunity from "@/components/opportunity";
import { InfoCard } from "@/components/ui/info-card";
import { WidgetContainer } from "@/components/ui/widget-container";
import { dealSelectedAtom } from "@/store/sections";

export function Earn(): JSX.Element {
  const dealSelected = useAtomValue(dealSelectedAtom);

  return (
    <>
      <div className="text-md text-[var(--color-text-primary)] dark:text-[var(--color-text-primary-dark)]">Earn</div>
      {dealSelected
        ? (
            <Opportunity {...dealSelected} showPanelOnClick />
          )
        : (
            <OpportunitySkeleton />
          )}
      {dealSelected ? <EarnDetails /> : <EarnDetailsSkeleton />}
    </>
  );
}

function OpportunitySkeleton(): JSX.Element {
  return (
    <WidgetContainer variant="card" shadow="large" gradient className="w-full">
      <div className="flex justify-between p-1">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center justify-start">
            <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="w-24 h-5 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          </div>
          <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="w-16 h-8 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </WidgetContainer>
  );
}

function EarnDetailsSkeleton(): JSX.Element {
  return (
    <WidgetContainer variant="default" shadow="large" gradient className="max-h-96 overflow-y-auto no-scrollbar">
      <div className="flex justify-between mb-5">
        <div className="flex gap-2 items-center">
          <div className="w-5 h-5 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="w-24 h-6 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-3 gap-2 justify-between">
          <div className="flex-1 h-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="flex-1 h-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
          <div className="flex-1 h-16 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </WidgetContainer>
  );
}

function EarnDetails(): JSX.Element {
  return (
    <WidgetContainer variant="default" shadow="large" gradient className="max-h-96 overflow-y-auto no-scrollbar">
      <div className="flex justify-between mb-5 overflow-y-auto">
        <div className="flex gap-2 items-center">
          <span className="rounded-full bg-green-950 border-[var(--color-text-accent)] border-2 p-1 w-5 h-5"></span>
          <span className="text-2xl text-[var(--color-text-primary)]">Zerolend</span>
        </div>
        {/* Link to partner */}
        <a href="https://amilcarrey.ar" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border-1 border-[var(--color-text-primary)] bg-[var(--color-bg-secondary)] mr-1.5">
          <ExternalLink className="w-4 h-4 text-[var(--color-text-accent)]" />
        </a>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-3 gap-2 justify-between">
          <InfoCard title="Native Yield" value="13.35%" color="primary" className="flex-1" />
          <InfoCard title="Total yield" value="28%" color="accent" className="flex-1" />
          <InfoCard title="Net fees" value="0.5%" color="primary" className="flex-1" />
        </div>
        {/* <InfoCard title="Yield Source" value="Multi-chain risk-adjusted allocation" color="primary" />
        <InfoCard title="Aditional Rewards" value="Deposit bonus + Continual rewards" color="primary" />
        <InfoCard title="Aditional Rewards" value="Assets remains in pool until TAC Mainnet Launch" color="primary" /> */}
      </div>
    </WidgetContainer>
  );
}
