import type { Config } from "../config";
import { z } from "zod";
import { doFetch } from "../fetch";
import { organizationDealSchema, type OrganizationDealsResponse } from "./organizationDeals";

export interface OrganizationsDealsOptions {
  organizationIds: string[];
}

const organizationsDealsSchema = z.object({
  deals: z.array(organizationDealSchema),
});

export type OrganizationsDealsResponse = z.infer<typeof organizationsDealsSchema>;

export async function organizationsDeals(
  options: OrganizationsDealsOptions,
  config: Config,
): Promise<OrganizationsDealsResponse> {
  const organizationIds = options.organizationIds.map(id => `organizationIds=${id}`).join("&");

  const response = await doFetch(config, organizationsDealsSchema, {
    path: `/partners/turtle/deals?${organizationIds}`,
    type: "indexer",
  });

  return response;
}
