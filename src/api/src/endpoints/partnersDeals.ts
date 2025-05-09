import type { Config } from "../config";
import { z } from "zod";
import { doFetch } from "../fetch";
import { partnerDealSchema, type PartnerDealsResponse } from "./partnerDeals";

export interface PartnersDealsOptions {
  partnerIds: string[];
}

const partnersDealsSchema = z.object({
  deals: z.array(partnerDealSchema),
});

export type PartnersDealsResponse = z.infer<typeof partnersDealsSchema>;

export async function partnersDeals(
  options: PartnersDealsOptions,
  config: Config,
): Promise<PartnersDealsResponse> {
  const partnerIds = options.partnerIds.map(id => `partner_ids=${id}`).join("&");

  const response = await doFetch(config, partnersDealsSchema, {
    path: `/partners/turtle/deals?${partnerIds}`,
    type: "indexer",
  });

  return response;
}
