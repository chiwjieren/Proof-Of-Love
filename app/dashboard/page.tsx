import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Lock, Trophy, Coins, Clock } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Dashboard
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">Welcome back! Here's your commitment overview</p>
            </div>
            <div className="hidden md:block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polfavi-HHaseDjVt4LVJCXqdHkXhNZleJU7LV.png"
                alt="Love"
                width={80}
                height={80}
                className="animate-float"
              />
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Coins className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">STAY Balance</p>
                    <p className="text-2xl font-bold">5,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Locked Tokens</p>
                    <p className="text-2xl font-bold">1,000</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Days Locked</p>
                    <p className="text-2xl font-bold">45</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">NFTs Earned</p>
                    <p className="text-2xl font-bold">1</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="border-2 hover:border-primary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Coins className="w-5 h-5 text-primary" />
                  Buy Tokens
                </CardTitle>
                <CardDescription>Purchase STAY tokens to create or join vaults</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                  <Link href="/token">Buy STAY</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-secondary transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-secondary" />
                  Create Vault
                </CardTitle>
                <CardDescription>Start a new commitment vault with your partner</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/vault/create">Create Vault</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-accent transition-colors">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-accent" />
                  View NFTs
                </CardTitle>
                <CardDescription>Check your eligibility and claim milestone NFTs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild variant="outline" className="w-full bg-transparent">
                  <Link href="/nft">NFT Gallery</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Active Vault Summary */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-primary" />
                    Active Vault
                  </CardTitle>
                  <CardDescription>Your current commitment status</CardDescription>
                </div>
                <Button asChild variant="outline">
                  <Link href="/vault">View Details</Link>
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Vault Value</p>
                  <p className="text-3xl font-bold">2,000 STAY</p>
                  <p className="text-xs text-muted-foreground">500 STAY per partner</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Time Locked</p>
                  <p className="text-3xl font-bold">45 Days</p>
                  <p className="text-xs text-muted-foreground">Started Jan 1, 2025</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Next Milestone</p>
                  <p className="text-3xl font-bold">45 Days</p>
                  <p className="text-xs text-muted-foreground">Silver Tier NFT</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest transactions and milestones</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Bronze NFT Eligible</p>
                    <p className="text-sm text-muted-foreground">You can now claim your Bronze tier NFT</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Today</p>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Vault Created</p>
                    <p className="text-sm text-muted-foreground">Successfully locked 1,000 STAY tokens</p>
                  </div>
                  <p className="text-sm text-muted-foreground">45 days ago</p>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                    <Coins className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Tokens Purchased</p>
                    <p className="text-sm text-muted-foreground">Bought 5,000 STAY tokens</p>
                  </div>
                  <p className="text-sm text-muted-foreground">46 days ago</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
