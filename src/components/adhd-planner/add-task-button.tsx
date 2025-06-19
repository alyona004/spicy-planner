"use client"

import { useState, useEffect, useMemo } from "react"

interface AddTaskButtonProps {
  onClick: () => void
  className?: string
}

export function AddTaskButton({ onClick, className = "" }: AddTaskButtonProps) {
  // Dopamine icons for the add task button
  const dopamineIcons = useMemo(() => [
    "🎉", "🚀", "✨", "🦄", "🌈", "🔥", "🍀", "🥳", "💡", "🏆"
  ], [])
  const [addTaskIcon, setAddTaskIcon] = useState<string | null>(null)

  // Set random dopamine icon on mount
  useEffect(() => {
    const randomIcon = dopamineIcons[Math.floor(Math.random() * dopamineIcons.length)]
    setAddTaskIcon(randomIcon)
  }, [dopamineIcons])

  return (
    <button
      type="button"
      className={`px-4 py-2 rounded-full bg-primary text-white font-bold text-base shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary transition flex items-center gap-2 ${className}`}
      onClick={onClick}
      aria-label="Add Task"
    >
      {addTaskIcon && <span aria-hidden>{addTaskIcon}</span>}
      Add Task
    </button>
  )
} 