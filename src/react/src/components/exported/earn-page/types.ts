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
  network: Network;
  headerLogo?: React.ReactNode;
  headerText?: React.ReactNode;
  headerExtra?: React.ReactNode;
  openConnectionModal: () => void;
  signMessage: (message: string) => Promise<string>;
  sendTransaction: (transaction: Transaction<Network>) => Promise<string>;
  startSigning?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}
