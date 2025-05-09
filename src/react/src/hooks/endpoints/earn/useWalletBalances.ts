import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, earnWalletBalances, type EarnWalletBalancesOptions, type EarnWalletBalancesResponse } from "@turtledev/api";
import { defaultQueryClient } from "../../client";
import { useConfig } from "../../useConfig";

export interface UseEarnWalletBalancesOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function useEarnWalletBalances(
  options?: EarnWalletBalancesOptions,
  { config, queryClient }: UseEarnWalletBalancesOptions = {},
): UseQueryResult<EarnWalletBalancesResponse | null> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const query = useQuery({
    queryKey: ["earnWalletBalances", options?.chain, options?.user],
    queryFn: async () => {
      if (!enabled)
        return null;

      return await earnWalletBalances(options, config ?? defaultConfig);
    },
    enabled,
    staleTime: 30 * 1000,
    refetchInterval: 15 * 1000,
    refetchOnWindowFocus: true,
  }, queryClient ?? defaultQueryClient);

  return query;
}
