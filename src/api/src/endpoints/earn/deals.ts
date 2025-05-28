import type { Config } from "@/config";
import { z } from "zod";
import { buildQueryString, doFetch } from "@/fetch";
import { defiMetadata, defiToken } from "./typed/generic";

export interface EarnDealsOptions {
  campaignId?: string;
  idFilter?: string;
  protocolFilter?: string;
}

const earnMetadataSchema = z.object({
  ...defiMetadata.shape,
  totalTvl: z.number(),
  chains: z.array(z.number()),
});

const earnDealsSchema = z.object({
  deals: z.array(defiToken),
  metadata: z.record(z.string().uuid(), earnMetadataSchema),
});

export type EarnDealsResponse = z.infer<typeof earnDealsSchema>;

export async function earnDeals(
  options: EarnDealsOptions,
  config: Config,
): Promise<EarnDealsResponse> {
  const response = await doFetch(config, earnDealsSchema, {
    path: `/v1/api/deals?${buildQueryString({
      campaign_id: options.campaignId,
      id_filter: options.idFilter,
      protocol_filter: options.protocolFilter,
    })}`,
    type: "earn",
  });

  return response;
}
