import { type NextRequest, NextResponse } from "next/server"

// Placeholder for PayNet payment initiation
// TODO: Implement actual PayNet API integration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { amount, name, email, type } = body

    if (!amount || isNaN(Number.parseFloat(amount))) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    // Simulate PayNet API response for on-ramp
    const response = {
      success: true,
      paymentId: `PAYNET_${Date.now()}`,
      transactionId: `TXN_${Math.random().toString(36).substring(7).toUpperCase()}`,
      amount: Number.parseFloat(amount),
      currency: "MYR",
      type: type || "on-ramp",
      customer: {
        name: name || "Anonymous",
        email: email || "user@example.com",
      },
      qrCode: "https://payment.paynet.my/qr/placeholder",
      redirectUrl: "https://payment.paynet.my/checkout/placeholder",
      status: "pending",
      createdAt: new Date().toISOString(),
      message: "Payment initiated successfully via PayNet (mock)",
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] PayNet initiate error:", error)
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 })
  }
}
