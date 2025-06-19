import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/types/task";
import React, { useState, useEffect } from "react";

const blockLabels = {
  morning: { label: "Morning", emoji: "🌅", color: "purple-400" },
  afternoon: { label: "Afternoon", emoji: "☀️", color: "cyan-500" },
  evening: { label: "Evening", emoji: "🌙", color: "indigo-500" },
};

const energyVariants = {
  low: "muted",
  medium: "secondary",
  high: "success",
};

const blockVariants = {
  morning: "primary",
  afternoon: "secondary",
  evening: "accent",
};

const energyLabels = {
  low: { label: "Low", emoji: "🔋" },
  medium: { label: "Medium", emoji: "⚡" },
  high: { label: "High", emoji: "🚀" },
};

const energyBorder = {
  high: "border-green-500",
  medium: "border-secondary",
  low: "border-muted",
};

const typeLabels = {
  daily: { label: "Daily", emoji: "🔄" },
  "one-time": { label: "One-time", emoji: "📝" },
};

export interface TaskCardProps {
  task: Task
  onToggleComplete?: (id: string, done: boolean) => void
}

export function TaskCard({ task, onToggleComplete }: TaskCardProps) {
  const [isToggling, setIsToggling] = useState(false)
  const [showCompletionAnimation, setShowCompletionAnimation] = useState(false)
  const [previousState, setPreviousState] = useState(task.state)

  // Track state changes for animations
  useEffect(() => {
    if (task.state !== previousState) {
      if (task.state === "done") {
        setShowCompletionAnimation(true)
        // Hide animation after 2 seconds
        setTimeout(() => setShowCompletionAnimation(false), 2000)
      }
      setPreviousState(task.state)
    }
  }, [task.state, previousState])

  const handleToggle = async (checked: boolean) => {
    if (!onToggleComplete || isToggling) return
    
    setIsToggling(true)
    try {
      await onToggleComplete(task.id, checked)
    } finally {
      setIsToggling(false)
    }
  }

  const isCompleted = task.state === "done"
  const toggleLabel = isCompleted ? "Mark as not done" : "Mark as done"

  return (
    <Card className={`
      p-4 flex flex-col gap-3 bg-white border-2 shadow-sm 
      transition-all duration-300 ease-out animate-slide-in
      hover:bg-muted/40 hover:shadow-md 
      focus-within:bg-muted/40 focus-within:shadow-md 
      ${energyBorder[task.energy]} 
      ${isCompleted ? 'opacity-80 scale-[0.98]' : 'opacity-100 scale-100'}
      ${showCompletionAnimation ? 'animate-success-glow' : ''}
      ${isToggling ? 'animate-gentle-pulse' : ''}
    `}>
      <div className="flex items-center gap-2 min-w-0">
        <Checkbox
          checked={isCompleted}
          onCheckedChange={handleToggle}
          disabled={isToggling}
          aria-label={toggleLabel}
          className="mr-2 shrink-0 transition-transform duration-200 hover:scale-110"
        />
        <button
          type="button"
          onClick={() => handleToggle(!isCompleted)}
          disabled={isToggling}
          className={`
            text-lg font-bold flex-1 min-w-0 truncate text-left 
            focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 
            rounded transition-all duration-300 ease-out
            ${isCompleted 
              ? "line-through text-muted-foreground transform -translate-y-0.5" 
              : "hover:text-primary hover:bg-muted/60 hover:scale-[1.02]"
            } 
            ${isToggling ? "opacity-50 cursor-not-allowed" : ""}
            ${showCompletionAnimation ? "text-green-600" : ""}
          `}
          title={task.title}
          aria-pressed={isCompleted}
          aria-label={`${toggleLabel}: ${task.title}`}
        >
          {task.title}
        </button>
        {isCompleted && (
          <Badge 
            variant="success" 
            className={`
              shrink-0 transition-all duration-300 ease-out
              ${showCompletionAnimation ? 'animate-completion-celebration scale-110' : ''}
            `}
          >
            {isToggling ? "..." : "Done"}
          </Badge>
        )}
        {isToggling && !isCompleted && (
          <div className="shrink-0 w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        )}
        {/* Drag Handle Icon */}
        <span 
          className={`
            ml-2 cursor-grab text-muted-foreground 
            transition-opacity duration-200
            ${isToggling ? 'opacity-50' : 'hover:opacity-80'}
          `} 
          title="Drag task" 
          aria-label="Drag task"
        >
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
            <circle cx="7" cy="6" r="1.5"/>
            <circle cx="7" cy="10" r="1.5"/>
            <circle cx="7" cy="14" r="1.5"/>
            <circle cx="13" cy="6" r="1.5"/>
            <circle cx="13" cy="10" r="1.5"/>
            <circle cx="13" cy="14" r="1.5"/>
          </svg>
        </span>
      </div>
      <div className={`
        flex flex-wrap gap-2 text-sm transition-all duration-300 ease-out
        ${isCompleted ? 'opacity-60' : 'opacity-100'}
      `}>
        <Badge
          variant={blockVariants[task.block] as "primary" | "secondary"}
          aria-label={`Time block: ${blockLabels[task.block].label}`}
          className="transition-transform duration-200 hover:scale-105"
        >
          {blockLabels[task.block].emoji} {blockLabels[task.block].label}
        </Badge>
        <Badge
          variant={energyVariants[task.energy] as "muted" | "secondary" | "success"}
          aria-label={`Energy level: ${energyLabels[task.energy].label}`}
          className="transition-transform duration-200 hover:scale-105"
        >
          {energyLabels[task.energy].emoji} {energyLabels[task.energy].label} Energy
        </Badge>
        <Tag 
          variant="accent"
          className="transition-transform duration-200 hover:scale-105"
        >
          {typeLabels[task.type].emoji} {typeLabels[task.type].label}
        </Tag>
      </div>
      
      {/* Completion celebration animation */}
      {showCompletionAnimation && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-2xl animate-completion-celebration">🎉</span>
          </div>
        </div>
      )}
    </Card>
  )
} 