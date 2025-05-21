import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, organizationsDeals, type OrganizationsDealsOptions, type OrganizationsDealsResponse } from "@turtledev/api";
import { defaultQueryClient } from "../client";
import { useConfig } from "../useConfig";

export interface UseOrganizationsDealsOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function useOrganizationsDeals(
  options?: OrganizationsDealsOptions,
  { config, queryClient }: UseOrganizationsDealsOptions = {},
): UseQueryResult<OrganizationsDealsResponse | null> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const query = useQuery({
    queryKey: ["organizationsDeals", options?.organizationIds],
    queryFn: async () => {
      if (!enabled)
        return null;

      return await organizationsDeals(options, config ?? defaultConfig);
    },
    enabled,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 1 * 60 * 1000,
    throwOnError: true,
  }, queryClient ?? defaultQueryClient);

  return query;
}
