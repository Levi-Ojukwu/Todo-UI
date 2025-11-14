"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Navigation } from "@/components/navigation"
import { ProtectedRoute } from "@/components/protected-route"
import { ProfileHeader } from "@/components/profile-header"
import { ProfileForm } from "@/components/profile-form"
import { updateProfile as updateProfileApi } from "@/lib/api"

export default function ProfilePage() {
  const { user, token } = useAuth()
  const [isLoading, setIsLoading] = useState(false)

  const handleUpdateProfile = async (data: any) => {
    if (!token) return
    setIsLoading(true)
    try {
      await updateProfileApi(token, data)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ProtectedRoute>
      <Navigation />
      <div className="min-h-screen bg-background">
        <div className="max-w-3xl mx-auto p-4 sm:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-text mb-2">Profile Settings</h1>
            <p className="text-text-muted">Manage your account information and preferences</p>
          </div>

          {user && (
            <>
              {/* Profile Card */}
              <div className="bg-surface rounded-2xl shadow-lg p-8 border border-border-light mb-8">
                <ProfileHeader user={user} />
              </div>

              {/* Settings Form */}
              <div className="bg-surface rounded-2xl shadow-lg p-8 border border-border-light">
                <h2 className="text-2xl font-bold text-text mb-6">Account Settings</h2>
                <ProfileForm user={user} onSubmit={handleUpdateProfile} isLoading={isLoading} />
              </div>
            </>
          )}
        </div>
      </div>
    </ProtectedRoute>
  )
}
