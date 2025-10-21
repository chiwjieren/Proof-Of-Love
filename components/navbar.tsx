"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Wallet } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")

  const connectWallet = () => {
    // Mock wallet connection
    setIsConnected(true)
    setAddress("0x1234...5678")
  }

  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 animate-pulse-glow">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polfavi-HHaseDjVt4LVJCXqdHkXhNZleJU7LV.png"
                alt="Proof of Love"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Proof of Love
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link href="/vault" className="text-sm font-medium hover:text-primary transition-colors">
              Vaults
            </Link>
            <Link href="/token" className="text-sm font-medium hover:text-primary transition-colors">
              Buy Tokens
            </Link>
            <Link href="/nft" className="text-sm font-medium hover:text-primary transition-colors">
              NFT Gallery
            </Link>
          </div>

          <div className="flex items-center gap-3">
            {isConnected ? (
              <Button variant="outline" className="gap-2 bg-transparent">
                <Wallet className="w-4 h-4" />
                <span className="font-mono text-sm">{address}</span>
              </Button>
            ) : (
              <Button
                onClick={connectWallet}
                className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                <Wallet className="w-4 h-4" />
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
