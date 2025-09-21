"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ShopProps {
  onBack: () => void
  coins: number
  subtractCoins: (amount: number, source: string) => void // Added subtractCoins function for transaction tracking
}

const SHOP_ITEMS = [
  { id: 1, name: "Gaming Headset", price: 500, icon: "🎧" },
  { id: 2, name: "Mechanical Keyboard", price: 750, icon: "⌨️" },
  { id: 3, name: "Gaming Mouse", price: 300, icon: "🖱️" },
  { id: 4, name: "RGB Mousepad", price: 150, icon: "🌈" },
  { id: 5, name: "Gaming Chair", price: 1200, icon: "🪑" },
  { id: 6, name: "Monitor Stand", price: 200, icon: "🖥️" },
]

export function Shop({ onBack, coins, subtractCoins }: ShopProps) {
  const [purchasedItems, setPurchasedItems] = useState<number[]>([]) // Track purchased items

  const handlePurchase = (item: (typeof SHOP_ITEMS)[0]) => {
    if (coins >= item.price && !purchasedItems.includes(item.id)) {
      subtractCoins(item.price, `Shop: ${item.name}`)
      setPurchasedItems((prev) => [...prev, item.id])
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button onClick={onBack} variant="outline" className="border-border bg-transparent">
          ← Back
        </Button>
        <h1 className="text-xl font-bold text-accent">Shop</h1>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Your Balance</p>
          <p className="text-lg font-semibold text-primary">{coins} Coins</p>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        <Card className="mb-6 border-accent/20">
          <CardContent className="p-6 text-center">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛍️</span>
            </div>
            <h2 className="text-xl font-bold text-accent mb-2">Gaming Store</h2>
            <p className="text-muted-foreground">Redeem your coins here</p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Available Items</h3>

          <div className="grid gap-3">
            {SHOP_ITEMS.map((item) => {
              const isPurchased = purchasedItems.includes(item.id)
              const canAfford = coins >= item.price

              return (
                <Card key={item.id} className="border-border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
                          <span className="text-xl">{item.icon}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground">{item.name}</h4>
                          <p className="text-sm text-primary font-medium">{item.price} coins</p>
                        </div>
                      </div>
                      <Button
                        disabled={!canAfford || isPurchased}
                        onClick={() => handlePurchase(item)}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      >
                        {isPurchased ? "✓ Purchased" : canAfford ? "Buy" : "Not enough coins"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card className="border-muted/20 bg-muted/5">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground">
                💡 Purchase items to see them in your transaction history!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
