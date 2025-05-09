import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, exists, type ExistsOptions } from "@turtledev/api";
import { defaultQueryClient } from "../client";
import { useConfig } from "../useConfig";

export interface UseExistsOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function useExists(
  options?: ExistsOptions,
  { config, queryClient }: UseExistsOptions = {},
): UseQueryResult<boolean | null> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const query = useQuery({
    queryKey: ["exists", options?.user],
    queryFn: async () => {
      if (!enabled)
        return null;

      return await exists(options, config ?? defaultConfig);
    },
    enabled,
    staleTime: 2 * 60 * 1000,
    refetchInterval: 1 * 60 * 1000,
    refetchOnWindowFocus: true,
  }, queryClient ?? defaultQueryClient);

  return query;
}
