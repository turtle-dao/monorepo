import type { Config } from "../config";
import { z } from "zod";
import { doFetch } from "../fetch";

export interface SignupOptions {
  signupToken: string;
  user: string;
  signature: string;
  referral?: string;
  network?: string;
}

const successMessage = "Signup successful";

export async function signup(
  options: SignupOptions,
  config: Config,
): Promise<boolean> {
  const response = await doFetch(config, z.string(), {
    path: `/oauth/signup`,
    body: {
      signup_token: options.signupToken,
      address: options.user,
      signature: options.signature,
      referral: options.referral,
      network: options.network,
    },
    isJson: false,
  });

  return response === successMessage;
}
