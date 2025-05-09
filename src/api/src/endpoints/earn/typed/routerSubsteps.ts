import { z } from "zod";
import { asset, token } from "./generic";

export const swapSubstep = z.object({
  kind: z.literal("swap"),
  from: z.array(token),
  to: z.array(token),
  protocol: z.string(),
  protocol_asset: asset.nullable(),
  price_impact: z.number().nullable(),
});

export type SwapSubstep = z.infer<typeof swapSubstep>;

export const depositSubstep = z.object({
  kind: z.literal("deposit"),
  vault: z.string(),
  from: z.array(token),
  to: z.array(token),
  amount: z.string(),
  protocol: z.string(),
  protocol_asset: asset.nullable(),
  price_impact: z.number().nullable(),
});

export type DepositSubstep = z.infer<typeof depositSubstep>;

export const routerSubstep = z.discriminatedUnion("kind", [
  swapSubstep,
  depositSubstep,
]);

export type RouterSubstep = z.infer<typeof routerSubstep>;
