import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, earnRoute, type EarnRouteOptions, type EarnRouteResponse } from "@turtledev/api";
import { defaultQueryClient } from "../../client";
import { useConfig } from "../../useConfig";

export interface UseEarnRouteOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function useEarnRoute(
  options?: EarnRouteOptions,
  { config, queryClient }: UseEarnRouteOptions = {},
): UseQueryResult<EarnRouteResponse | null> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const query = useQuery({
    queryKey: [
      "earnRoute",
      options?.user,
      options?.chain,
      options?.slippage,
      options?.tokenIn,
      options?.tokenOut,
      options?.amount,
    ],
    queryFn: async () => {
      if (!enabled)
        return null;

      return await earnRoute(options, config ?? defaultConfig);
    },
    enabled,
    staleTime: 30 * 1000,
    refetchInterval: 15 * 1000,
    refetchOnWindowFocus: true,
  }, queryClient ?? defaultQueryClient);

  return query;
}
