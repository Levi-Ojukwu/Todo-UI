"use client"

import { Trash2, Edit2, CheckCircle2, Circle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface TodoCardProps {
  id: string
  title: string
  description: string
  deadline: string
  tags: string[]
  completed: boolean
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onToggleComplete: (id: string) => void
}

export function TodoCard({
  id,
  title,
  description,
  deadline,
  tags,
  completed,
  onEdit,
  onDelete,
  onToggleComplete,
}: TodoCardProps) {
  const isOverdue = new Date(deadline) < new Date() && !completed

  return (
    <div
      className={`p-6 rounded-xl border-2 transition-all ${
        completed
          ? "bg-surface-secondary border-border-light opacity-60"
          : "bg-surface border-border-light hover:border-primary/50 hover:shadow-md"
      }`}
    >
      <div className="flex gap-4">
        {/* Complete Toggle */}
        <button
          onClick={() => onToggleComplete(id)}
          className="flex-shrink-0 mt-1 text-text-muted hover:text-primary transition-colors"
        >
          {completed ? <CheckCircle2 className="w-6 h-6 text-success" /> : <Circle className="w-6 h-6" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h3 className={`text-lg font-semibold ${completed ? "line-through text-text-muted" : "text-text"}`}>
              {title}
            </h3>
            {isOverdue && (
              <span className="flex-shrink-0 px-3 py-1 bg-error/10 text-error text-xs font-semibold rounded-full">
                Overdue
              </span>
            )}
          </div>

          <p className={`text-sm mb-3 ${completed ? "text-text-muted" : "text-text-muted"}`}>{description}</p>

          {/* Tags */}
          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap mb-4">
              {tags.map((tag) => (
                <span key={tag} className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Deadline */}
          <p className="text-xs text-text-muted mb-4">
            Due:{" "}
            {new Date(deadline).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 flex-shrink-0">
          <Button onClick={() => onEdit(id)} variant="ghost" size="sm" className="p-2 hover:bg-primary/10">
            <Edit2 className="w-4 h-4 text-text-muted hover:text-primary" />
          </Button>
          <Button onClick={() => onDelete(id)} variant="ghost" size="sm" className="p-2 hover:bg-error/10">
            <Trash2 className="w-4 h-4 text-text-muted hover:text-error" />
          </Button>
        </div>
      </div>
    </div>
  )
}
