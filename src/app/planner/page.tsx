"use client"

import { useState, useEffect } from "react"
import { Section } from "@/components/ui/section"
import { Button } from "@/components/ui/button"
import { TaskForm } from "@/components/adhd-planner/task-form"
import { TaskList } from "@/components/adhd-planner/task-list"
import { AddTaskButton } from "@/components/adhd-planner/add-task-button"
import { localStorageService } from "@/services/localStorage"
import { createTaskAction } from "@/app/actions"
import { Task, type TaskState } from "@/types/task"
import type { CreateTaskFormData } from "@/types/forms"

export default function PlannerPage() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showTaskForm, setShowTaskForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [taskListView, setTaskListView] = useState<'list' | 'grid'>('list')
  const [energyFilters, setEnergyFilters] = useState<('high' | 'medium' | 'low')[]>([])

  // Load tasks from localStorage on component mount
  useEffect(() => {
    try {
      const loadedTasks = localStorageService.getAllTasks()
      setTasks(loadedTasks)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load tasks")
    } finally {
      setIsLoading(false)
    }
  }, [])

  const handleCreateTask = async (formData: CreateTaskFormData) => {
    try {
      // Call the server action
      const result = await createTaskAction(formData)
      
      if (result.success && result.data) {
        // Add the new task to the UI
        setTasks(prev => [result.data!, ...prev])
        setShowTaskForm(false)
      } else {
        console.error("Failed to create task:", result.error)
      }
    } catch (err) {
      console.error("Error creating task:", err)
    }
  }

  const handleTaskToggle = (taskId: string, done: boolean) => {
    // Find the task to update
    const taskToUpdate = tasks.find(task => task.id === taskId)
    if (!taskToUpdate) return

    // Update the UI
    const newState: TaskState = done ? "done" : "pending"
    const updatedTask: Task = { ...taskToUpdate, state: newState }
    
    setTasks(prev => prev.map(task => 
      task.id === taskId ? updatedTask : task
    ))

    // Update in localStorage
    try {
      localStorageService.updateTask(updatedTask)
    } catch (err) {
      console.error("Error updating task:", err)
      // Revert the UI change on error
      setTasks(prev => prev.map(task => 
        task.id === taskId ? taskToUpdate : task
      ))
    }
  }

  const handleEnergyFilterToggle = (level: 'high' | 'medium' | 'low') => {
    setEnergyFilters(filters =>
      filters.includes(level)
        ? filters.filter(f => f !== level)
        : [...filters, level]
    )
  }

  const filteredTasks = energyFilters.length
    ? tasks.filter(task => energyFilters.includes(task.energy))
    : tasks

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-foreground/70">Loading your tasks...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Task List Section */}
        <div className="space-y-4">
          {/* Tab Bar */}
          <div className="flex gap-2 mb-4">
            <button
              type="button"
              className="px-4 py-1 rounded-full text-sm font-semibold bg-primary text-white shadow focus:outline-none focus:ring-2 focus:ring-primary"
              aria-current="page"
            >
              Today
            </button>
            <button
              type="button"
              className="px-4 py-1 rounded-full text-sm font-semibold bg-muted text-muted-foreground cursor-not-allowed opacity-60"
              disabled
              aria-disabled="true"
            >
              Week
            </button>
            <button
              type="button"
              className="px-4 py-1 rounded-full text-sm font-semibold bg-muted text-muted-foreground cursor-not-allowed opacity-60"
              disabled
              aria-disabled="true"
            >
              Goals
            </button>
          </div>

          {/* Energy Filter Controls */}
          <div className="flex gap-2 mb-2">
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${energyFilters.includes('high') ? 'bg-red-500 text-white border-red-500' : 'bg-muted text-foreground'}`}
              onClick={() => handleEnergyFilterToggle('high')}
              aria-pressed={energyFilters.includes('high')}
            >
              🔥 High
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${energyFilters.includes('medium') ? 'bg-yellow-400 text-foreground border-yellow-400' : 'bg-muted text-foreground'}`}
              onClick={() => handleEnergyFilterToggle('medium')}
              aria-pressed={energyFilters.includes('medium')}
            >
              ⚡ Medium
            </button>
            <button
              type="button"
              className={`px-3 py-1 rounded-full text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-primary ${energyFilters.includes('low') ? 'bg-blue-400 text-white border-blue-400' : 'bg-muted text-foreground'}`}
              onClick={() => handleEnergyFilterToggle('low')}
              aria-pressed={energyFilters.includes('low')}
            >
              🧊 Low
            </button>
          </div>

          {/* Add Task Button */}
          <div className="mb-2">
            <AddTaskButton onClick={() => setShowTaskForm(true)} />
          </div>

          {/* Task List */}
          <TaskList 
            tasks={filteredTasks}
            onToggleComplete={handleTaskToggle}
            view={taskListView}
            error={error}
          />
        </div>

        {/* Task Form Modal */}
        {showTaskForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="relative">
              <TaskForm
                onSubmit={handleCreateTask}
                onCancel={() => setShowTaskForm(false)}
                isLoading={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 