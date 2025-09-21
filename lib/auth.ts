export interface User {
  username: string
  isAdmin: boolean
  coins: number
}

// Hardcoded credentials for demo
const DEMO_USERS = {
  player1: { password: "password123", isAdmin: false, coins: 100 },
  "RN GAMING": { password: "admin123", isAdmin: true, coins: 0 },
}

export function validateLogin(username: string, password: string): User | null {
  const user = DEMO_USERS[username as keyof typeof DEMO_USERS]
  if (user && user.password === password) {
    return {
      username,
      isAdmin: user.isAdmin,
      coins: user.coins,
    }
  }
  return null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userData = localStorage.getItem("rn-gaming-user")
  return userData ? JSON.parse(userData) : null
}

export function setCurrentUser(user: User | null) {
  if (typeof window === "undefined") return
  if (user) {
    localStorage.setItem("rn-gaming-user", JSON.stringify(user))
  } else {
    localStorage.removeItem("rn-gaming-user")
  }
}

export function logout() {
  setCurrentUser(null)
}

export interface Transaction {
  id: string
  type: "plus" | "minus"
  amount: number
  source: string
  timestamp: Date
}

export function addTransaction(transaction: Omit<Transaction, "id" | "timestamp">) {
  if (typeof window === "undefined") return

  const newTransaction: Transaction = {
    ...transaction,
    id: Date.now().toString(),
    timestamp: new Date(),
  }

  const existingTransactions = getTransactionHistory()
  const updatedTransactions = [newTransaction, ...existingTransactions]

  localStorage.setItem("rn-gaming-transactions", JSON.stringify(updatedTransactions))
}

export function getTransactionHistory(): Transaction[] {
  if (typeof window === "undefined") return []
  const transactions = localStorage.getItem("rn-gaming-transactions")
  return transactions ? JSON.parse(transactions) : []
}

export function clearTransactionHistory() {
  if (typeof window === "undefined") return
  localStorage.removeItem("rn-gaming-transactions")
}
