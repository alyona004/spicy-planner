import { Task } from '../types/task'
import { validateTask, getTaskValidationErrors } from './taskUtils'

const STORAGE_KEY = 'spicy-planner-tasks'
const VERSION_KEY = 'spicy-planner-version'
const CURRENT_VERSION = 1

class LocalStorageService {
  private getCurrentVersion(): number {
    try {
      if (typeof window === 'undefined') return CURRENT_VERSION
      
      const version = localStorage.getItem(VERSION_KEY)
      return version ? parseInt(version, 10) : 0
    } catch (error) {
      console.error('Error reading version from localStorage:', error)
      return 0
    }
  }

  private setCurrentVersion(version: number): void {
    try {
      if (typeof window === 'undefined') return
      
      localStorage.setItem(VERSION_KEY, version.toString())
    } catch (error) {
      console.error('Error writing version to localStorage:', error)
    }
  }

  private migrateData(tasks: any[], fromVersion: number): Task[] {
    console.log(`Migrating data from version ${fromVersion} to ${CURRENT_VERSION}`)
    
    // Version 0 to 1: Ensure all tasks have required fields
    if (fromVersion < 1) {
      tasks = tasks.map(task => {
        if (typeof task === 'object' && task !== null) {
          return {
            id: task.id || crypto.randomUUID(),
            title: task.title || 'Untitled Task',
            state: ['pending', 'done'].includes(task.state) ? task.state : 'pending',
            block: ['morning', 'afternoon', 'evening'].includes(task.block) ? task.block : 'morning',
            energy: ['low', 'medium', 'high'].includes(task.energy) ? task.energy : 'medium',
            type: ['daily', 'one-time'].includes(task.type) ? task.type : 'one-time',
            created_time: task.created_time || new Date().toISOString()
          }
        }
        return task
      })
    }
    
    // Future migrations can be added here
    // if (fromVersion < 2) { ... }
    
    return tasks
  }

  private getTasks(): Task[] {
    try {
      if (typeof window === 'undefined') return []
      
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) return []
      
      const tasks = JSON.parse(stored) as Task[]
      
      if (!Array.isArray(tasks)) {
        console.error('Stored data is not an array, found:', typeof tasks)
        return []
      }
      
      // Check if migration is needed
      const currentVersion = this.getCurrentVersion()
      if (currentVersion < CURRENT_VERSION) {
        console.log(`Data migration needed: ${currentVersion} -> ${CURRENT_VERSION}`)
        const migratedTasks = this.migrateData(tasks, currentVersion)
        this.setCurrentVersion(CURRENT_VERSION)
        
        // Save migrated data
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(migratedTasks))
        } catch (error) {
          console.error('Error saving migrated data:', error)
        }
        
        return migratedTasks
      }
      
      // Validate each task and log invalid ones directly
      const validTasks: Task[] = []
      let invalidCount = 0
      
      tasks.forEach((task, index) => {
        if (validateTask(task)) {
          validTasks.push(task)
        } else {
          const errors = getTaskValidationErrors(task)
          console.error(`Invalid task at index ${index}:`, { task, errors })
          invalidCount++
        }
      })
      
      if (invalidCount > 0) {
        console.warn(`Filtered out ${invalidCount} invalid tasks, keeping ${validTasks.length} valid tasks`)
      }
      
      return validTasks
    } catch (error) {
      console.error('Error reading tasks from localStorage:', error)
      return []
    }
  }

  private setTasks(tasks: Task[]): void {
    try {
      if (typeof window === 'undefined') return
      
      // Validate all tasks before saving and log invalid ones directly
      const validTasks: Task[] = []
      let invalidCount = 0
      
      tasks.forEach((task, index) => {
        if (validateTask(task)) {
          validTasks.push(task)
        } else {
          const errors = getTaskValidationErrors(task)
          console.error(`Invalid task at index ${index}:`, { task, errors })
          invalidCount++
        }
      })
      
      if (invalidCount > 0) {
        throw new Error(`Cannot save: ${invalidCount} tasks are invalid`)
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(validTasks))
    } catch (error) {
      console.error('Error writing tasks to localStorage:', error)
      throw new Error('Failed to save tasks to localStorage')
    }
  }

  getAllTasks(): Task[] {
    return this.getTasks()
  }

  getTaskById(id: string): Task | null {
    if (!id || typeof id !== 'string') {
      console.error('Invalid task ID provided:', id)
      return null
    }
    
    const tasks = this.getTasks()
    return tasks.find(task => task.id === id) || null
  }

  createTask(task: Task): Task {
    if (!validateTask(task)) {
      const errors = getTaskValidationErrors(task)
      console.error('Invalid task data provided:', { task, errors })
      throw new Error(`Invalid task data: ${errors.join(', ')}`)
    }
    
    const tasks = this.getTasks()
    tasks.push(task)
    this.setTasks(tasks)
    return task
  }

  updateTask(updatedTask: Task): Task | null {
    if (!validateTask(updatedTask)) {
      const errors = getTaskValidationErrors(updatedTask)
      console.error('Invalid task data provided:', { task: updatedTask, errors })
      throw new Error(`Invalid task data: ${errors.join(', ')}`)
    }
    
    const tasks = this.getTasks()
    const index = tasks.findIndex(task => task.id === updatedTask.id)
    
    if (index === -1) return null
    
    tasks[index] = updatedTask
    this.setTasks(tasks)
    return updatedTask
  }

  deleteTask(id: string): boolean {
    if (!id || typeof id !== 'string') {
      console.error('Invalid task ID provided:', id)
      return false
    }
    
    const tasks = this.getTasks()
    const filteredTasks = tasks.filter(task => task.id !== id)
    
    if (filteredTasks.length === tasks.length) return false
    
    this.setTasks(filteredTasks)
    return true
  }

  saveTasks(tasks: Task[]): void {
    this.setTasks(tasks)
  }
}

export const localStorageService = new LocalStorageService() 