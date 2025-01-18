import { type QueryClient, useMutation, type UseMutationResult, useQuery } from "@tanstack/react-query";
import { type Config, signup, type SignupOptions } from "@turtle/api";
import { defaultQueryClient } from "../client";
import { useConfig } from "../useConfig";

export interface UseSignupOptions {
  config?: Config;
  queryClient?: QueryClient;
}

export function useSignup(
  options?: Omit<SignupOptions, "signature">,
  { config, queryClient }: UseSignupOptions = {},
): UseMutationResult<boolean | null, Error, string, unknown> {
  const defaultConfig = useConfig();
  const enabled = options !== undefined;

  const mutation = useMutation({
    mutationFn: async (signature: string) => {
      if (!enabled)
        return null;

      return await signup({ ...options, signature }, config ?? defaultConfig);
    },
  }, queryClient ?? defaultQueryClient);

  return mutation;
}
