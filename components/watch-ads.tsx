"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdPlayer } from "@/components/ad-player"

interface WatchAdsProps {
  onAdComplete: (adNumber: number) => void // Updated to pass ad number for transaction tracking
}

interface AdState {
  isWatching: boolean
  cooldownTime: number
  isDisabled: boolean
}

export function WatchAds({ onAdComplete }: WatchAdsProps) {
  const [ads, setAds] = useState<AdState[]>(
    Array(5)
      .fill(null)
      .map(() => ({
        isWatching: false,
        cooldownTime: 0,
        isDisabled: false,
      })),
  )
  const [currentAd, setCurrentAd] = useState<number | null>(null)

  // Update cooldown timers
  useEffect(() => {
    const interval = setInterval(() => {
      setAds((prevAds) =>
        prevAds.map((ad) => ({
          ...ad,
          cooldownTime: Math.max(0, ad.cooldownTime - 1),
          isDisabled: ad.cooldownTime > 1,
        })),
      )
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const handleWatchAd = (adIndex: number) => {
    if (ads[adIndex].isDisabled || ads[adIndex].isWatching) return

    setCurrentAd(adIndex)
    setAds((prevAds) => prevAds.map((ad, index) => (index === adIndex ? { ...ad, isWatching: true } : ad)))
  }

  const handleAdComplete = () => {
    if (currentAd === null) return

    setAds((prevAds) =>
      prevAds.map((ad, index) =>
        index === currentAd ? { ...ad, isWatching: false, cooldownTime: 30, isDisabled: true } : ad,
      ),
    )

    onAdComplete(currentAd + 1)
    setCurrentAd(null)
  }

  const handleAdClose = () => {
    if (currentAd === null) return

    setAds((prevAds) => prevAds.map((ad, index) => (index === currentAd ? { ...ad, isWatching: false } : ad)))

    setCurrentAd(null)
  }

  if (currentAd !== null) {
    return <AdPlayer adNumber={currentAd + 1} onComplete={handleAdComplete} onClose={handleAdClose} />
  }

  return (
    <Card className="border-secondary/20">
      <CardHeader>
        <CardTitle className="text-center text-secondary-foreground">Watch Ads</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-center text-sm text-muted-foreground">
          Watch ads to earn coins! Each ad has a 30-second cooldown.
        </p>

        <div className="grid grid-cols-1 gap-3">
          {ads.map((ad, index) => (
            <Button
              key={index}
              onClick={() => handleWatchAd(index)}
              disabled={ad.isDisabled || ad.isWatching}
              className="h-12 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold relative"
            >
              {ad.isWatching
                ? "Watching..."
                : ad.isDisabled
                  ? `Watch Ad ${index + 1} (${ad.cooldownTime}s)`
                  : `📺 Watch Ad ${index + 1}`}

              {ad.isDisabled && (
                <div
                  className="absolute bottom-0 left-0 h-1 bg-primary transition-all duration-1000"
                  style={{ width: `${((30 - ad.cooldownTime) / 30) * 100}%` }}
                />
              )}
            </Button>
          ))}
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>💰 Earn 5 coins per ad</p>
        </div>
      </CardContent>
    </Card>
  )
}
