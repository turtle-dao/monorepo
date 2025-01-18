import type { z, ZodType } from "zod";
import type { Config } from "./config";

export interface FetchOptions {
  path: string;
  body?: unknown;
  isJson?: boolean;
}

export async function doFetch<Z extends ZodType>(
  config: Config,
  schema: Z,
  { path, body, isJson = true }: FetchOptions,
): Promise<z.infer<Z>> {
  const url = `${config.endpoint}${path}`;

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

    return schema.parse(json);
  }

  return response.text();
}
