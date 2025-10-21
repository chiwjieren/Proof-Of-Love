"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, CheckCircle2, QrCode } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function OnRampPage() {
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [apiResponse, setApiResponse] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
  })
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setSuccess(false)
    setApiResponse(null)

    try {
      const response = await fetch("/api/paynet/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          amount: formData.amount,
          type: "on-ramp",
        }),
      })

      const data = await response.json()
      setApiResponse(data)

      if (response.ok) {
        setSuccess(true)
        toast({
          title: "Transaction Initiated",
          description: "Your on-ramp transaction has been initiated via PayNet",
        })
      } else {
        toast({
          title: "Error",
          description: data.error || "Failed to initiate transaction",
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
            <h1 className="text-3xl font-bold text-blue-900">On-Ramp: Buy Crypto with MYR</h1>
            <p className="text-blue-700">Enter your details to purchase crypto using PayNet</p>
          </div>

          {!success ? (
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-200">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (MYR)</Label>
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
                    "Initiate Payment"
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
                  <h2 className="text-2xl font-bold text-green-900">Transaction Initiated!</h2>
                  <p className="text-green-700">Your payment has been initiated via PayNet</p>
                </div>

                <Card className="p-6 bg-blue-50 border-blue-200">
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      <QrCode className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-900">PayNet Payment QR</span>
                    </div>
                    <div className="w-48 h-48 mx-auto bg-white border-2 border-blue-300 rounded-lg flex items-center justify-center">
                      <img src="/paynet-qr-code.jpg" alt="PayNet QR Code" className="w-44 h-44" />
                    </div>
                    <p className="text-sm text-blue-600">Scan this QR code with your banking app</p>
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
                <h3 className="font-semibold text-sm text-gray-900">API Response:</h3>
                <pre className="text-xs bg-white p-3 rounded border overflow-x-auto">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
