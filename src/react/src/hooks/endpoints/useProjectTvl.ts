import { type QueryClient, useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type Config, projectTvl, type ProjectTvlOptions, type ProjectTvlResponse } from "@turtledev/api";
import { defaultQueryClient } from "../client";
import { useConfig } from "../useConfig";

export interface UseProjectTvlOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function useProjectTvl(
  options?: ProjectTvlOptions,
  { config, queryClient }: UseProjectTvlOptions = {},
): UseQueryResult<ProjectTvlResponse | null> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const query = useQuery({
    queryKey: ["projectTvl", options?.projects],
    queryFn: async () => {
      if (!enabled)
        return null;

      return await projectTvl(options, config ?? defaultConfig);
    },
    enabled,
    staleTime: 7 * 60 * 1000,
    refetchInterval: 5 * 60 * 1000,
  }, queryClient ?? defaultQueryClient);

  return query;
}
