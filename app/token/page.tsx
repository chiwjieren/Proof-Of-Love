"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Coins, ArrowRight, CheckCircle2 } from "lucide-react"
import { TransactionModal } from "@/components/transaction-modal"

export default function TokenPage() {
  const [ethAmount, setEthAmount] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const stayAmount = ethAmount ? (Number.parseFloat(ethAmount) * 1000).toFixed(2) : "0"

  const handleBuy = () => {
    setShowModal(true)
    setCurrentStep(0)

    // Simulate transaction steps
    setTimeout(() => setCurrentStep(1), 2000)
    setTimeout(() => setCurrentStep(2), 4000)
    setTimeout(() => setCurrentStep(3), 6000)
  }

  const steps = [
    { title: "Connect Wallet", status: currentStep >= 1 ? "success" : "pending" },
    { title: "Approve Transaction", status: currentStep >= 2 ? "success" : "pending" },
    { title: "Processing Purchase", status: currentStep >= 3 ? "success" : "pending" },
    { title: "Tokens Received", status: currentStep >= 4 ? "success" : "pending" },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Buy STAY Tokens
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">Purchase tokens to lock in your love vault</p>
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Your Balance</p>
                  <p className="text-3xl font-bold">0 STAY</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">Exchange Rate</p>
                  <p className="text-3xl font-bold">1:1000</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center space-y-2">
                  <p className="text-sm text-muted-foreground">ETH Balance</p>
                  <p className="text-3xl font-bold">0.5 ETH</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Purchase Form */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Coins className="w-6 h-6 text-primary" />
                Purchase Tokens
              </CardTitle>
              <CardDescription>Enter the amount of ETH you want to convert to STAY tokens</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="eth-amount">ETH Amount</Label>
                  <div className="relative">
                    <Input
                      id="eth-amount"
                      type="number"
                      placeholder="0.0"
                      value={ethAmount}
                      onChange={(e) => setEthAmount(e.target.value)}
                      className="text-2xl h-14 pr-20"
                      step="0.01"
                      min="0"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      ETH
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <ArrowRight className="w-6 h-6 text-muted-foreground" />
                </div>

                <div className="space-y-2">
                  <Label>You Will Receive</Label>
                  <div className="relative">
                    <Input type="text" value={stayAmount} readOnly className="text-2xl h-14 pr-24 bg-muted" />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                      STAY
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-muted p-4 rounded-lg space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span className="font-medium">1 ETH = 1,000 STAY</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Network Fee</span>
                  <span className="font-medium">~$5.00</span>
                </div>
              </div>

              <Button
                onClick={handleBuy}
                disabled={!ethAmount || Number.parseFloat(ethAmount) <= 0}
                className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
              >
                Buy STAY Tokens
              </Button>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Instant Conversion</p>
                    <p className="text-sm text-muted-foreground">Tokens are sent immediately after confirmation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">No Hidden Fees</p>
                    <p className="text-sm text-muted-foreground">Only standard network gas fees apply</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Secure Transaction</p>
                    <p className="text-sm text-muted-foreground">All transactions are verified on-chain</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <TransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        steps={steps}
        currentStep={currentStep}
        title="Purchasing STAY Tokens"
      />
    </div>
  )
}
