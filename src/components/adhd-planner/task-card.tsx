import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tag } from "@/components/ui/tag";
import { Checkbox } from "@/components/ui/checkbox";
import type { Task } from "@/types/task";
import React from "react";

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
  const handleToggle = (checked: boolean) => {
    if (onToggleComplete) onToggleComplete(task.id, checked)
  }

  return (
    <Card className={`p-4 flex flex-col gap-3 bg-white border-2 shadow-sm transition-all duration-150 hover:bg-muted/40 hover:shadow-md focus-within:bg-muted/40 focus-within:shadow-md ${energyBorder[task.energy]}`}>
      <div className="flex items-center gap-2 min-w-0">
        <Checkbox
          checked={task.state === "done"}
          onCheckedChange={handleToggle}
          aria-label={task.state === "done" ? "Mark as not done" : "Mark as done"}
          className="mr-2 shrink-0"
        />
        <button
          type="button"
          onClick={() => handleToggle(task.state !== "done")}
          className={`text-lg font-bold flex-1 min-w-0 truncate text-left focus:outline-none focus:ring-0 focus:bg-muted/60 rounded transition-colors ${task.state === "done" ? "line-through text-muted-foreground opacity-60" : "hover:text-primary"}`}
          title={task.title}
          aria-pressed={task.state === "done"}
        >
          {task.title}
        </button>
        {task.state === "done" && (
          <Badge variant="success">Done</Badge>
        )}
        {/* Drag Handle Icon */}
        <span className="ml-2 cursor-grab text-muted-foreground" title="Drag task" aria-label="Drag task">
          <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="7" cy="6" r="1.5"/><circle cx="7" cy="10" r="1.5"/><circle cx="7" cy="14" r="1.5"/><circle cx="13" cy="6" r="1.5"/><circle cx="13" cy="10" r="1.5"/><circle cx="13" cy="14" r="1.5"/></svg>
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-sm">
        <Badge
          variant={blockVariants[task.block] as any}
          aria-label={`Time block: ${blockLabels[task.block].label}`}
        >
          {blockLabels[task.block].emoji} {blockLabels[task.block].label}
        </Badge>
        <Badge
          variant={energyVariants[task.energy] as any}
          aria-label={`Energy level: ${energyLabels[task.energy].label}`}
        >
          {energyLabels[task.energy].emoji} {energyLabels[task.energy].label} Energy
        </Badge>
        <Tag variant="accent">
          {typeLabels[task.type].emoji} {typeLabels[task.type].label}
        </Tag>
      </div>
    </Card>
  )
} 