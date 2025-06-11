import type { Address } from "viem";
import {
  darkTheme,
  RainbowKitAuthenticationProvider,
  RainbowKitProvider,
  useConnectModal,
} from "@rainbow-me/rainbowkit";
import { watchAccount } from "@wagmi/core";
import { type JSX, type PropsWithChildren, useEffect, useReducer, useState } from "react";
import { useConfig } from "wagmi";
import { authenticationAdapter, useAuthenticationStatus } from "./siwe";

export function EthProvider({ children }: PropsWithChildren): JSX.Element {
  const status = useAuthenticationStatus();
  // TODO: Manage SIWE logic with new auth endpoints
  return (
    <RainbowKitAuthenticationProvider adapter={authenticationAdapter} status={status}>
      <RainbowKitProvider
        theme={darkTheme({
          ...darkTheme.accentColors.green,
        })}
      >
        <SIWEWatcher />

        {children}
      </RainbowKitProvider>
    </RainbowKitAuthenticationProvider>
  );
}

function SIWEWatcher(): JSX.Element | null {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const [user] = useState({ address: null as Address | null });
  const [shouldOpen, setShouldOpen] = useState(false);

  const config = useConfig();
  const { openConnectModal, connectModalOpen } = useConnectModal();
  const status = useAuthenticationStatus();

  useEffect(() => {
    return watchAccount(config as any, {
      onChange(data) {
        if (user.address && !data.address) {
          user.address = null;
          forceUpdate();
          return;
        }

        if (data.isConnecting)
          return;

        if (!data.address || user.address === data.address)
          return;

        user.address = data.address;
        forceUpdate();
      },
    });
  }, [config, user]);

  useEffect(() => {
    if (!user.address || status !== "unauthenticated")
      return;

    setShouldOpen(true);
  }, [user.address, status]);

  useEffect(() => {
    if (!openConnectModal || !shouldOpen)
      return;

    const interval = setInterval(() => {
      openConnectModal?.();
    }, 100);

    return () => {
      clearInterval(interval);
      setShouldOpen(false);
    };
  }, [shouldOpen, connectModalOpen, openConnectModal]);

  return null;
}
