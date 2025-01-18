import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TurtleProvider } from "@turtle/react";
import { WagmiProvider } from "wagmi";
import { config } from "./eth";
import Home from "./Home";
import "@rainbow-me/rainbowkit/styles.css";

const queryClient = new QueryClient();
const theme = darkTheme();

function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <RainbowKitProvider theme={theme}>
          <TurtleProvider>
            <Home />
          </TurtleProvider>
        </RainbowKitProvider>
      </WagmiProvider>
    </QueryClientProvider>
  );
}

export default App;
