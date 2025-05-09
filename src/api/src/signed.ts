import type { Config } from "./config";
import { hexToBytes } from "viem";
import { z, type ZodType } from "zod";
import { doRawFetch } from "./fetch";

// eslint-disable-next-line ts/explicit-function-return-type
export function signed<Z extends ZodType>(
  schema: Z,
) {
  return z.object({
    data: schema,
    exp: z.number(),
  });
}

const publicKey = "0x5916598584bc64d5f35076cdfe228211e8b0a07e6f026355f33f253b80531f56";
const signatureHeader = "X-Signature";

export async function fetchSigned<Z extends ZodType>(
  config: Config,
  schema: Z,
  options: Parameters<typeof doRawFetch>[1],
): Promise<z.infer<Z>> {
  const { data, response } = await doRawFetch(config, options);
  const signature = response.headers.get(signatureHeader);

  if (!signature) {
    throw new Error(`Signature header not found for ${options.path}`);
  }

  if (!await verifySignature(data, signature)) {
    throw new Error(`Signature verification failed for ${options.path}`);
  }

  const signedDataSchema = signed(schema);
  const signedDataResult = await signedDataSchema.safeParseAsync(JSON.parse(data));

  if (!signedDataResult.success) {
    throw new Error(`Invalid signed data for ${options.path}: ${signedDataResult.error.message}`);
  }

  if (signedDataResult.data.exp < Date.now()) {
    throw new Error(`Signature expired for ${options.path}`);
  }

  return signedDataResult.data.data;
}

async function verifySignature(data: string, signature: string): Promise<boolean> {
  let dataBytes = new TextEncoder().encode(data);
  let signatureBytes = hexToBytes(`0x${signature}`);
  let publicKeyBytes = hexToBytes(publicKey);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    publicKeyBytes,
    { name: "Ed25519" },
    true,
    ["verify"],
  );

  const isValid = await crypto.subtle.verify(
    { name: "Ed25519" },
    cryptoKey,
    signatureBytes,
    dataBytes,
  );

  return isValid;
}
