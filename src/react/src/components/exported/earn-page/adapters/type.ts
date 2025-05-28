import type { useConfig } from "wagmi";
import type { Transaction } from "../types";

export type Config = ReturnType<typeof useConfig>;

export type Network = Config["chains"][number]["id"];

export interface Adapter {
  network: Network;
  sendTransaction: (transaction: Transaction<Network>) => Promise<string>;
  signMessage: (message: string) => Promise<string>;
  changeNetwork: (network: Network) => Promise<void>;
}
