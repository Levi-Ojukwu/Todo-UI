"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { getProfile } from "@/lib/api" // <-- MAKE SURE THIS PATH IS CORRECT

interface User {
  id: string
  name: string
  email: string
  imageUrl?: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  login: (user: User, token: string) => void
  logout: () => void
  refreshUser: () => Promise<void>   // <-- ADDED
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load localStorage user & token on startup
  useEffect(() => {
    const storedToken = localStorage.getItem("auth_token")
    const storedUser = localStorage.getItem("auth_user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
      // refreshUser(storedToken)  // <-- Fetch latest profile from server
    } 
    setIsLoading(false)
  }, [])


  // Login handler
  const login = (newUser: User, newToken: string) => {
    setUser(newUser)
    setToken(newToken)
    localStorage.setItem("auth_token", newToken)
    localStorage.setItem("auth_user", JSON.stringify(newUser))
  }

  // Logout handler
  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
  }

  // Refresh user profile from backend
  const refreshUser = async () => {
    try {
      if (!token) {
        console.log("No token available for refresh")
        return
      }

      console.log("Refreshing user profile...")

      const { getProfile } = await import("@/lib/api")
      const updatedProfile = await getProfile(token)
      
      // Normalize the profile image URL
      const apiBase = (process.env.NEXT_PUBLIC_BASE_URL || "https://node-todo-api-go7w.onrender.com").replace(/\/api\/?$/, "")

      console.log("Profile refresh response:", {
        id: updatedProfile.id,
        profile_image: updatedProfile.profile_image,
        imageUrl: updatedProfile.imageUrl,
        apiBase,
      })

      const normalizedUser: User = {
        id: updatedProfile.id,
        name: updatedProfile.name,
        email: updatedProfile.email,
        imageUrl: updatedProfile.imageUrl || 
                 (updatedProfile.profile_image ? `${apiBase}${updatedProfile.profile_image}` : undefined),
      }

      console.log("Setting user state with imageUrl:", normalizedUser.imageUrl)
      
      setUser(normalizedUser)
      localStorage.setItem("auth_user", JSON.stringify(normalizedUser))
    } catch (err) {
      console.error("Failed to refresh user profile:", err)
      throw err
    }
  }

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
