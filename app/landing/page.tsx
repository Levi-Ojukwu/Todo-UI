"use client"

import { LandingNavbar } from "@/components/landing-navbar"
import { LandingFooter } from "@/components/landing-footer"
import { CheckCircle, Clock, Users, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LandingPage() {
  const features = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: "Task Management",
      description: "Create, organize, and manage your tasks with ease. Track progress and stay on top of your goals.",
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Smart Scheduling",
      description: "Set deadlines and priorities for your tasks. Get reminders to never miss an important deadline.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Collaboration",
      description: "Work efficiently with our intuitive interface. Track your productivity with detailed insights.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Experience blazing-fast performance. Our platform is optimized for speed and reliability.",
    },
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <LandingNavbar />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center animate-fade-in-up">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-text mb-6 text-balance">
              Organize Your Tasks,{" "}
              <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                Master Your Goals
              </span>
            </h1>
            <p className="text-lg text-text-muted mb-8 text-balance">
              TaskFlow is a modern, intuitive task management platform designed to help you stay organized, focused, and
              productive. Manage your daily tasks effortlessly and achieve more with less effort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 text-white hover:shadow-accent"
              >
                <Link href="/register">Get Started Free</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/login">Sign In</Link>
              </Button>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hidden md:flex justify-center">
            <div className="w-80 h-80 bg-gradient-to-br from-primary/20 via-primary/10 to-transparent rounded-2xl blur-2xl animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-4">Powerful Features</h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Everything you need to manage tasks efficiently and stay productive
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-surface rounded-lg p-6 border border-border hover-lift shadow-soft transition-all duration-300"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">{feature.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-surface border border-border rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-6">About TaskFlow</h2>
          <p className="text-lg text-text-muted leading-relaxed mb-4">
            TaskFlow was built with a simple mission: to make task management intuitive and accessible to everyone. We
            believe that staying organized shouldn't require complex tools or steep learning curves.
          </p>
          <p className="text-lg text-text-muted leading-relaxed">
            Our platform combines powerful features with a clean, user-friendly interface. Whether you're managing
            personal projects, work tasks, or team collaboration, TaskFlow provides the tools you need to succeed.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-primary via-primary/90 to-primary/80 rounded-2xl p-8 md:p-16 text-center shadow-accent">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already organizing their tasks and achieving their goals with TaskFlow.
          </p>
          <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90">
            <Link href="/register">Create Your Account</Link>
          </Button>
        </div>
      </section>

      <LandingFooter />
    </main>
  )
}
