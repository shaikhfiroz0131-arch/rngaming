"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface SpinWheelProps {
  onSpinComplete: (reward: number | string) => void
}

const WHEEL_SEGMENTS = [
  { label: "10 Coins", value: 10, color: "bg-primary" },
  { label: "20 Coins", value: 20, color: "bg-accent" },
  { label: "50 Coins", value: 50, color: "bg-chart-4" },
  { label: "RS.100", value: "RS.100", color: "bg-destructive" },
]

export function SpinWheel({ onSpinComplete }: SpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [rotation, setRotation] = useState(0)

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)

    // Generate random rotation (multiple full spins + final position)
    const spins = 5 + Math.random() * 5 // 5-10 full spins
    const finalRotation = rotation + spins * 360

    // Always land on coins (never RS.100 as per requirements)
    const availableRewards = WHEEL_SEGMENTS.slice(0, 3) // Exclude RS.100
    const selectedReward = availableRewards[Math.floor(Math.random() * availableRewards.length)]

    setRotation(finalRotation)

    setTimeout(() => {
      setIsSpinning(false)
      setResult(`Won: ${selectedReward.label}`)
      onSpinComplete(selectedReward.value)

      // Hide result after 3 seconds
      setTimeout(() => setResult(null), 3000)
    }, 2000)
  }

  return (
    <Card className="border-chart-4/20">
      <CardHeader>
        <CardTitle className="text-center text-chart-4">Spin Wheel</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <div className="relative">
            {/* Wheel */}
            <div
              className={`w-32 h-32 rounded-full border-4 border-border relative overflow-hidden transition-transform duration-2000 ease-out ${
                isSpinning ? "animate-spin" : ""
              }`}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              {WHEEL_SEGMENTS.map((segment, index) => (
                <div
                  key={index}
                  className={`absolute w-full h-full ${segment.color} opacity-80`}
                  style={{
                    clipPath: `polygon(50% 50%, ${50 + 40 * Math.cos((index * 90 - 45) * (Math.PI / 180))}% ${
                      50 + 40 * Math.sin((index * 90 - 45) * (Math.PI / 180))
                    }%, ${50 + 40 * Math.cos(((index + 1) * 90 - 45) * (Math.PI / 180))}% ${
                      50 + 40 * Math.sin(((index + 1) * 90 - 45) * (Math.PI / 180))
                    }%)`,
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs font-bold text-white transform -rotate-45">{segment.label}</span>
                  </div>
                </div>
              ))}
            </div>
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1">
              <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-foreground"></div>
            </div>
          </div>
        </div>

        <div className="text-center space-y-2">
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            {WHEEL_SEGMENTS.map((segment, index) => (
              <span key={index} className={`px-2 py-1 rounded ${segment.color} text-white`}>
                {segment.label}
              </span>
            ))}
          </div>
        </div>

        <Button
          onClick={handleSpin}
          disabled={isSpinning}
          className="w-full h-12 bg-chart-4 hover:bg-chart-4/90 text-white font-semibold"
        >
          {isSpinning ? "Spinning..." : "🎰 Spin Wheel"}
        </Button>

        {result && (
          <div className="text-center p-4 bg-chart-4/10 border border-chart-4 rounded-lg">
            <p className="text-chart-4 font-semibold">🎉 {result}</p>
            <p className="text-sm text-muted-foreground">Coins added to your account!</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
