import * as rawChains from "viem/chains";
import * as chainlist from "./chainlist.json";

interface ChainlistItem {
  name: string;
  chain: string;
  rpc: string[];
  shortName: string;
  chainId: number;
  icon?: string;
  chainSlug?: string;
}

export const chains: Record<number, rawChains.Chain> = Object.fromEntries(
  Object.entries(rawChains).map(([_, value]) => [value.id, value]),
);

export const chainlistItems: Record<number, ChainlistItem> = Object.fromEntries(
  Array.from((chainlist as any).default).map((value: any) => [value.chainId, value]),
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

export function txExplorerName(chainId: number): string {
  const chain = getChainById(chainId);
  return chain?.blockExplorers?.default.name ?? "Etherscan";
}

export function chainName(chainId: number): string {
  const chain = getChainById(chainId);
  return chain?.name ?? "Unknown Chain";
}

export function chainLogo(chainId: number): string {
  const chain = chainlistItems[chainId];
  return `https://icons.llamao.fi/icons/chains/rsz_${chain?.icon ?? chain?.chainSlug ?? chain?.shortName}.jpg`;
}
