"use client"

import type React from "react"
import { PrivyProvider } from "@privy-io/react-auth"
import { WagmiProvider, createConfig } from "@privy-io/wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { http } from "viem"
import { sepolia } from "viem/chains"

const config = createConfig({
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(),
  },
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
})

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrivyProvider
      appId="cmgu7lcos01dijy0dc3hd0x8q"
      config={{
        appearance: {
          theme: "light",
          accentColor: "#E879F9",
        },
        loginMethods: ["wallet", "email"],
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config} reconnectOnMount={false}>
          {children}
        </WagmiProvider>
      </QueryClientProvider>
    </PrivyProvider>
  )
}
