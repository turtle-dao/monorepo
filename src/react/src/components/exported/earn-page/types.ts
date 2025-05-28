import type { Address, Hex } from "viem";

export interface Transaction<Network> {
  from: Address;
  to: Address;
  data: Hex;
  chainId: Network;
  value?: bigint;
}

export interface EarnPageProps<Network extends number> {
  user: string | undefined;
  referral: string;
  campaignId?: string;
  network: Network;
  header?: {
    logo?: React.ReactNode;
    text?: React.ReactNode;
    extra?: React.ReactNode;
  };
  openConnectionModal: () => void;
  changeNetwork: (network: Network) => Promise<void>;
  signMessage: (message: string) => Promise<string>;
  sendTransaction: (transaction: Transaction<Network>) => Promise<string>;
  startSigning?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}
