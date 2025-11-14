"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useState } from "react"

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-surface border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <Link href="/" className="flex items-center gap-3 font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-to-r from-primary via-primary/80 to-primary/60 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              T
            </div>
            <span className="text-text hidden sm:inline">TaskFlow</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-text-muted hover:text-text transition-colors text-sm">
              Features
            </a>
            <a href="#about" className="text-text-muted hover:text-text transition-colors text-sm">
              About
            </a>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white hover:shadow-accent"
            >
              <Link href="/register">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-surface-secondary rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 space-y-3">
            <a href="#features" className="block px-4 py-2 text-text hover:bg-surface-secondary rounded-lg">
              Features
            </a>
            <a href="#about" className="block px-4 py-2 text-text hover:bg-surface-secondary rounded-lg">
              About
            </a>
            <div className="px-4 py-2 space-y-2">
              <Button variant="outline" className="w-full bg-transparent" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="w-full bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white" asChild>
                <Link href="/register">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
