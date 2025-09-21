"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface YouTubePlayerProps {
  onVideoComplete: () => void
}

export function YouTubePlayer({ onVideoComplete }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [showReward, setShowReward] = useState(false)

  const handlePlayVideo = () => {
    setIsPlaying(true)
    // Simulate video playing for 3 seconds
    setTimeout(() => {
      setIsPlaying(false)
      setShowReward(true)
      onVideoComplete()
      // Hide reward message after 3 seconds
      setTimeout(() => setShowReward(false), 3000)
    }, 3000)
  }

  return (
    <div className="space-y-4">
      <Card className="bg-secondary border-border">
        <CardContent className="p-4">
          <div className="aspect-video bg-black rounded-lg flex items-center justify-center relative overflow-hidden">
            {!isPlaying ? (
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                  <svg className="w-8 h-8 text-primary-foreground" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white text-sm">Gaming Tutorial Video</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"></div>
                <p className="text-white text-sm">Playing video...</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Button
        onClick={handlePlayVideo}
        disabled={isPlaying}
        className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
      >
        {isPlaying ? "Playing..." : "▶️ Watch YouTube Video"}
      </Button>

      {showReward && (
        <div className="text-center p-4 bg-primary/10 border border-primary rounded-lg">
          <p className="text-primary font-semibold">🎉 You earned coins!</p>
          <p className="text-sm text-muted-foreground">+10 coins added to your account</p>
        </div>
      )}
    </div>
  )
}
