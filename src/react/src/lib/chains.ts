import * as rawChains from "viem/chains";

export const chains: Record<number, rawChains.Chain> = Object.fromEntries(
  Object.entries(rawChains).map(([_, value]) => [value.id, value]),
);

const chainNames: Record<string, rawChains.Chain> = Object.fromEntries(
  Object.entries(rawChains).map(([_, value]) => [value.name, value]),
);

export function getChainById(id: number): rawChains.Chain | undefined {
  return chains[id];
}

export function getChainByName(name: string): rawChains.Chain | undefined {
  return chainNames[name];
}

export function addressExplorer(address: string, chainId: number): string {
  const chain = getChainById(chainId);
  return `${chain?.blockExplorers?.default.url ?? "no-explorer"}/address/${address}`;
}

export function txExplorer(txHash: string, chainId: number): string {
  const chain = getChainById(chainId);
  return `${chain?.blockExplorers?.default.url ?? "no-explorer"}/tx/${txHash}`;
}
