import type { Config } from "../config";
import { z } from "zod";
import { doFetch } from "../fetch";

const organizationSchema = z.object({
  organizations: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      description: z.string(),
      landingUrl: z.string(),
      iconUrl: z.string(),
      organizationType: z.string(),
    }),
  ),
});

export type OrganizationResponse = z.infer<typeof organizationSchema>;

export async function organization(
  config: Config,
): Promise<OrganizationResponse> {
  const response = await doFetch(config, organizationSchema, {
    path: `/partners/turtle/organizations`,
    type: "indexer",
  });

  return response;
}
