import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, earnDeals, type EarnDealsOptions, type EarnDealsResponse } from "@turtledev/api";
import { defaultQueryClient } from "@/hooks/client";
import { useConfig } from "@/hooks/useConfig";

export interface UseEarnDealsOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function useEarnDeals(
  options?: EarnDealsOptions,
  { config, queryClient }: UseEarnDealsOptions = {},
): UseQueryResult<EarnDealsResponse | null> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const query = useQuery({
    queryKey: [
      "earn-deals",
      options?.campaignId,
      options?.idFilter,
      options?.protocolFilter,
    ],
    queryFn: async () => {
      if (!enabled)
        return null;

      return await earnDeals(options, config ?? defaultConfig);
    },
    enabled,
    staleTime: 60 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
  }, queryClient ?? defaultQueryClient);

  return query;
}
