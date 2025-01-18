import type { Config } from "../config";
import { z } from "zod";
import { doFetch } from "../fetch";

export interface PrepareSignupOptions {
  user: string;
}

const prepareSignupSchema = z.object({
  signup_token: z.string(),
  nonce: z.string(),
  timestamp: z.string(),
  sign_message: z.string(),
});

export type PrepareSignupResponse = z.infer<typeof prepareSignupSchema>;

export async function prepareSignup(
  options: PrepareSignupOptions,
  config: Config,
): Promise<PrepareSignupResponse> {
  const response = await doFetch(config, prepareSignupSchema, {
    path: `/oauth/pre_signup`,
    body: {
      address: options.user,
    },
  });

  return response;
}
