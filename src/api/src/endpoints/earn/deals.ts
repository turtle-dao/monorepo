import type { Config } from "@/config";
import { doFetch } from "@/fetch";
import { z } from "zod";
import { asset, defiToken } from "./typed/generic";

const earnDealsSchema = z.object({
  tokens: z.array(defiToken),
  // Key is the token protocol
  assets: z.record(z.string(), asset.nullable()),
});

export type EarnDealsResponse = z.infer<typeof earnDealsSchema>;

export async function earnDeals(
  config: Config,
): Promise<EarnDealsResponse> {
  const response = await doFetch(config, earnDealsSchema, {
    path: `/v1/api/deals`,
    type: "earn",
  });

  return response;
}
