import type React from "react"
import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"
import LoadingScreen from "@/components/loading-screen"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Task Manager - Professional Todo Dashboard",
  description: "Manage your tasks efficiently with our modern todo dashboard",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LoadingScreen />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
