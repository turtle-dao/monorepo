import type { Config } from "@/config";
import { buildQueryString, doFetch } from "@/fetch";
import { z } from "zod";
import { walletBalance } from "./typed/generic";

export interface EarnWalletBalancesOptions {
  user: string;
  chain: number;
}

const earnWalletBalancesSchema = z.object({
  balances: z.array(walletBalance),
});

export type EarnWalletBalancesResponse = z.infer<typeof earnWalletBalancesSchema>;

export async function earnWalletBalances(
  options: EarnWalletBalancesOptions,
  config: Config,
): Promise<EarnWalletBalancesResponse> {
  const response = await doFetch(config, earnWalletBalancesSchema, {
    path: `/v1/api/wallet_balances?${buildQueryString({
      user: options.user,
      chain: options.chain,
    })}`,
    type: "earn",
  });

  return response;
}
