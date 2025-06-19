export interface Task {
  id: string
  title: string
  state: TaskState
  block: TimeBlock
  energy: EnergyLevel
  type: TaskType
  created_time: string
}

export type TaskState = 'pending' | 'done'

export type TimeBlock = 'morning' | 'afternoon' | 'evening'

export type EnergyLevel = 'low' | 'medium' | 'high'

export type TaskType = 'daily' | 'one-time' 