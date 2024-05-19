import { Task } from './task.dto'

export interface TaskStatus {
	id: string
	description: string
	status: boolean
	createdAt: Date
	updatedAt: Date
	Task: Task[]
}

export interface CreateTaskStatus {
	description: string
}
