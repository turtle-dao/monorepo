import type { Config } from "../config";
import { z } from "zod";
import { doFetch } from "../fetch";

export interface OrganizationDealsOptions {
  organizationId: string;
}

export const organizationDealSchema = z.object({
  id: z.string().uuid(),
  organizationId: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  iconUrl: z.string().url(),
  dealUrl: z.string().url(),
  dealType: z.string(),
  status: z.string(),
  boostConfig: z.object({
    pointsProjectId: z.string().optional(),
    pointsDetailId: z.string().optional(),
    pointsSeasonId: z.string().optional(),
    incentiveType: z.string(),
    incentiveName: z.string(),
    turtleBoostPct: z.number(),
  }).optional(),
});

const organizationDealsSchema = z.object({
  organization: z.object({
    id: z.string().uuid(),
    name: z.string(),
    description: z.string(),
    landingUrl: z.string().url(),
    iconUrl: z.string().url(),
    organizationType: z.string(),
  }),
  deals: z.array(organizationDealSchema),
});

export type OrganizationDealsResponse = z.infer<typeof organizationDealsSchema>;

export async function organizationDeals(
  options: OrganizationDealsOptions,
  config: Config,
): Promise<OrganizationDealsResponse> {
  const response = await doFetch(config, organizationDealsSchema, {
    path: `/partners/turtle/organizations/${options.organizationId}/deals`,
    type: "indexer",
  });

  return response;
}
