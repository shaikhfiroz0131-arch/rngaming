"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface AdminPanelProps {
  onBack: () => void
}

interface DemoUser {
  id: number
  username: string
  coins: number
  lastActive: string
  isOnline: boolean
}

const DEMO_USERS: DemoUser[] = [
  { id: 1, username: "player1", coins: 150, lastActive: "2 min ago", isOnline: true },
  { id: 2, username: "gamer_pro", coins: 320, lastActive: "5 min ago", isOnline: true },
  { id: 3, username: "coin_hunter", coins: 89, lastActive: "1 hour ago", isOnline: false },
  { id: 4, username: "ad_watcher", coins: 245, lastActive: "30 min ago", isOnline: false },
  { id: 5, username: "spin_master", coins: 567, lastActive: "15 min ago", isOnline: true },
]

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [users, setUsers] = useState<DemoUser[]>(DEMO_USERS)
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [coinAmount, setCoinAmount] = useState("")
  const [actionMessage, setActionMessage] = useState("")

  const handleAddCoins = () => {
    if (selectedUser === null || !coinAmount) return

    const amount = Number.parseInt(coinAmount)
    if (isNaN(amount)) return

    setUsers((prev) => prev.map((user) => (user.id === selectedUser ? { ...user, coins: user.coins + amount } : user)))

    const user = users.find((u) => u.id === selectedUser)
    setActionMessage(`Added ${amount} coins to ${user?.username}`)
    setCoinAmount("")
    setSelectedUser(null)

    // Clear message after 3 seconds
    setTimeout(() => setActionMessage(""), 3000)
  }

  const handleRemoveCoins = () => {
    if (selectedUser === null || !coinAmount) return

    const amount = Number.parseInt(coinAmount)
    if (isNaN(amount)) return

    setUsers((prev) =>
      prev.map((user) => (user.id === selectedUser ? { ...user, coins: Math.max(0, user.coins - amount) } : user)),
    )

    const user = users.find((u) => u.id === selectedUser)
    setActionMessage(`Removed ${amount} coins from ${user?.username}`)
    setCoinAmount("")
    setSelectedUser(null)

    // Clear message after 3 seconds
    setTimeout(() => setActionMessage(""), 3000)
  }

  const totalCoins = users.reduce((sum, user) => sum + user.coins, 0)
  const onlineUsers = users.filter((user) => user.isOnline).length

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/5">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <Button onClick={onBack} variant="outline" className="border-border bg-transparent">
          ← Back
        </Button>
        <h1 className="text-xl font-bold text-destructive">Admin Panel</h1>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">RN GAMING</p>
          <p className="text-sm font-semibold text-destructive">Administrator</p>
        </div>
      </div>

      <div className="p-4 max-w-4xl mx-auto">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-destructive/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-destructive">{users.length}</div>
              <p className="text-sm text-muted-foreground">Total Users</p>
            </CardContent>
          </Card>
          <Card className="border-primary/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{onlineUsers}</div>
              <p className="text-sm text-muted-foreground">Online Now</p>
            </CardContent>
          </Card>
          <Card className="border-accent/20">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-accent">{totalCoins.toLocaleString()}</div>
              <p className="text-sm text-muted-foreground">Total Coins</p>
            </CardContent>
          </Card>
        </div>

        {/* Action Message */}
        {actionMessage && (
          <Card className="mb-4 border-primary/20 bg-primary/10">
            <CardContent className="p-4 text-center">
              <p className="text-primary font-semibold">✅ {actionMessage}</p>
            </CardContent>
          </Card>
        )}

        {/* Coin Management */}
        <Card className="mb-6 border-destructive/20">
          <CardHeader>
            <CardTitle className="text-destructive">Coin Management</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <label className="text-sm text-muted-foreground">Select User</label>
                <select
                  value={selectedUser || ""}
                  onChange={(e) => setSelectedUser(e.target.value ? Number.parseInt(e.target.value) : null)}
                  className="w-full h-10 px-3 bg-secondary border border-border rounded-md text-foreground"
                >
                  <option value="">Choose a user...</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.username} ({user.coins} coins)
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="text-sm text-muted-foreground">Coin Amount</label>
                <Input
                  type="number"
                  placeholder="Enter amount"
                  value={coinAmount}
                  onChange={(e) => setCoinAmount(e.target.value)}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={handleAddCoins}
                disabled={!selectedUser || !coinAmount}
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                Add Coins
              </Button>
              <Button
                onClick={handleRemoveCoins}
                disabled={!selectedUser || !coinAmount}
                className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground"
              >
                Remove Coins
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users List */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-foreground">User Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary-foreground">
                          {user.username.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      {user.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{user.username}</p>
                      <p className="text-sm text-muted-foreground">
                        {user.isOnline ? "Online" : `Last seen ${user.lastActive}`}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-accent">{user.coins} coins</p>
                    <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6 border-muted/20 bg-muted/5">
          <CardContent className="p-4 text-center">
            <p className="text-sm text-muted-foreground">
              💡 This is a demo admin panel. In a real app, these actions would update a backend database.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
