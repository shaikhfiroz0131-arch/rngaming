"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getTransactionHistory, type Transaction } from "@/lib/auth"
import { ArrowLeft, TrendingUp, TrendingDown } from "lucide-react"

interface TransactionHistoryProps {
  onBack: () => void
}

export function TransactionHistory({ onBack }: TransactionHistoryProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    setTransactions(getTransactionHistory())
  }, [])

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTransactionIcon = (type: "plus" | "minus") => {
    return type === "plus" ? (
      <TrendingUp className="w-5 h-5 text-green-500" />
    ) : (
      <TrendingDown className="w-5 h-5 text-red-500" />
    )
  }

  const getTransactionColor = (type: "plus" | "minus") => {
    return type === "plus" ? "text-green-500" : "text-red-500"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Transaction History
          </h1>
        </div>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {transactions.length === 0 ? (
          <Card className="border-border/50">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">No transactions yet</p>
              <p className="text-sm text-muted-foreground mt-2">Start earning coins to see your history!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="border-border/50 hover:border-primary/30 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getTransactionIcon(transaction.type)}
                      <div>
                        <p className="font-medium text-foreground">{transaction.source}</p>
                        <p className="text-sm text-muted-foreground">{formatDate(transaction.timestamp)}</p>
                      </div>
                    </div>
                    <div className={`text-lg font-bold ${getTransactionColor(transaction.type)}`}>
                      {transaction.type === "plus" ? "+" : "-"}
                      {transaction.amount}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-6">
          <Button onClick={onBack} className="w-full h-12 bg-primary hover:bg-primary/90">
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
