"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AdPlayerProps {
  adNumber: number
  onComplete: () => void
  onClose: () => void
}

export function AdPlayer({ adNumber, onComplete, onClose }: AdPlayerProps) {
  const [timeLeft, setTimeLeft] = useState(5) // 5 seconds for demo
  const [showReward, setShowReward] = useState(false)

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setShowReward(true)
    }
  }, [timeLeft])

  const handleComplete = () => {
    onComplete()
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-2 border-primary/20">
        <CardHeader className="text-center">
          <CardTitle className="text-primary">Ad Player</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative">
            <div className="text-center text-white">
              {!showReward ? (
                <>
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📺</span>
                  </div>
                  <p className="text-lg font-semibold">Ad playing... (demo)</p>
                  <p className="text-sm opacity-75">Ad {adNumber}</p>
                  <div className="mt-4">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-2 text-sm">{timeLeft}s remaining</p>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎉</span>
                  </div>
                  <p className="text-lg font-semibold text-primary">Coins awarded!</p>
                  <p className="text-sm opacity-75">+5 coins earned</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={onClose} variant="outline" className="flex-1 border-border bg-transparent">
              Close
            </Button>
            {showReward && (
              <Button
                onClick={handleComplete}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Collect Reward
              </Button>
            )}
          </div>

          {/* Progress bar */}
          <div className="w-full bg-secondary rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-1000"
              style={{ width: `${((5 - timeLeft) / 5) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
