import type { Config } from "@/config";
import { z } from "zod";
import { buildQueryString } from "@/fetch";
import { fetchSigned } from "@/signed";
import { routerStep } from "./typed/routerSteps";

export interface EarnRouteOptions {
  user: string;
  chain: number;
  slippage: number;
  tokenIn: string;
  tokenOut: string;
  amount: string;
  referral: string;
  campaignId?: string;
}

const earnRouteSchema = z.object({
  steps: z.array(routerStep),
  amount_out: z.string(),
  price_impact: z.number().nullable(),
});

export type EarnRouteResponse = z.infer<typeof earnRouteSchema>;

export async function earnRoute(
  options: EarnRouteOptions,
  config: Config,
): Promise<EarnRouteResponse> {
  const response = await fetchSigned(config, earnRouteSchema, {
    path: `/v1/api/route?${buildQueryString({
      user: options.user,
      chain: options.chain,
      slippage: options.slippage,
      token_in: options.tokenIn,
      token_out: options.tokenOut,
      amount: options.amount,
      referral: options.referral,
      campaign_id: options.campaignId,
    })}`,
    type: "earn",
  });

  return response;
}
