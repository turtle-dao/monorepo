import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, prepareSignup, type PrepareSignupOptions, type PrepareSignupResponse } from "@turtledev/api";
import { defaultQueryClient } from "../client";
import { useConfig } from "../useConfig";

export interface UsePrepareSignupOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function usePrepareSignup(
  options?: PrepareSignupOptions,
  { config, queryClient }: UsePrepareSignupOptions = {},
): UseQueryResult<PrepareSignupResponse | null> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const query = useQuery({
    queryKey: ["prepareSignup", options?.user],
    queryFn: async () => {
      if (!enabled)
        return null;

      return await prepareSignup(options, config ?? defaultConfig);
    },
    enabled,
    refetchInterval: 5 * 60 * 1000,
  }, queryClient ?? defaultQueryClient);

  return query;
}
