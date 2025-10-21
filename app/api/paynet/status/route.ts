import { type NextRequest, NextResponse } from "next/server"

// Placeholder for checking PayNet payment status
// TODO: Implement actual PayNet status check
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const txId = searchParams.get("txId") || searchParams.get("paymentId")

    if (!txId) {
      return NextResponse.json({ error: "Transaction ID required" }, { status: 400 })
    }

    const response = {
      transactionId: txId,
      status: "completed",
      amount: 100,
      currency: "MYR",
      type: "off-ramp",
      bankTransferStatus: "success",
      createdAt: new Date(Date.now() - 60000).toISOString(),
      completedAt: new Date().toISOString(),
      message: "Transaction completed successfully (mock)",
      details: {
        processingTime: "45 seconds",
        fee: "RM 2.50",
        exchangeRate: "1 STAY = RM 0.50",
      },
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] PayNet status check error:", error)
    return NextResponse.json({ error: "Failed to check payment status" }, { status: 500 })
  }
}
