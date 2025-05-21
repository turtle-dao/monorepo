import type { Transaction } from "../types";
import type { Adapter, Network } from "./type";
import { sendTransaction, waitForTransactionReceipt } from "@wagmi/core";
import { useChainId, useConfig, useSignMessage } from "wagmi";

export function useWagmiAdapter(): Adapter {
  const chainId = useChainId();
  const config = useConfig();
  const { signMessageAsync } = useSignMessage();

  const signMessage = async (message: string): Promise<string> => {
    const signature = await signMessageAsync({ message });
    return signature;
  };

  const sendTx = async (transaction: Transaction<Network>): Promise<string> => {
    const tx = await sendTransaction(config, transaction);
    const receipt = await waitForTransactionReceipt(config, {
      ...config,
      hash: tx,
      confirmations: 1,
      pollingInterval: 1000,
    });

    return receipt.transactionHash;
  };

  return {
    network: chainId,
    sendTransaction: sendTx,
    signMessage,
  };
}
