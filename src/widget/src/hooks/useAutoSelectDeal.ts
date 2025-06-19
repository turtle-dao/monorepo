import type { DealFormatted } from "@/App";
import { useEarnDeals } from "@turtledev/react";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import { dealSelectedAtom } from "@/store/sections";

export function useAutoSelectDeal() {
  const setDealSelected = useSetAtom(dealSelectedAtom);
  const dealSelected = useAtomValue(dealSelectedAtom);

  const { data: deals } = useEarnDeals();
  const dealsFormatted = useMemo<DealFormatted[]>(() => {
    if (!deals?.deals)
      return [];
    return deals.deals.map((deal: any) => ({
      tokenName: deal.token.name,
      tvl: deal.data.tvl,
      iconToken: deal.token.logos[0],
      iconDeal: deal.metadata.iconUrl,
      yieldPercentage: deal.data.apy,
    }));
  }, [deals]);

  // Auto-select the first deal when deals are loaded
  useEffect(() => {
    console.warn("useAutoSelectDeal - dealsFormatted:", dealsFormatted, "dealSelected:", dealSelected);
    if (dealsFormatted.length > 0 && !dealSelected) {
      console.warn("Auto-selecting first deal:", dealsFormatted[0]);
      setDealSelected(dealsFormatted[0]);
    }
  }, [dealsFormatted, dealSelected, setDealSelected]);

  return { dealsFormatted };
}
