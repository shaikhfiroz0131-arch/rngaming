"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DailyRewardProps {
  onRewardClaimed: () => void
}

export function DailyReward({ onRewardClaimed }: DailyRewardProps) {
  const [hasClaimed, setHasClaimed] = useState(false)
  const [showReward, setShowReward] = useState(false)

  useEffect(() => {
    // Check if user has claimed today's reward
    const lastClaimed = localStorage.getItem("rn-gaming-daily-reward")
    const today = new Date().toDateString()
    setHasClaimed(lastClaimed === today)
  }, [])

  const handleClaimReward = () => {
    if (hasClaimed) return

    const today = new Date().toDateString()
    localStorage.setItem("rn-gaming-daily-reward", today)
    setHasClaimed(true)
    setShowReward(true)
    onRewardClaimed()

    // Hide reward message after 3 seconds
    setTimeout(() => setShowReward(false), 3000)
  }

  return (
    <Card className="border-accent/20">
      <CardHeader>
        <CardTitle className="text-center text-accent">Daily Reward</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
            <span className="text-2xl">🎁</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {hasClaimed ? "Come back tomorrow for your next reward!" : "Claim your daily bonus!"}
          </p>
        </div>

        <Button
          onClick={handleClaimReward}
          disabled={hasClaimed}
          className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
        >
          {hasClaimed ? "Already Claimed Today" : "🎁 Claim Daily Reward"}
        </Button>

        {showReward && (
          <div className="text-center p-4 bg-accent/10 border border-accent rounded-lg">
            <p className="text-accent font-semibold">🎉 Day 1 reward claimed!</p>
            <p className="text-sm text-muted-foreground">+20 coins added to your account</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
