import type { EarnRouteOptions, EarnRouteResponse } from "@turtledev/api";
import { useAtomValue } from "jotai";
import { useEffect, useMemo } from "react";
import { parseUnits } from "viem/utils";
import { useAccount } from "wagmi";
import { useEarnRoute } from "@/hooks/useRoute";
import { dealSelectedAtom, depositDetailsAtom, distributorIdAtom } from "@/store/sections";

function useTokenDeposit(): { fetchedRoute: EarnRouteResponse | null; routeError: Error | null } {
  const { address } = useAccount();
  const dealSelected = useAtomValue(dealSelectedAtom);
  const selectedToken = useAtomValue(depositDetailsAtom);
  const distributorId = useAtomValue(distributorIdAtom);

  // const selectedChain = useAtomValue(selectedChainAtom);

  const routeParams = useMemo(() => {
    if (!address || !dealSelected || !selectedToken) // || inputTokenState.isZero)
      return undefined;

    // let maxAmount = BigInt(inputTokenState.selectedToken.balance);
    let amount = parseUnits(selectedToken.amount, selectedToken.tokenDecimals);

    console.warn(amount);
    // if (amount > maxAmount)
    //   amount = maxAmount;

    // return {} as EarnRouteOptions;
    return {
      chain: 1,
      user: address,
      tokenIn: selectedToken.tokenAddress,
      tokenOut: dealSelected.tokenAddress,
      amount: amount.toString(),
      slippage: 0.02,
      referral: distributorId,
      id: dealSelected.id,
    } as EarnRouteOptions;
  }, [
    address,
    dealSelected,
    selectedToken,
    distributorId,
  ]);

  useEffect(() => {
    console.warn("routeParams", routeParams);
  }, [routeParams]);

  const { data: fetchedRoute, error: routeError } = useEarnRoute(routeParams);

  useEffect(() => {
    console.warn("fetchedRoute", fetchedRoute);
  }, [fetchedRoute]);

  return { fetchedRoute: fetchedRoute ?? null, routeError: routeError ?? null };
}

export default useTokenDeposit;
