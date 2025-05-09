import type { Config } from "../config";
import { z } from "zod";
import { doFetch } from "../fetch";

export interface PartnerDealsOptions {
  partnerId: string;
}

export const partnerDealSchema = z.object({
  id: z.string().uuid(),
  partner_id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  url: z.string(),
  type: z.string(),
  status: z.string(),
  boost: z.object({
    name: z.string(),
    description: z.string(),
    type: z.string(),
    boost_pct: z.number(),
  }),
});

const partnerDealsSchema = z.object({
  partner: z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    landing_url: z.string().url(),
    type: z.string(),
  }),
  deals: z.array(partnerDealSchema),
});

export type PartnerDealsResponse = z.infer<typeof partnerDealsSchema>;

export async function partnerDeals(
  options: PartnerDealsOptions,
  config: Config,
): Promise<PartnerDealsResponse> {
  const response = await doFetch(config, partnerDealsSchema, {
    path: `/partners/turtle/partners/${options.partnerId}/deals`,
    type: "indexer",
  });

  return response;
}
