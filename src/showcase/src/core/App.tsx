import { CodeblockProvider } from "@/components/ui/codeblock";
import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TurtleProvider } from "@turtledev/react";
import { WagmiProvider } from "wagmi";
import { config } from "../lib/eth";
import { Router } from "./router";
import "@rainbow-me/rainbowkit/styles.css";
import "react-color-palette/css";

const queryClient = new QueryClient();

function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <CodeblockProvider>
        <WagmiProvider config={config}>
          <RainbowKitProvider theme={darkTheme()}>
            <TurtleProvider>
              <Router />
            </TurtleProvider>
          </RainbowKitProvider>
        </WagmiProvider>
      </CodeblockProvider>
    </QueryClientProvider>
  );
}

export default App;
