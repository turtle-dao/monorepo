import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, partnersDeals, type PartnersDealsOptions, type PartnersDealsResponse } from "@turtledev/api";
import { defaultQueryClient } from "../client";
import { useConfig } from "../useConfig";

export interface UsePartnersDealsOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function usePartnersDeals(
  options?: PartnersDealsOptions,
  { config, queryClient }: UsePartnersDealsOptions = {},
): UseQueryResult<PartnersDealsResponse | null> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const query = useQuery({
    queryKey: ["partnersDeals", options?.partnerIds],
    queryFn: async () => {
      if (!enabled)
        return null;

      return await partnersDeals(options, config ?? defaultConfig);
    },
    enabled,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 1 * 60 * 1000,
  }, queryClient ?? defaultQueryClient);

  return query;
}
