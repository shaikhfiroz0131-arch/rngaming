"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface RedeemCodeProps {
  onBack: () => void
}

interface RedeemState {
  isActive: boolean
  currentStep: number
  countdown: number
  isComplete: boolean
  code: string
}

export function RedeemCode({ onBack }: RedeemCodeProps) {
  const [redeemStates, setRedeemStates] = useState<RedeemState[]>(
    Array(5)
      .fill(null)
      .map((_, index) => ({
        isActive: false,
        currentStep: 0,
        countdown: 0,
        isComplete: false,
        code: `RNG${(index + 1).toString().padStart(3, "0")}${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
      })),
  )

  const startRedeem = (index: number) => {
    setRedeemStates((prev) =>
      prev.map((state, i) => (i === index ? { ...state, isActive: true, currentStep: 1, countdown: 10 } : state)),
    )

    // Start countdown
    const countdownInterval = setInterval(() => {
      setRedeemStates((prev) => {
        const newStates = [...prev]
        if (newStates[index].countdown > 0) {
          newStates[index].countdown--
        } else {
          clearInterval(countdownInterval)
          if (newStates[index].currentStep < 3) {
            // Move to next step
            newStates[index].currentStep++
            newStates[index].countdown = 10
            startRedeem(index) // Recursive call for next step
          } else {
            // Complete
            newStates[index].isComplete = true
            newStates[index].isActive = false
          }
        }
        return newStates
      })
    }, 1000)
  }

  const resetRedeem = (index: number) => {
    setRedeemStates((prev) =>
      prev.map((state, i) =>
        i === index ? { ...state, isActive: false, currentStep: 0, countdown: 0, isComplete: false } : state,
      ),
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button onClick={onBack} variant="outline" className="border-border bg-transparent">
          ← Back
        </Button>
        <h1 className="text-xl font-bold text-secondary-foreground">Redeem Code</h1>
        <div className="w-16"></div> {/* Spacer */}
      </div>

      <div className="p-4 max-w-md mx-auto">
        <Card className="mb-6 border-secondary/20">
          <CardHeader>
            <CardTitle className="text-center text-secondary-foreground">Code Generator</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎁</span>
            </div>
            <p className="text-muted-foreground">
              Generate redemption codes through our process. Each code requires 3 steps with 10-second countdowns.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {redeemStates.map((state, index) => (
            <Card key={index} className="border-border">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground">Redeem {index + 1}</h4>
                    {state.isComplete && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">Complete</span>
                    )}
                  </div>

                  {state.isActive && (
                    <div className="text-center p-4 bg-secondary/10 border border-secondary rounded-lg">
                      <p className="text-secondary font-semibold">Step {state.currentStep} of 3</p>
                      <div className="text-2xl font-bold text-primary my-2">{state.countdown}</div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-secondary h-2 rounded-full transition-all duration-1000"
                          style={{ width: `${((10 - state.countdown) / 10) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

                  {state.isComplete && (
                    <div className="text-center p-4 bg-primary/10 border border-primary rounded-lg">
                      <p className="text-primary font-semibold mb-2">🎉 Your code:</p>
                      <div className="bg-background border border-border rounded-lg p-3">
                        <code className="text-lg font-mono text-foreground">{state.code}</code>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Code generated successfully!</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {!state.isActive && !state.isComplete && (
                      <Button
                        onClick={() => startRedeem(index)}
                        className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        Start Redeem {index + 1}
                      </Button>
                    )}

                    {state.isComplete && (
                      <Button
                        onClick={() => resetRedeem(index)}
                        variant="outline"
                        className="flex-1 border-border bg-transparent"
                      >
                        Reset
                      </Button>
                    )}

                    {state.isActive && state.currentStep < 3 && (
                      <Button disabled className="flex-1 bg-muted text-muted-foreground">
                        Processing...
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-6 border-muted/20 bg-muted/5">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              💡 This is a demo redeem system. Each process takes 30 seconds total (3 steps × 10 seconds).
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
