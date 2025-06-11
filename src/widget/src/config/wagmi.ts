import binanceWallet from "@binance/w3w-rainbow-connector-v2";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  frameWallet,
  injectedWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { createConfig, http } from "wagmi";
import {
  arbitrum,
  avalanche,
  base,
  blast,
  boba,
  bsc,
  celo,
  fantom,
  fraxtal,
  gnosis,
  immutableZkEvm,
  linea,
  mainnet,
  metis,
  optimism,
  polygon,
  scroll,
  sepolia,
  zkSync,
} from "wagmi/chains";
import { siteInfo } from "./siteInfo";

export const projectId = "dcfae733a695b623e67135bca7e13f59";

// Get the current URL without trailing slash
function getBaseUrl(): string {
  if (typeof window === "undefined")
    return "";
  const url = window.location.origin;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, injectedWallet, walletConnectWallet],
    },
    {
      groupName: "More",
      wallets: [rabbyWallet, frameWallet, rainbowWallet, trustWallet, coinbaseWallet, binanceWallet],
    },
  ],
  {
    appName: siteInfo.title,
    projectId,
    appUrl: getBaseUrl(),
  },
);

export const config = createConfig({
  connectors,
  chains: [
    arbitrum,
    avalanche,
    base,
    blast,
    boba,
    bsc,
    celo,
    fantom,
    fraxtal,
    gnosis,
    immutableZkEvm,
    linea,
    mainnet,
    metis,
    optimism,
    polygon,
    scroll,
    sepolia,
    zkSync,
  ],
  multiInjectedProviderDiscovery: true,
  syncConnectedChain: true,
  batch: {
    multicall: true,
  },
  transports: {
    [arbitrum.id]: http("https://arbitrum-one-rpc.publicnode.com"),
    [avalanche.id]: http("https://avalanche.public-rpc.com"),
    [base.id]: http("https://base-rpc.publicnode.com"),
    [blast.id]: http("https://blast-rpc.publicnode.com"),
    [boba.id]: http("https://mainnet.boba.network"),
    [bsc.id]: http("https://bsc-dataseed.bnbchain.org"),
    [celo.id]: http("https://forno.celo.org"),
    [fantom.id]: http("https://rpc.ftm.tools"),
    [fraxtal.id]: http("https://rpc.frax.com"),
    [gnosis.id]: http("https://gnosis-rpc.publicnode.com"),
    [immutableZkEvm.id]: http("https://rpc.immutable.com"),
    [linea.id]: http("https://rpc.linea.build"),
    [mainnet.id]: http(import.meta.env.VITE_LOCAL_NODE || "https://ethereum-rpc.publicnode.com"),
    [metis.id]: http("https://metis.drpc.org"),
    [optimism.id]: http("https://optimism-rpc.publicnode.com"),
    [polygon.id]: http("https://polygon-bor-rpc.publicnode.com"),
    [scroll.id]: http("https://scroll.public-rpc.com"),
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    [zkSync.id]: http("https://mainnet.era.zksync.io"),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
