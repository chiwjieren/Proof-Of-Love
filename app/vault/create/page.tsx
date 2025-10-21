"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, ArrowRight, AlertCircle } from "lucide-react"
import { TransactionModal } from "@/components/transaction-modal"

export default function CreateVaultPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [partnerAddress, setPartnerAddress] = useState("")
  const [tokenAmount, setTokenAmount] = useState("")
  const [confirmations, setConfirmations] = useState([false, false, false])
  const [showModal, setShowModal] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleCreate = () => {
    setShowModal(true)
    setCurrentStep(0)

    // Simulate transaction steps
    setTimeout(() => setCurrentStep(1), 2000)
    setTimeout(() => setCurrentStep(2), 4000)
    setTimeout(() => setCurrentStep(3), 6000)
    setTimeout(() => {
      setCurrentStep(4)
      setTimeout(() => {
        router.push("/vault")
      }, 2000)
    }, 8000)
  }

  const transactionSteps = [
    { title: "Approve Token Spending", status: currentStep >= 1 ? "success" : "pending" },
    { title: "Create Vault Contract", status: currentStep >= 2 ? "success" : "pending" },
    { title: "Lock Tokens", status: currentStep >= 3 ? "success" : "pending" },
    { title: "Send Invitation", status: currentStep >= 4 ? "success" : "pending" },
  ]

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Create Love Vault
              </span>
            </h1>
            <p className="text-xl text-muted-foreground">Lock your commitment on the blockchain</p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s === step
                      ? "bg-primary text-primary-foreground"
                      : s < step
                        ? "bg-primary/20 text-primary"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {s}
                </div>
                {s < 3 && <div className={`w-12 h-1 ${s < step ? "bg-primary" : "bg-muted"}`} />}
              </div>
            ))}
          </div>

          {/* Step 1: Partner Address */}
          {step === 1 && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Enter Partner's Address</CardTitle>
                <CardDescription>Provide your partner's wallet address to create a shared vault</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="partner-address">Partner's Wallet Address</Label>
                  <Input
                    id="partner-address"
                    placeholder="0x..."
                    value={partnerAddress}
                    onChange={(e) => setPartnerAddress(e.target.value)}
                    className="font-mono"
                  />
                  <p className="text-sm text-muted-foreground">
                    Make sure this address is correct. It cannot be changed later.
                  </p>
                </div>

                <div className="bg-accent/10 border border-accent/20 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-medium text-accent mb-1">Important</p>
                    <p className="text-muted-foreground">
                      Your partner will need to approve and match your deposit to activate the vault.
                    </p>
                  </div>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!partnerAddress || partnerAddress.length < 10}
                  className="w-full h-12 text-lg bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                >
                  Continue
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Token Amount */}
          {step === 2 && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Set Lock Amount</CardTitle>
                <CardDescription>Choose how many STAY tokens to lock in the vault</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="token-amount">STAY Token Amount</Label>
                  <Input
                    id="token-amount"
                    type="number"
                    placeholder="1000"
                    value={tokenAmount}
                    onChange={(e) => setTokenAmount(e.target.value)}
                    className="text-2xl h-14"
                    min="100"
                  />
                  <p className="text-sm text-muted-foreground">Minimum: 100 STAY tokens</p>
                </div>

                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Your Balance</span>
                    <span className="font-medium">5,000 STAY</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Partner Must Match</span>
                    <span className="font-medium">{tokenAmount || "0"} STAY</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Total Vault Value</span>
                    <span className="font-bold">{tokenAmount ? Number.parseFloat(tokenAmount) * 2 : "0"} STAY</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleNext}
                    disabled={!tokenAmount || Number.parseFloat(tokenAmount) < 100}
                    className="flex-1 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    Continue
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 3: Confirmation */}
          {step === 3 && (
            <Card className="border-2">
              <CardHeader>
                <CardTitle>Review & Confirm</CardTitle>
                <CardDescription>Review your vault details and confirm creation</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="bg-muted p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Partner Address</span>
                      <span className="font-mono text-sm">
                        {partnerAddress.slice(0, 6)}...{partnerAddress.slice(-4)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Your Deposit</span>
                      <span className="font-bold">{tokenAmount} STAY</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Partner Must Match</span>
                      <span className="font-bold">{tokenAmount} STAY</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-border">
                      <span className="font-medium">Total Vault Value</span>
                      <span className="font-bold text-lg">{Number.parseFloat(tokenAmount) * 2} STAY</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="confirm-1"
                        checked={confirmations[0]}
                        onCheckedChange={(checked) => {
                          const newConfirmations = [...confirmations]
                          newConfirmations[0] = checked as boolean
                          setConfirmations(newConfirmations)
                        }}
                      />
                      <label htmlFor="confirm-1" className="text-sm cursor-pointer">
                        I understand that my partner must approve and match my deposit to activate the vault
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="confirm-2"
                        checked={confirmations[1]}
                        onCheckedChange={(checked) => {
                          const newConfirmations = [...confirmations]
                          newConfirmations[1] = checked as boolean
                          setConfirmations(newConfirmations)
                        }}
                      />
                      <label htmlFor="confirm-2" className="text-sm cursor-pointer">
                        I understand that early withdrawal will result in a penalty
                      </label>
                    </div>
                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="confirm-3"
                        checked={confirmations[2]}
                        onCheckedChange={(checked) => {
                          const newConfirmations = [...confirmations]
                          newConfirmations[2] = checked as boolean
                          setConfirmations(newConfirmations)
                        }}
                      />
                      <label htmlFor="confirm-3" className="text-sm cursor-pointer">
                        I have verified the partner address is correct
                      </label>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Back
                  </Button>
                  <Button
                    onClick={handleCreate}
                    disabled={!confirmations.every((c) => c)}
                    className="flex-1 gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
                  >
                    <Heart className="w-5 h-5" />
                    Create Vault
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <TransactionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        steps={transactionSteps}
        currentStep={currentStep}
        title="Creating Love Vault"
      />
    </div>
  )
}
