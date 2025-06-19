import { z } from 'zod'

export const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  block: z.enum(['morning', 'afternoon', 'evening'], {
    required_error: 'Please select a time block'
  }),
  energy: z.enum(['low', 'medium', 'high'], {
    required_error: 'Please select an energy level'
  }),
  type: z.enum(['daily', 'one-time'], {
    required_error: 'Please select a task type'
  })
})

export type CreateTaskFormData = z.infer<typeof createTaskSchema> 