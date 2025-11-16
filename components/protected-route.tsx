"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import type { FC, ReactNode } from "react"

export const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/login")
    }
  }, [user, isLoading, router, pathname])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <p className="text-center text-text-muted">Loading...</p>
      </div>
    )
  }

  if (!user) return null

  return children
}
