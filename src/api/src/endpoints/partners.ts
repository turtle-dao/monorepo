import type { Config } from "../config";
import { z } from "zod";
import { doFetch } from "../fetch";

const partnersSchema = z.object({
  partners: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      description: z.string(),
      landing_url: z.string(),
      type: z.string(),
    }),
  ),
});

export type PartnersResponse = z.infer<typeof partnersSchema>;

export async function partners(
  config: Config,
): Promise<PartnersResponse> {
  const response = await doFetch(config, partnersSchema, {
    path: `/partners/turtle/partners`,
    type: "indexer",
  });

  return response;
}
