import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { base, linea, mainnet, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Turtle Preview",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, sepolia, linea, base],
  transports: {
    [mainnet.id]: http("https://ethereum-rpc.publicnode.com"),
    [sepolia.id]: http("https://ethereum-sepolia-rpc.publicnode.com"),
    [linea.id]: http("https://linea-rpc.publicnode.com"),
    [base.id]: http("https://base-rpc.publicnode.com"),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
