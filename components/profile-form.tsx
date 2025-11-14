"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProfileFormProps {
  user: {
    id: string
    name: string
    email: string
  }
  onSubmit: (data: any) => Promise<void>
  isLoading?: boolean
}

export function ProfileForm({ user, onSubmit, isLoading }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    name: user.name,
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
    setError("")
    setSuccess("")
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match")
      return
    }

    try {
      const updates: any = { name: formData.name }
      if (formData.newPassword) {
        updates.password = formData.newPassword
      }
      await onSubmit(updates)
      setSuccess("Profile updated successfully")
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }))
    } catch (err: any) {
      setError(err.message || "Failed to update profile")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && <div className="p-4 bg-error/10 text-error rounded-lg text-sm">{error}</div>}
      {success && <div className="p-4 bg-success/10 text-success rounded-lg text-sm">{success}</div>}

      <div>
        <label className="block text-sm font-semibold text-text mb-2">Full Name</label>
        <Input type="text" name="name" value={formData.name} onChange={handleChange} disabled={isLoading} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text mb-2">Email Address</label>
        <Input type="email" value={user.email} disabled className="bg-surface-secondary" />
        <p className="text-xs text-text-muted mt-1">Email cannot be changed</p>
      </div>

      <div className="border-t border-border-light pt-6">
        <h3 className="font-semibold text-text mb-4">Change Password</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-text mb-2">New Password</label>
            <Input
              type="password"
              name="newPassword"
              placeholder="Leave empty to keep current password"
              value={formData.newPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-text mb-2">Confirm Password</label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm new password"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full gradient-primary text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
        disabled={isLoading}
      >
        {isLoading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  )
}
