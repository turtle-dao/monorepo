import { type QueryClient, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { type Config, earnRoute, type EarnRouteOptions, type EarnRouteResponse } from "@turtledev/api";
import { useConfig } from "@turtledev/react";

export interface UseEarnRouteOptions {
  config?: Config;
}

export function useEarnRoute(
  options?: EarnRouteOptions,
  { config }: UseEarnRouteOptions = {},
): UseQueryResult<EarnRouteResponse | null> {
  const defaultConfig = useConfig();
  const queryClient = useQueryClient();
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
  }, queryClient);

  return query;
}
