import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/polfavi-HHaseDjVt4LVJCXqdHkXhNZleJU7LV.png"
              alt="Proof of Love"
              width={32}
              height={32}
            />
            <span className="font-bold text-lg">Proof of Love</span>
          </div>

          <nav className="flex gap-6">
            <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <Link href="/swap" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Swap
            </Link>
            <Link href="/airdrop" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Airdrop
            </Link>
            <Link href="/nft" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              NFT Gallery
            </Link>
          </nav>

          <p className="text-sm text-muted-foreground">© 2025 Proof of Love. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
