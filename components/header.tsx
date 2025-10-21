"use client"

import Link from "next/link"
import Image from "next/image"
import { usePrivy } from "@privy-io/react-auth"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const { ready, authenticated, login, logout, user } = usePrivy()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polfavi-HHaseDjVt4LVJCXqdHkXhNZleJU7LV.png"
              alt="Proof of Love"
              width={32}
              height={32}
            />
            <span className="font-bold text-lg hidden sm:inline">Proof of Love</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/swap" className="text-sm font-medium hover:text-primary transition-colors">
              Swap
            </Link>
            <Link href="/ramp" className="text-sm font-medium hover:text-primary transition-colors">
              Ramp
            </Link>
            <Link href="/airdrop" className="text-sm font-medium hover:text-primary transition-colors">
              Airdrop
            </Link>
            <Link href="/nft" className="text-sm font-medium hover:text-primary transition-colors">
              NFT Gallery
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            {ready && !authenticated && (
              <Button onClick={login} size="sm">
                Connect Wallet
              </Button>
            )}
            {ready && authenticated && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user?.wallet?.address?.slice(0, 6)}...{user?.wallet?.address?.slice(-4)}
                </span>
                <Button onClick={logout} variant="outline" size="sm">
                  Disconnect
                </Button>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                    Home
                  </Link>
                  <Link href="/swap" className="text-lg font-medium hover:text-primary transition-colors">
                    Swap
                  </Link>
                  <Link href="/ramp" className="text-lg font-medium hover:text-primary transition-colors">
                    Ramp
                  </Link>
                  <Link href="/airdrop" className="text-lg font-medium hover:text-primary transition-colors">
                    Airdrop
                  </Link>
                  <Link href="/nft" className="text-lg font-medium hover:text-primary transition-colors">
                    NFT Gallery
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
