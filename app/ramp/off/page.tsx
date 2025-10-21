"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function OffRampPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [statusResponse, setStatusResponse] = useState<any>(null)
  const [formData, setFormData] = useState({
    walletAddress: "",
    bankAccount: "",
    amount: "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setApiResponse(null)
    setStatusResponse(null)

    try {
      // Step 1: Call callback endpoint
      const callbackResponse = await fetch("/api/paynet/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          walletAddress: formData.walletAddress,
          bankAccount: formData.bankAccount,
          amount: formData.amount,
          type: "off-ramp",
        }),
      })

      const callbackData = await callbackResponse.json()
      setApiResponse(callbackData)

      // Step 2: Call status endpoint
      if (callbackResponse.ok && callbackData.transactionId) {
        const statusResponse = await fetch(`/api/paynet/status?txId=${callbackData.transactionId}`)
        const statusData = await statusResponse.json()
        setStatusResponse(statusData)

        if (statusResponse.ok) {
          setSuccess(true)
          toast({
            title: "Bank Transfer Successful",
            description: "Your crypto has been converted and transferred to your bank account",
          })
        }
      } else {
        toast({
          title: "Error",
          description: callbackData.error || "Failed to process off-ramp",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to PayNet API",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="space-y-2">
            <Link href="/ramp" className="text-sm text-blue-600 hover:underline">
              ← Back to Ramp
            </Link>
            <h1 className="text-3xl font-bold text-blue-900">Off-Ramp: Convert Crypto to MYR</h1>
            <p className="text-blue-700">Withdraw your crypto as MYR to your bank account</p>
          </div>

          {!success ? (
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="walletAddress">Wallet Address</Label>
                  <Input
                    id="walletAddress"
                    placeholder="0x..."
                    value={formData.walletAddress}
                    onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                    required
                  />
                  <p className="text-xs text-blue-600">Your crypto wallet address for balance verification</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bankAccount">Bank Account Number</Label>
                  <Input
                    id="bankAccount"
                    placeholder="1234567890"
                    value={formData.bankAccount}
                    onChange={(e) => setFormData({ ...formData, bankAccount: e.target.value })}
                    required
                  />
                  <p className="text-xs text-blue-600">Malaysian bank account for MYR withdrawal</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount to Withdraw (MYR)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="100.00"
                    step="0.01"
                    min="10"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                  />
                  <p className="text-xs text-blue-600">Minimum: RM 10.00</p>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Withdraw to Bank"
                  )}
                </Button>
              </form>
            </Card>
          ) : (
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-green-200">
              <div className="space-y-6 text-center">
                <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-green-900">Bank Transfer Successful!</h2>
                  <p className="text-green-700">Your crypto has been converted to MYR and transferred</p>
                </div>

                <Card className="p-4 bg-blue-50 border-blue-200 text-left">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-blue-600">Amount:</span>
                      <span className="font-semibold text-blue-900">RM {formData.amount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Bank Account:</span>
                      <span className="font-semibold text-blue-900">{formData.bankAccount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-600">Status:</span>
                      <span className="font-semibold text-green-600">Completed</span>
                    </div>
                  </div>
                </Card>

                <Button onClick={() => setSuccess(false)} variant="outline" className="w-full">
                  Make Another Transaction
                </Button>
              </div>
            </Card>
          )}

          {apiResponse && (
            <Card className="p-4 bg-gray-50 border-gray-200">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-gray-900">API Response (Callback):</h3>
                <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            </Card>
          )}

          {statusResponse && (
            <Card className="p-4 bg-gray-50 border-gray-200">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-gray-900">API Response (Status):</h3>
                <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                  {JSON.stringify(statusResponse, null, 2)}
                </pre>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
