import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, organization, type OrganizationResponse } from "@turtledev/api";
import { defaultQueryClient } from "../client";
import { useConfig } from "../useConfig";

export interface UseOrganizationsOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function useOrganizations(
  { config, queryClient }: UseOrganizationsOptions = {},
): UseQueryResult<OrganizationResponse | null> {
  const defaultConfig = useConfig();

  const query = useQuery({
    queryKey: ["organizations"],
    queryFn: async () => {
      return await organization(config ?? defaultConfig);
    },
    staleTime: 2 * 60 * 1000,
    refetchInterval: 1 * 60 * 1000,
  }, queryClient ?? defaultQueryClient);

  return query;
}
