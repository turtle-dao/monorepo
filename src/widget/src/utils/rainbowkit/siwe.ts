import type { AuthenticationStatus } from "@rainbow-me/rainbowkit";
// eslint-disable-next-line unicorn/prefer-node-protocol
import { Buffer } from "buffer";
import { createAuthenticationAdapter } from "@rainbow-me/rainbowkit";
import { createSiweMessage, generateSiweNonce } from "viem/siwe";
import { useAccount } from "wagmi";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";
// import { pointsApi } from "@/shared/api/points/api";
// import { ethz, log } from "@/shared/utils";

const statement = `
Turtle Membership Agreement, by signing this agreement, you acknowledge and agree to the following terms and conditions governing your membership in Turtle found at: https://turtle.club/terms
`.trim();

interface AuthenticationStore {
  jwts: Record<string, string>;
  nonce: number;
}

export const authenticationStore = create(
  persist(
    () =>
      ({
        jwts: {},
        active: null,
        nonce: 0,
      }) as AuthenticationStore,
    { name: "turtle:siwe" },
  ),
);

export const authenticationAdapter = createAuthenticationAdapter({
  getNonce: async () => {
    return generateSiweNonce();
  },

  createMessage: ({ nonce, address, chainId }) => {
    return createSiweMessage({
      version: "1",
      domain: window.location.host,
      uri: window.location.origin,
      address,
      chainId,
      nonce,
      statement,
    });
  },

  verify: async () => {
    return true;
  },

  signOut: async () => {},
});

export function useAuthenticationStatus(): AuthenticationStatus {
  const { address } = useAccount();
  const { jwts } = authenticationStore();

  if (!address)
    return "loading";

  return jwts[address.toLocaleLowerCase()] ? "authenticated" : "unauthenticated";
}

export function useAuthentication(): string | null {
  const { address } = useAccount();
  const { jwts } = authenticationStore();

  if (!address)
    return null;

  return jwts[address.toLocaleLowerCase()] ?? null;
}
