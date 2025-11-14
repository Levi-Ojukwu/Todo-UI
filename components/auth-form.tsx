"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface AuthFormProps {
  type: "login" | "register"
  onSubmit: (data: any) => Promise<void>
  isLoading?: boolean
}

export function AuthForm({ type, onSubmit, isLoading }: AuthFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (type === "register") {
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match")
        return
      }
      if (formData.name.trim() === "") {
        setError("Name is required")
        return
      }
    }

    try {
      await onSubmit(formData)
    } catch (err: any) {
      setError(err.message || "An error occurred")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      {error && <div className="p-4 bg-error/10 text-error rounded-lg text-sm">{error}</div>}

      {type === "register" && (
        <Input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      )}

      <Input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        required
        disabled={isLoading}
      />

      <Input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
        disabled={isLoading}
      />

      {type === "register" && (
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
          disabled={isLoading}
        />
      )}

      <Button
        type="submit"
        className="w-full gradient-primary text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : type === "login" ? "Sign In" : "Create Account"}
      </Button>

      <p className="text-center text-text-muted text-sm">
        {type === "login" ? (
          <>
            Don't have an account?{" "}
            <Link href="/register" className="text-primary font-semibold hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </>
        )}
      </p>
    </form>
  )
}
