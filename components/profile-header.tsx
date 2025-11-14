"use client"

import { User } from "lucide-react"
import Image from "next/image"

interface ProfileHeaderProps {
  user: {
    id: string
    name: string
    email: string
    imageUrl?: string
  }
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  return (
    <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-2xl border border-border-light">
      <div className="relative w-16 h-16 rounded-full bg-gradient-primary overflow-hidden flex items-center justify-center">
        {user.imageUrl ? (
          <Image
            src={user.imageUrl || "/placeholder.svg"}
            alt={user.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-8 h-8 text-white" />
        )}
      </div>
      <div className="flex-1">
        <h2 className="text-2xl font-bold text-text">{user.name}</h2>
        <p className="text-text-muted">{user.email}</p>
      </div>
    </div>
  )
}
