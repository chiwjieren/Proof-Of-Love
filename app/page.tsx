"use client"

import Link from "next/link"
import Image from "next/image"
import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ArrowRightLeft } from "lucide-react"

export default function HomePage() {
  const { ready, authenticated, login } = usePrivy()

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polfavi-HHaseDjVt4LVJCXqdHkXhNZleJU7LV.png"
                alt="Proof of Love"
                width={120}
                height={120}
                className="mx-auto"
              />
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                Proof of Love
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Lock your commitment on the blockchain and earn exclusive NFTs
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              {!authenticated ? (
                <Button onClick={login} size="lg" className="gap-2">
                  <Heart className="w-5 h-5" />
                  Connect Wallet
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="gap-2">
                    <Link href="/swap">
                      <ArrowRightLeft className="w-5 h-5" />
                      Swap Tokens
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="gap-2 bg-transparent">
                    <Link href="/nft">View NFTs</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <ArrowRightLeft className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Swap Tokens</h3>
                  <p className="text-muted-foreground">Exchange ETH for $STAY tokens or use PayNet for MYR payments</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/swap">Go to Swap</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Heart className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-2xl font-bold">Earn NFTs</h3>
                  <p className="text-muted-foreground">Lock tokens and earn exclusive NFT tiers with airdrop rewards</p>
                  <Button asChild variant="outline" className="w-full bg-transparent">
                    <Link href="/nft">View Gallery</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
