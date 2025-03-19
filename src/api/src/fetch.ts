import type { z, ZodType } from "zod";
import type { Config } from "./config";

export interface FetchOptions {
  path: string;
  body?: unknown;
  isJson?: boolean;
  type?: FetchType;
}

export type FetchType = "points" | "indexer";

export async function doFetch<Z extends ZodType>(
  config: Config,
  schema: Z,
  {
    path,
    body,
    isJson = true,
    type = "points",
  }: FetchOptions,
): Promise<z.infer<Z>> {
  const url = `${config[`${type}Endpoint`]}${path}`;

  const response = await fetch(url.toString(), {
    method: body ? "POST" : "GET",
    body: body ? JSON.stringify(body) : undefined,
    headers: body
      ? {
          "Content-Type": "application/json",
        }
      : undefined,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url.toString()}: ${response.statusText}`);
  }

  if (isJson) {
    const json = await response.json();
    const result = await schema.safeParseAsync(json);

    if (!result.success) {
      throw new Error(`Failed to parse ${url.toString()}: ${result.error.message}`);
    }

    return result.data;
  }

  return response.text();
}
