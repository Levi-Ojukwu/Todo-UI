"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X } from "lucide-react"

interface TodoFormProps {
  onSubmit: (data: any) => Promise<void>
  initialData?: any
  isLoading?: boolean
  onCancel?: () => void
}

export function TodoForm({ onSubmit, initialData, isLoading, onCancel }: TodoFormProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    tags: [] as string[],
    tagInput: "",
  })
  const [error, setError] = useState("")

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || "",
        description: initialData.description || "",
        deadline: initialData.deadline?.split("T")[0] || "",
        tags: initialData.tags || [],
        tagInput: "",
      })
    }
  }, [initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("")
  }

  const handleAddTag = () => {
    if (formData.tagInput.trim() && !formData.tags.includes(formData.tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, prev.tagInput.trim()],
        tagInput: "",
      }))
    }
  }

  const handleRemoveTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!formData.title.trim() || !formData.description.trim() || !formData.deadline) {
      setError("All fields are required")
      return
    }

    try {
      await onSubmit({
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline,
        tags: formData.tags,
      })
      setFormData({
        title: "",
        description: "",
        deadline: "",
        tags: [],
        tagInput: "",
      })
    } catch (err: any) {
      setError(err.message || "Failed to save todo")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-4 bg-error/10 text-error rounded-lg text-sm">{error}</div>}

      <div>
        <label className="block text-sm font-semibold text-text mb-2">Title</label>
        <Input
          type="text"
          name="title"
          placeholder="What needs to be done?"
          value={formData.title}
          onChange={handleChange}
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text mb-2">Description</label>
        <textarea
          name="description"
          placeholder="Add details about this task..."
          value={formData.description}
          onChange={handleChange}
          disabled={isLoading}
          rows={4}
          className="w-full px-4 py-2 border border-border-light rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-text"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text mb-2">Deadline</label>
        <Input type="date" name="deadline" value={formData.deadline} onChange={handleChange} disabled={isLoading} />
      </div>

      <div>
        <label className="block text-sm font-semibold text-text mb-2">Tags</label>
        <div className="flex gap-2 mb-2">
          <Input
            type="text"
            placeholder="Add a tag..."
            value={formData.tagInput}
            onChange={(e) => setFormData((prev) => ({ ...prev, tagInput: e.target.value }))}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault()
                handleAddTag()
              }
            }}
            disabled={isLoading}
          />
          <Button
            type="button"
            onClick={handleAddTag}
            className="bg-primary text-white hover:bg-primary-dark px-4"
            disabled={isLoading}
          >
            Add
          </Button>
        </div>

        {formData.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {formData.tags.map((tag) => (
              <div
                key={tag}
                className="flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="hover:opacity-70">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          className="flex-1 gradient-primary text-white font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : initialData ? "Update Todo" : "Create Todo"}
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="px-6 bg-transparent"
            disabled={isLoading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
