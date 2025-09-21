"use client"

import { useState, useEffect } from "react"
import { LoginForm } from "@/components/login-form"
import { HomeScreen } from "@/components/home-screen"
import { getCurrentUser, type User } from "@/lib/auth"

export default function Page() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
    setIsLoading(false)
  }, [])

  const handleLogin = () => {
    const currentUser = getCurrentUser()
    setUser(currentUser)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm onLogin={handleLogin} />
  }

  return <HomeScreen user={user} onLogout={() => setUser(null)} />
}
