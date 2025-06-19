import { Task } from '../types/task'

// Ensure crypto.randomUUID is available
declare global {
  interface Crypto {
    randomUUID(): string
  }
}

// Fallback UUID generation for older browsers
function generateFallbackUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export function generateTaskId(): string {
  // Use crypto.randomUUID() if available, otherwise fallback
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  
  // Fallback for older browsers
  return generateFallbackUUID()
}

export function createTimestamp(): string {
  return new Date().toISOString()
}

export function getTaskValidationErrors(task: unknown): string[] {
  const errors: string[] = []
  
  if (typeof task !== 'object' || task === null) {
    errors.push('Task is not an object')
    return errors
  }
  
  const taskObj = task as Record<string, unknown>
  
  if (typeof taskObj.id !== 'string') errors.push('Invalid id')
  if (typeof taskObj.title !== 'string') errors.push('Invalid title')
  if (!['pending', 'done'].includes(taskObj.state as string)) errors.push('Invalid state')
  if (!['morning', 'afternoon', 'evening'].includes(taskObj.block as string)) errors.push('Invalid block')
  if (!['low', 'medium', 'high'].includes(taskObj.energy as string)) errors.push('Invalid energy')
  if (!['daily', 'one-time'].includes(taskObj.type as string)) errors.push('Invalid type')
  if (typeof taskObj.created_time !== 'string') errors.push('Invalid created_time')
  
  return errors
}

export function validateTask(task: unknown): task is Task {
  return getTaskValidationErrors(task).length === 0
}

export function sortTasks(tasks: Task[], field: keyof Task, direction: 'asc' | 'desc' = 'asc'): Task[] {
  return [...tasks].sort((a, b) => {
    let aValue: string | number = a[field] as string | number
    let bValue: string | number = b[field] as string | number
    
    // Handle string comparisons
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      aValue = aValue.toLowerCase()
      bValue = bValue.toLowerCase()
    }
    
    // Handle date comparisons
    if (field === 'created_time') {
      aValue = new Date(aValue as string).getTime()
      bValue = new Date(bValue as string).getTime()
    }
    
    if (aValue < bValue) return direction === 'asc' ? -1 : 1
    if (aValue > bValue) return direction === 'asc' ? 1 : -1
    return 0
  })
}

export function filterTasks(tasks: Task[], filters: Partial<Task>): Task[] {
  return tasks.filter(task => {
    for (const [key, value] of Object.entries(filters)) {
      if (value !== undefined && task[key as keyof Task] !== value) {
        return false
      }
    }
    return true
  })
} 