"use client"

import { useState } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { useReadContract } from "wagmi"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, Gift, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CONTRACTS, NFT_ABI, AIRDROP_ABI } from "@/lib/contracts"

export default function AirdropPage() {
  const { ready, authenticated, login, user } = usePrivy()
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [claimed, setClaimed] = useState(false)

  // Check if user has any NFTs
  const { data: nftBalance } = useReadContract({
    address: CONTRACTS.STILL_TOGETHER_NFT,
    abi: NFT_ABI,
    functionName: "balanceOf",
    args: user?.wallet?.address ? [user.wallet.address as `0x${string}`] : undefined,
  })

  // Get claimable amount
  const { data: claimableAmount } = useReadContract({
    address: CONTRACTS.AIRDROP_VAULT,
    abi: AIRDROP_ABI,
    functionName: "getClaimableAmount",
    args: user?.wallet?.address ? [user.wallet.address as `0x${string}`] : undefined,
  })

  const hasNFT = nftBalance && Number(nftBalance) > 0
  const canClaim = claimableAmount && Number(claimableAmount) > 0

  const handleClaim = async () => {
    if (!authenticated) {
      login()
      return
    }

    setLoading(true)
    try {
      // TODO: Implement actual claim transaction
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setClaimed(true)
      toast({
        title: "Airdrop Claimed!",
        description: "Your STAY tokens have been sent to your wallet",
      })
    } catch (error) {
      toast({
        title: "Claim Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-bold">$STAY Airdrop</h1>
            <p className="text-muted-foreground">Claim your rewards based on your NFT tier</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gift className="w-6 h-6 text-primary" />
                Airdrop Eligibility
              </CardTitle>
              <CardDescription>Hold a Proof of Love NFT to be eligible for airdrop rewards</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!ready && (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mt-2">Loading...</p>
                </div>
              )}

              {ready && !authenticated && (
                <div className="text-center py-8 space-y-4">
                  <p className="text-muted-foreground">Connect your wallet to check eligibility</p>
                  <Button onClick={login} size="lg">
                    Connect Wallet
                  </Button>
                </div>
              )}

              {ready && authenticated && (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">NFT Ownership</p>
                        <p className="text-sm text-muted-foreground">
                          {hasNFT ? `You own ${Number(nftBalance)} NFT(s)` : "No NFTs found"}
                        </p>
                      </div>
                      {hasNFT && <CheckCircle2 className="w-6 h-6 text-green-500" />}
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">Claimable Amount</p>
                        <p className="text-sm text-muted-foreground">
                          {canClaim ? `${Number(claimableAmount) / 1e18} $STAY` : "0 $STAY"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {!hasNFT && (
                    <div className="text-center py-4 space-y-2">
                      <p className="text-muted-foreground">
                        You need to own a Proof of Love NFT to claim airdrop rewards
                      </p>
                      <Button asChild variant="outline">
                        <a href="/nft">View NFT Gallery</a>
                      </Button>
                    </div>
                  )}

                  {hasNFT && !canClaim && !claimed && (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">No claimable rewards available at this time</p>
                    </div>
                  )}

                  {hasNFT && canClaim && !claimed && (
                    <Button onClick={handleClaim} disabled={loading} className="w-full" size="lg">
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                          Claiming...
                        </>
                      ) : (
                        <>
                          <Gift className="w-4 h-4 mr-2" />
                          Claim Airdrop
                        </>
                      )}
                    </Button>
                  )}

                  {claimed && (
                    <div className="text-center py-8 space-y-4">
                      <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
                      <div>
                        <h3 className="text-2xl font-bold">Airdrop Claimed!</h3>
                        <p className="text-muted-foreground mt-2">Your tokens have been sent to your wallet</p>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Reward Tiers Info */}
          <Card>
            <CardHeader>
              <CardTitle>Reward Tiers</CardTitle>
              <CardDescription>Airdrop amounts based on NFT tier</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">Bronze Tier (30 days)</span>
                  <span className="text-primary font-bold">5% of locked amount</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">Silver Tier (90 days)</span>
                  <span className="text-secondary font-bold">10% of locked amount</span>
                </div>
                <div className="flex justify-between items-center p-3 rounded-lg bg-muted">
                  <span className="font-medium">Gold Tier (180 days)</span>
                  <span className="text-accent font-bold">20% of locked amount</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}
