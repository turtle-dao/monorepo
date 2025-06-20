import type { DealFormatted } from "@/App";
import { atom } from "jotai";

// UI
export const showPanelAtom = atom<boolean>(false);

// Distributor Id
export const distributorIdAtom = atom<string>("");

// Deposit data and chain
export const selectedChainAtom = atom<string>("");

export const dealSelectedAtom = atom<DealFormatted | null>(null);
export const depositDetailsAtom = atom<{
  amount: string;
  tokenAddress: string;
  tokenDecimals: number;
  chain: string;
}>({
  amount: "",
  tokenAddress: "",
  tokenDecimals: 0,
  chain: "",
});
