import { Task } from './task'

export interface ActionResponse<T = any> {
  success: boolean
  data?: T
  error?: string
}

export interface TaskActionResponse extends ActionResponse {
  data?: {
    task?: Task
    tasks?: Task[]
  }
} 