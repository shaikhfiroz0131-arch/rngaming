"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { logout, addTransaction, type User } from "@/lib/auth"
import { YouTubePlayer } from "@/components/youtube-player"
import { WatchAds } from "@/components/watch-ads"
import { Shop } from "@/components/shop"
import { RedeemCode } from "@/components/redeem-code"
import { DailyReward } from "@/components/daily-reward"
import { SpinWheel } from "@/components/spin-wheel"
import { AdminPanel } from "@/components/admin-panel"
import { TransactionHistory } from "@/components/transaction-history"

interface HomeScreenProps {
  user: User
  onLogout: () => void
}

type Screen = "home" | "shop" | "redeem" | "admin" | "history"

export function HomeScreen({ user, onLogout }: HomeScreenProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [coins, setCoins] = useState(user.coins)

  const handleLogout = () => {
    logout()
    onLogout()
  }

  const addCoins = (amount: number, source: string) => {
    setCoins((prev) => prev + amount)
    addTransaction({
      type: "plus",
      amount,
      source,
    })
  }

  const subtractCoins = (amount: number, source: string) => {
    setCoins((prev) => prev - amount)
    addTransaction({
      type: "minus",
      amount,
      source,
    })
  }

  if (currentScreen === "shop") {
    return <Shop onBack={() => setCurrentScreen("home")} coins={coins} subtractCoins={subtractCoins} />
  }

  if (currentScreen === "redeem") {
    return <RedeemCode onBack={() => setCurrentScreen("home")} coins={coins} subtractCoins={subtractCoins} />
  }

  if (currentScreen === "admin" && user.isAdmin) {
    return <AdminPanel onBack={() => setCurrentScreen("home")} />
  }

  if (currentScreen === "history") {
    return <TransactionHistory onBack={() => setCurrentScreen("home")} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          RN GAMING
        </h1>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Welcome, {user.username}</p>
            <p className="text-lg font-semibold text-primary">{coins} Coins</p>
          </div>
          <Button variant="outline" onClick={handleLogout} className="border-border bg-transparent">
            Logout
          </Button>
        </div>
      </div>

      <div className="p-4 space-y-6 max-w-md mx-auto">
        {/* YouTube Section */}
        <Card className="border-primary/20">
          <CardHeader>
            <CardTitle className="text-center text-primary">Watch & Earn</CardTitle>
          </CardHeader>
          <CardContent>
            <YouTubePlayer onVideoComplete={() => addCoins(10, "YouTube Video")} />
          </CardContent>
        </Card>

        {/* Watch Ads Section */}
        <WatchAds onAdComplete={(adNumber) => addCoins(5, `Watch Ad ${adNumber}`)} />

        {/* Daily Reward */}
        <DailyReward onRewardClaimed={() => addCoins(20, "Daily Reward")} />

        {/* Spin Wheel */}
        <SpinWheel
          onSpinComplete={(reward) => {
            if (typeof reward === "number") addCoins(reward, "Spin Wheel")
          }}
        />

        {/* Navigation Buttons */}
        <div className="space-y-3">
          <Button onClick={() => setCurrentScreen("history")} className="w-full h-12 bg-primary hover:bg-primary/90">
            📊 Transaction History
          </Button>
          <Button onClick={() => setCurrentScreen("shop")} className="w-full h-12 bg-accent hover:bg-accent/90">
            🛍️ Shop
          </Button>
          <Button onClick={() => setCurrentScreen("redeem")} className="w-full h-12 bg-secondary hover:bg-secondary/90">
            🎁 Redeem Code
          </Button>
          {user.isAdmin && (
            <Button
              onClick={() => setCurrentScreen("admin")}
              className="w-full h-12 bg-destructive hover:bg-destructive/90"
            >
              ⚙️ Admin Panel
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
