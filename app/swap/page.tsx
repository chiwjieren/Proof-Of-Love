"use client"

import { useState } from "react"
import { usePrivy } from "@privy-io/react-auth"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightLeft, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SwapPage() {
  const { ready, authenticated, login } = usePrivy()
  const { toast } = useToast()
  const [ethAmount, setEthAmount] = useState("")
  const [myrAmount, setMyrAmount] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEthSwap = async () => {
    if (!authenticated) {
      login()
      return
    }

    setLoading(true)
    try {
      // TODO: Implement actual swap logic with smart contract
      await new Promise((resolve) => setTimeout(resolve, 2000))
      toast({
        title: "Swap Successful",
        description: `Swapped ${ethAmount} ETH for STAY tokens`,
      })
      setEthAmount("")
    } catch (error) {
      toast({
        title: "Swap Failed",
        description: "Please try again",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePayNetSwap = async () => {
    if (!authenticated) {
      login()
      return
    }

    setLoading(true)
    try {
      // Call PayNet API placeholder
      const response = await fetch("/api/paynet/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: myrAmount }),
      })
      const data = await response.json()

      toast({
        title: "PayNet Payment Initiated",
        description: "Redirecting to payment gateway...",
      })
      setMyrAmount("")
    } catch (error) {
      toast({
        title: "Payment Failed",
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
            <h1 className="text-4xl font-bold">Swap Tokens</h1>
            <p className="text-muted-foreground">Exchange ETH or MYR for $STAY tokens</p>
          </div>

          <Tabs defaultValue="eth" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="eth">ETH Swap</TabsTrigger>
              <TabsTrigger value="paynet">PayNet (MYR)</TabsTrigger>
            </TabsList>

            <TabsContent value="eth">
              <Card>
                <CardHeader>
                  <CardTitle>Swap ETH for $STAY</CardTitle>
                  <CardDescription>Exchange your ETH directly for STAY tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="eth-amount">ETH Amount</Label>
                    <Input
                      id="eth-amount"
                      type="number"
                      placeholder="0.0"
                      value={ethAmount}
                      onChange={(e) => setEthAmount(e.target.value)}
                      step="0.001"
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRightLeft className="w-6 h-6 text-muted-foreground" />
                  </div>

                  <div className="space-y-2">
                    <Label>You will receive (estimated)</Label>
                    <div className="text-2xl font-bold">
                      {ethAmount ? (Number.parseFloat(ethAmount) * 1000).toFixed(2) : "0.00"} $STAY
                    </div>
                  </div>

                  <Button onClick={handleEthSwap} disabled={!ethAmount || loading} className="w-full" size="lg">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Swapping...
                      </>
                    ) : (
                      "Swap Now"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="paynet">
              <Card>
                <CardHeader>
                  <CardTitle>Pay with PayNet (MYR)</CardTitle>
                  <CardDescription>Use Malaysian Ringgit to purchase STAY tokens</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="myr-amount">MYR Amount</Label>
                    <Input
                      id="myr-amount"
                      type="number"
                      placeholder="0.00"
                      value={myrAmount}
                      onChange={(e) => setMyrAmount(e.target.value)}
                      step="1"
                    />
                  </div>

                  <div className="flex items-center justify-center">
                    <ArrowRightLeft className="w-6 h-6 text-muted-foreground" />
                  </div>

                  <div className="space-y-2">
                    <Label>You will receive (estimated)</Label>
                    <div className="text-2xl font-bold">
                      {myrAmount ? (Number.parseFloat(myrAmount) * 10).toFixed(2) : "0.00"} $STAY
                    </div>
                  </div>

                  <Button onClick={handlePayNetSwap} disabled={!myrAmount || loading} className="w-full" size="lg">
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Pay with PayNet"
                    )}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
