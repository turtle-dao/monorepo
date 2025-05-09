import { defaultQueryClient } from "@/hooks/client";
import { useConfig } from "@/hooks/useConfig";
import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, earnDeals, type EarnDealsResponse } from "@turtledev/api";

export interface UseEarnDealsOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function useEarnDeals(
  { config, queryClient }: UseEarnDealsOptions = {},
): UseQueryResult<EarnDealsResponse | null> {
  const defaultConfig = useConfig();

  const query = useQuery({
    queryKey: ["earn-deals"],
    queryFn: async () => {
      return await earnDeals(config ?? defaultConfig);
    },
    staleTime: 60 * 1000,
    refetchInterval: 30 * 1000,
    refetchOnWindowFocus: true,
  }, queryClient ?? defaultQueryClient);

  return query;
}
