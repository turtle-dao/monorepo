import type { Config } from "../config";
import { z } from "zod";
import { doFetch } from "../fetch";

export interface ExistsOptions {
  user: string;
}

const existsSchema = z.boolean();

export async function exists(
  { user }: ExistsOptions,
  config: Config,
): Promise<boolean> {
  const response = await doFetch(config, existsSchema, {
    path: `/user/${user}/exists`,
  });

  return response;
}
