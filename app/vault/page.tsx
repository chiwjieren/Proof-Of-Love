import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Lock, Plus, Clock, Heart, Users } from "lucide-react"

export default function VaultPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Love Vaults
                </span>
              </h1>
              <p className="text-xl text-muted-foreground">Manage your commitment vaults</p>
            </div>
            <Button asChild size="lg" className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
              <Link href="/vault/create">
                <Plus className="w-5 h-5" />
                Create New Vault
              </Link>
            </Button>
          </div>

          {/* Active Vault */}
          <Card className="border-2 border-primary">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-6 h-6 text-primary" />
                    Active Vault
                  </CardTitle>
                  <CardDescription>Your current commitment vault</CardDescription>
                </div>
                <Badge className="bg-primary text-primary-foreground">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Partners</p>
                      <p className="font-mono text-sm">0x1234...5678 & 0x8765...4321</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                      <Lock className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Locked Amount</p>
                      <p className="text-2xl font-bold">1,000 STAY</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Time Locked</p>
                      <p className="text-2xl font-bold">45 Days</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Progress to Silver Tier</span>
                      <span className="font-medium">50%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-secondary w-1/2" />
                    </div>
                    <p className="text-xs text-muted-foreground">45 more days until Silver NFT</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="flex-1 bg-transparent">
                  View Details
                </Button>
                <Button variant="outline" className="flex-1 bg-transparent">
                  Withdraw (Penalty)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Empty State for No Vaults */}
          <Card className="border-2 border-dashed">
            <CardContent className="py-12">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
                  <Lock className="w-8 h-8 text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">No Pending Invitations</h3>
                  <p className="text-muted-foreground">You don't have any pending vault invitations</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6 text-center space-y-2">
                <p className="text-sm text-muted-foreground">Total Locked</p>
                <p className="text-3xl font-bold">1,000 STAY</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center space-y-2">
                <p className="text-sm text-muted-foreground">Days Committed</p>
                <p className="text-3xl font-bold">45</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center space-y-2">
                <p className="text-sm text-muted-foreground">NFTs Earned</p>
                <p className="text-3xl font-bold">1</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
