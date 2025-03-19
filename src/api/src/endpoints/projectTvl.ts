import type { Config } from "../config";
import { z } from "zod";
import { doFetch } from "../fetch";

export interface ProjectTvlOptions {
  projects: string[];
}

const projectTvlSchema = z.object({
  projects: z.record(z.string(), z.object({
    tvl_usd: z.number(),
    asset_tvl_usd: z.number(),
    debt_tvl_usd: z.number(),
  })),
});

export type ProjectTvlResponse = z.infer<typeof projectTvlSchema>;

export async function projectTvl(
  { projects }: ProjectTvlOptions,
  config: Config,
): Promise<ProjectTvlResponse> {
  const response = await doFetch(config, projectTvlSchema, {
    path: `/tvl/projects?projects=${projects.join(",")}`,
    type: "indexer",
  });

  return response;
}
