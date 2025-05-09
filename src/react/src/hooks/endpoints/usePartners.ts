import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, partners, type PartnersResponse } from "@turtledev/api";
import { defaultQueryClient } from "../client";
import { useConfig } from "../useConfig";

export interface UsePartnersOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function usePartners(
  { config, queryClient }: UsePartnersOptions = {},
): UseQueryResult<PartnersResponse | null> {
  const defaultConfig = useConfig();

  const query = useQuery({
    queryKey: ["partners"],
    queryFn: async () => {
      return await partners(config ?? defaultConfig);
    },
    staleTime: 2 * 60 * 1000,
    refetchInterval: 1 * 60 * 1000,
  }, queryClient ?? defaultQueryClient);

  return query;
}
