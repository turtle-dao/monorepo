import type { z, ZodType } from "zod";
import type { Config } from "./config";

export interface FetchOptions {
  path: string;
  body?: unknown;
  isJson?: boolean;
  type?: FetchType;
}

export type FetchType = "points" | "indexer" | "earn";

export async function doRawFetch(
  config: Config,
  {
    path,
    body,
    type = "points",
  }: FetchOptions,
): Promise<{
    data: string;
    response: Response;
  }> {
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

  return {
    data: await response.text(),
    response,
  };
}

export async function doFetch<Z extends ZodType>(
  config: Config,
  schema: Z,
  options: FetchOptions,
): Promise<z.infer<Z>> {
  const { data } = await doRawFetch(config, options);
  const isJson = options.isJson ?? true;

  if (isJson) {
    const json = JSON.parse(data);
    const result = await schema.safeParseAsync(json);

    if (!result.success) {
      throw new Error(`Failed to parse ${options.path}: ${result.error.message}`);
    }

    return result.data;
  }

  return data;
}

export function buildQueryString(
  options: Record<string, string | number | boolean | undefined>,
): string {
  return Object.entries(options)
    .filter(([, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
}
