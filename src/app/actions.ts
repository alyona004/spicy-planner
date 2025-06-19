"use server"

import { createTaskSchema, type CreateTaskFormData } from "@/types/forms"
import { localStorageService } from "@/services/localStorage"
import { generateTaskId, createTimestamp } from "@/services/taskUtils"
import { Task } from "@/types/task"
import type { ActionResponse } from "@/types/actions"

export async function createTaskAction(data: CreateTaskFormData): Promise<ActionResponse<Task>> {
  try {
    // Validate the input data
    const validatedData = createTaskSchema.parse(data)

    // Create a new task with generated ID and timestamp
    const newTask: Task = {
      id: generateTaskId(),
      title: validatedData.title,
      state: "pending",
      block: validatedData.block,
      energy: validatedData.energy,
      type: validatedData.type,
      created_time: createTimestamp()
    }

    // Save to localStorage
    const savedTask = localStorageService.createTask(newTask)

    return {
      success: true,
      data: savedTask
    }
  } catch (error) {
    console.error("Error creating task:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to create task"
    }
  }
}

export async function updateTaskAction(task: Task): Promise<ActionResponse<Task>> {
  try {
    // Update task in localStorage
    const updatedTask = localStorageService.updateTask(task)
    
    if (!updatedTask) {
      return {
        success: false,
        error: "Task not found"
      }
    }

    return {
      success: true,
      data: updatedTask
    }
  } catch (error) {
    console.error("Error updating task:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to update task"
    }
  }
} 