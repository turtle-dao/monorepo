import { darkTheme, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { WagmiProvider } from "wagmi";
import App from "./App";
import { config } from "./config/wagmi";
import { createIDBPersister } from "./utils/tanstack/persister";
import "./styles/index.css";
import "./styles/gradients.css";

// Configure QueryClient with performance optimizations
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 5 * 60 * 1000, // 5 minutes
      staleTime: 30000, // 30 seconds
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
      retry: 1, // Reduce retry attempts
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  },
});

// Create persister with performance optimizations
const persister = createIDBPersister("turtle");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <WagmiProvider config={config}>
        <RainbowKitProvider
          theme={darkTheme({
            ...darkTheme.accentColors.green,
          })}
        >
          {/* TODO: Add SIWE support with new endpoints */}
          <App />
        </RainbowKitProvider>
      </WagmiProvider>
    </PersistQueryClientProvider>
  </StrictMode>,
);
