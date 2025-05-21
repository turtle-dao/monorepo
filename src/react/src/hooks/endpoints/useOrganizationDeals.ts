import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, organizationDeals, type OrganizationDealsOptions, type OrganizationDealsResponse } from "@turtledev/api";
import { defaultQueryClient } from "../client";
import { useConfig } from "../useConfig";

export interface UseOrganizationDealsOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function useOrganizationDeals(
  options?: OrganizationDealsOptions,
  { config, queryClient }: UseOrganizationDealsOptions = {},
): UseQueryResult<OrganizationDealsResponse | null> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const query = useQuery({
    queryKey: ["organizationDeals", options?.organizationId],
    queryFn: async () => {
      if (!enabled)
        return null;

      return await organizationDeals(options, config ?? defaultConfig);
    },
    enabled,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 1 * 60 * 1000,
  }, queryClient ?? defaultQueryClient);

  return query;
}
