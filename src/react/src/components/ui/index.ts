import type { RecipeVariants } from "@vanilla-extract/recipes";
import type { PropsWithChildren } from "react";

export type WithChildren<T> = PropsWithChildren<Omit<T, "children">>;

export type AsChild<T> = {
  asChild?: boolean;
} & T;

type ClassName = string | undefined | null | false;

export function clsx(...classes: ClassName[]): string {
  return classes.filter(Boolean).join(" ");
}

export function pick<
  Object extends Record<string, unknown>,
  const VariantKey extends keyof Object,
>(
  props: Object,
  keys: { variants: () => VariantKey[] },
): Pick<Object, VariantKey> {
  return keys.variants().reduce((acc, key) => {
    acc[key] = props[key];
    return acc;
  }, {} as {
    [K in VariantKey]: Object[K];
  });
}
