import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, partnerDeals, type PartnerDealsOptions, type PartnerDealsResponse } from "@turtledev/api";
import { defaultQueryClient } from "../client";
import { useConfig } from "../useConfig";

export interface UsePartnerDealsOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function usePartnerDeals(
  options?: PartnerDealsOptions,
  { config, queryClient }: UsePartnerDealsOptions = {},
): UseQueryResult<PartnerDealsResponse | null> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const query = useQuery({
    queryKey: ["partnerDeals", options?.partnerId],
    queryFn: async () => {
      if (!enabled)
        return null;

      return await partnerDeals(options, config ?? defaultConfig);
    },
    enabled,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 1 * 60 * 1000,
  }, queryClient ?? defaultQueryClient);

  return query;
}
