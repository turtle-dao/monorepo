import { z } from "zod";

export const assetImageData = z.object({
  kind: z.literal("image"),
  url: z.string(),
  alt: z.string(),
});

export type AssetImageData = z.infer<typeof assetImageData>;

export const assetERC20Data = z.object({
  kind: z.literal("erc20"),
  address: z.string(),
  name: z.string(),
  symbol: z.string(),
  decimals: z.number(),
});

export type AssetERC20Data = z.infer<typeof assetERC20Data>;

export const assetData = z.discriminatedUnion("kind", [
  assetImageData,
  assetERC20Data,
]);

export type AssetData = z.infer<typeof assetData>;

export const asset = z.object({
  id: z.string().uuid(),
  name: z.string(),
  slugs: z.string().array(),
  tags: z.string().array(),
  description: z.string().nullable(),
  data: z.array(assetData),
});

export function getAssetImage(asset: Asset): AssetImageData | null {
  return asset.data.find(data => data.kind === "image") ?? null;
}

export type Asset = z.infer<typeof asset>;

export const defiData = z.object({
  apy: z.number(),
  apy_base: z.number(),
  apy_reward: z.number(),
  tvl: z.number(),
});

export type DefiData = z.infer<typeof defiData>;

export const token = z.object({
  address: z.string(),
  name: z.string(),
  symbol: z.string(),
  logos: z.array(z.string()),
  decimals: z.number(),
  chain: z.number(),
  price: z.number().nullable().optional(),
});

export type Token = z.infer<typeof token>;

export const defiMetadata = z.object({
  id: z.string().uuid(),
  name: z.string(),
  description: z.string(),
  iconUrl: z.string(),
});

export const defiToken = z.object({
  protocol: z.string(),
  token,
  underlying_tokens: z.array(token),
  metadata: defiMetadata,
  data: defiData,
});

export type DefiToken = z.infer<typeof defiToken>;

export const walletBalance = z.object({
  token,
  amount: z.string(),
});

export type WalletBalance = z.infer<typeof walletBalance>;
