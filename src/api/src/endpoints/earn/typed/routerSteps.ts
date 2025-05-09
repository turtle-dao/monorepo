import { z } from "zod";
import { asset, token } from "./generic";
import { routerSubstep } from "./routerSubsteps";

export const stepTx = z.object({
  from: z.string(),
  to: z.string(),
  data: z.string(),
  value: z.string(),
  gas: z.number(),
});

export type StepTx = z.infer<typeof stepTx>;

export const approveStep = z.object({
  kind: z.literal("approve"),
  owner: z.string(),
  spender: z.string(),
  token,
  amount: z.string(),
  tx: stepTx,
});

export type ApproveStep = z.infer<typeof approveStep>;

export const ensoStep = z.object({
  kind: z.literal("enso"),
  substeps: z.array(routerSubstep),
  tx: stepTx,
  asset: asset.nullable(),
});

export type EnsoStep = z.infer<typeof ensoStep>;

export const routerStep = z.discriminatedUnion("kind", [
  approveStep,
  ensoStep,
]);

export type RouterStep = z.infer<typeof routerStep>;
