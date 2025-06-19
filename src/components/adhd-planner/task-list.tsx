import type { Task } from "@/types/task";
import { TaskCard } from "@/components/adhd-planner/task-card";

export interface TaskListProps {
  tasks: Task[]
  onToggleComplete?: (id: string, done: boolean) => void
  view?: 'list' | 'grid'
  loading?: boolean
  error?: string | null
}

export function TaskList({ tasks, onToggleComplete, view = 'list', loading = false, error = null }: TaskListProps) {
  if (loading) return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-foreground/60">
      <span className="mb-2 animate-spin text-4xl" aria-hidden>🌐</span>
      <p className="text-lg font-semibold mb-1">Loading tasks…</p>
    </div>
  )
  if (error) return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-destructive">
      <span className="text-5xl mb-2" aria-hidden>❌</span>
      <p className="text-lg font-semibold mb-1">Could not load tasks</p>
      <p className="text-sm">{error}</p>
    </div>
  )
  if (!tasks.length) return (
    <div className="flex flex-col items-center justify-center py-12 text-center text-foreground/60">
      <span className="text-5xl mb-2" aria-hidden>🫂</span>
      <p className="text-lg font-semibold mb-1">No tasks yet</p>
      <p className="text-sm">You can do it! Add your first task above.</p>
    </div>
  )
  return (
    <div className={view === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 gap-y-6" : "flex flex-col gap-4"}>
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onToggleComplete={onToggleComplete} />
      ))}
    </div>
  )
} 