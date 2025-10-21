import { sepolia } from "viem/chains"

export const privyConfig = {
  appId: "cmgu7lcos01dijy0dc3hd0x8q",
  config: {
    appearance: {
      theme: "light",
      accentColor: "#E879F9",
      logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polfavi-HHaseDjVt4LVJCXqdHkXhNZleJU7LV.png",
    },
    loginMethods: ["email", "wallet"],
    embeddedWallets: {
      createOnLogin: "users-without-wallets",
    },
  },
}

export const wagmiConfig = {
  chains: [sepolia],
}
