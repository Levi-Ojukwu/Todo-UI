"use client"

import { useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Wait until auth finished loading, then redirect authenticated users
    if (!isLoading && user) {
      // replace so back button doesn't go back to login
      router.replace("/dashboard")
    }
  }, [user, isLoading, router])

  // While auth is loading, render nothing (or a spinner) so there's no flash
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 gradient-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-muted">Checking authentication...</p>
        </div>
      </div>
    )
  }

  // If logged in we already redirected; otherwise show public content
  if (user) return null

  return <>{children}</>
}
