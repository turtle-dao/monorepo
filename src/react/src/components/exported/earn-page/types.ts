import type { Address, Hex } from "viem";

export interface Transaction {
  from: Address;
  to: Address;
  data: Hex;
  chainId: number;
  value?: string;
}

export interface EarnPageProps {
  user: string | undefined;
  referral: string;
  network?: string;
  headerLogo?: React.ReactNode;
  headerText?: React.ReactNode;
  headerExtra?: React.ReactNode;
  openConnectionModal: () => void;
  signMessage: (message: string) => Promise<string>;
  sendTransaction: (transaction: Transaction) => Promise<string>;
  startSigning?: () => void;
  onError?: (error: Error) => void;
  onSuccess?: () => void;
}
