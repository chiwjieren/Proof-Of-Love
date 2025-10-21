"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowDownToLine, ArrowUpFromLine } from "lucide-react"

export default function RampPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-blue-900">PayNet On/Off-Ramp Simulator</h1>
            <p className="text-lg text-blue-700">Buy crypto with MYR or convert crypto back to MYR using PayNet</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="p-8 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-xl transition-all">
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowDownToLine className="w-8 h-8 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-blue-900">On-Ramp</h2>
                  <p className="text-blue-700">Buy crypto using Malaysian Ringgit (MYR) via PayNet</p>
                </div>
                <Link href="/ramp/on">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    Start On-Ramp
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className="p-8 bg-white/80 backdrop-blur-sm border-blue-200 hover:shadow-xl transition-all">
              <div className="space-y-6">
                <div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowUpFromLine className="w-8 h-8 text-blue-600" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-blue-900">Off-Ramp</h2>
                  <p className="text-blue-700">Convert crypto to MYR and withdraw to your bank account</p>
                </div>
                <Link href="/ramp/off">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700" size="lg">
                    Start Off-Ramp
                  </Button>
                </Link>
              </div>
            </Card>
          </div>

          <Card className="p-6 bg-blue-50/50 backdrop-blur-sm border-blue-200 mt-8">
            <p className="text-sm text-blue-600">
              <strong>Note:</strong> This is a simulator using mock PayNet API endpoints. No real transactions will be
              processed.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}
