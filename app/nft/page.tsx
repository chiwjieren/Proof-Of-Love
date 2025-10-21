"use client"

import { useState } from "react"
import Image from "next/image"
import { usePrivy } from "@privy-io/react-auth"
import { useReadContract } from "wagmi"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, CheckCircle2, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CONTRACTS, NFT_ABI } from "@/lib/contracts"

const NFT_TIERS = [
  {
    id: 1,
    name: "Bronze Tier",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tier1-NBLft5r5XaDRROUYTFLyRI7kQSbsKt.jpg",
    days: 30,
    reward: "5%",
    color: "primary",
  },
  {
    id: 2,
    name: "Silver Tier",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tier2-xSa8gq2RS9bygFOdQjvltINzJ9MfEG.jpg",
    days: 90,
    reward: "10%",
    color: "secondary",
  },
  {
    id: 3,
    name: "Gold Tier",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tier3-rrk5OdIWrh8eB7SgWtvRk4oE0tqHrU.jpg",
    days: 180,
    reward: "20%",
    color: "accent",
  },
]

export default function NFTPage() {
  const { ready, authenticated, login, user } = usePrivy()
  const { toast } = useToast()
  const [claimingTier, setClaimingTier] = useState<number | null>(null)

  // Check if user has any NFTs
  const { data: nftBalance } = useReadContract({
    address: CONTRACTS.STILL_TOGETHER_NFT,
    abi: NFT_ABI,
    functionName: "balanceOf",
    args: user?.wallet?.address ? [user.wallet.address as `0x${string}`] : undefined,
  })

  const handleClaim = async (tierId: number) => {
    if (!authenticated) {
      login()
      return
    }

    setClaimingTier(tierId)
    try {
      // TODO: Implement actual NFT claim transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "NFT Claimed!",
        description: `You've successfully claimed the ${NFT_TIERS[tierId - 1].name} NFT`,
      })
    } catch (error) {
      toast({
        title: "Claim Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setClaimingTier(null)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                NFT Gallery
              </span>
            </h1>
            <p className="text-muted-foreground">Earn exclusive NFTs as you reach commitment milestones</p>
          </div>

          {!ready && (
            <div className="text-center py-12">
              <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
            </div>
          )}

          {ready && !authenticated && (
            <Card>
              <CardContent className="text-center py-12 space-y-4">
                <p className="text-muted-foreground">Connect your wallet to view and claim NFTs</p>
                <Button onClick={login} size="lg">
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          )}

          {ready && authenticated && (
            <>
              {/* Tier Cards */}
              <div className="grid md:grid-cols-3 gap-6">
                {NFT_TIERS.map((tier) => (
                  <Card key={tier.id} className="border-2">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <Badge variant="outline">{tier.name}</Badge>
                        <Trophy className={`w-5 h-5 text-${tier.color}`} />
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="aspect-square rounded-lg overflow-hidden border">
                        <Image
                          src={tier.image || "/placeholder.svg"}
                          alt={tier.name}
                          width={400}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="space-y-3">
                        <div className="text-center">
                          <h3 className="text-xl font-bold">{tier.name}</h3>
                        </div>

                        <div className="space-y-2 bg-muted p-3 rounded-lg text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Lock Period</span>
                            <span className="font-medium">{tier.days} Days</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Airdrop Reward</span>
                            <span className={`font-bold text-${tier.color}`}>{tier.reward}</span>
                          </div>
                        </div>

                        <Button
                          onClick={() => handleClaim(tier.id)}
                          disabled={claimingTier === tier.id}
                          className="w-full"
                          variant="outline"
                        >
                          {claimingTier === tier.id ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Claiming...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4 mr-2" />
                              Claim NFT
                            </>
                          )}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* My Collection */}
              <Card>
                <CardHeader>
                  <CardTitle>My Collection</CardTitle>
                  <CardDescription>
                    {nftBalance && Number(nftBalance) > 0
                      ? `You own ${Number(nftBalance)} NFT(s)`
                      : "No NFTs in your collection yet"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {!nftBalance || Number(nftBalance) === 0 ? (
                    <div className="text-center py-12 space-y-4">
                      <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                        <Trophy className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold">No NFTs Yet</h3>
                        <p className="text-muted-foreground">Lock tokens with your partner to start earning NFTs</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {/* Display owned NFTs here */}
                      <div className="text-center text-muted-foreground">NFT display coming soon</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
